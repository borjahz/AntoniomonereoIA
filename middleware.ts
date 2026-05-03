import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const STRIP_PARAMS = ['fbclid', 'gclid', 'msclkid', 'twclid', 'mc_eid', 'oly_enc_id', '_hsenc', '_hsmi', 'mkt_tok'];

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  let changed = false;

  for (const param of STRIP_PARAMS) {
    if (url.searchParams.has(param)) {
      url.searchParams.delete(param);
      changed = true;
    }
  }

  if (changed) {
    return NextResponse.redirect(url, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon|images|fonts).*)',
};
