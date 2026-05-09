'use strict';

const { createSign } = require('crypto');
const { readFileSync } = require('fs');
const { join } = require('path');

const BASE_URL = 'https://antoniomonereo.com';

function base64url(str) {
  return Buffer.from(str).toString('base64')
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function createJWT(sa) {
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const now = Math.floor(Date.now() / 1000);
  const claim = base64url(JSON.stringify({
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }));
  const signer = createSign('RSA-SHA256');
  signer.update(`${header}.${claim}`);
  const sig = signer.sign(sa.private_key).toString('base64')
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  return `${header}.${claim}.${sig}`;
}

async function getToken(jwt) {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });
  const data = await res.json();
  if (!data.access_token) throw new Error(`Token error: ${JSON.stringify(data)}`);
  return data.access_token;
}

async function notifyUrl(token, url) {
  const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url, type: 'URL_UPDATED' }),
  });
  return res.status;
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  const email = process.env.GOOGLE_CLIENT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  if (!email) throw new Error('Falta GOOGLE_CLIENT_EMAIL');
  if (!rawKey) throw new Error('Falta GOOGLE_PRIVATE_KEY');

  const privateKey = rawKey
    .replace(/^["']|["']$/g, '')
    .replace(/\\n/g, '\n')
    .trim();

  console.log('Key empieza con:', privateKey.substring(0, 27));

  const sa = {
    client_email: email,
    private_key: privateKey,
  };

  const worksRaw = readFileSync(join(process.cwd(), 'data/works.json'), 'utf8')
    .replace(/^﻿/, '');
  const works = JSON.parse(worksRaw);

  const urls = [
    `${BASE_URL}/`,
    `${BASE_URL}/pinturas`,
    `${BASE_URL}/dibujos`,
    `${BASE_URL}/copias`,
    ...works.filter(w => w.public !== false).map(w => `${BASE_URL}/obra/${w.slug}`),
  ];

  console.log(`Enviando ${urls.length} URLs a Google Indexing API...`);

  const jwt = createJWT(sa);
  const token = await getToken(jwt);

  let ok = 0, fail = 0;
  for (const url of urls) {
    const status = await notifyUrl(token, url);
    if (status === 200) {
      ok++;
      console.log(`OK  ${url}`);
    } else {
      fail++;
      console.log(`ERR ${url} (${status})`);
    }
    await sleep(200);
  }

  console.log(`\nResultado: ${ok} enviadas, ${fail} errores`);
  if (fail > 0) process.exit(1);
}

main().catch(err => {
  console.error(err.message);
  process.exit(1);
});
