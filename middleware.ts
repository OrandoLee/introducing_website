import { next, rewrite } from '@vercel/functions'

const MAIN_SITE_ORIGIN = 'https://personal-site-psi-sand.vercel.app'

function hasSeenIntroduction(request: Request) {
  const cookie = request.headers.get('cookie') ?? ''
  return cookie.split(';').some((item) => item.trim() === 'delee_intro_seen=1')
}

export const config = {
  matcher: '/((?!assets/|marks/|index\\.html$).*)',
}

export default function middleware(request: Request) {
  const incoming = new URL(request.url)
  const isHome = incoming.pathname === '/'
  const isIntroduction = incoming.pathname === '/intro' || incoming.pathname === '/intro/'
  const enteringSite = incoming.searchParams.get('enter') === '1'

  if (isIntroduction) {
    const introduction = new URL('/index.html', incoming)
    return rewrite(introduction)
  }

  if (isHome && !enteringSite && !hasSeenIntroduction(request)) {
    return next()
  }

  const destination = new URL(`${incoming.pathname}${incoming.search}`, MAIN_SITE_ORIGIN)
  destination.searchParams.delete('enter')
  return rewrite(destination)
}
