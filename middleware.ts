import { next, rewrite } from '@vercel/functions'

const MAIN_SITE_ORIGIN = 'https://personal-site-psi-sand.vercel.app'

function hasSeenIntroduction(request: Request) {
  const cookie = request.headers.get('cookie') ?? ''
  return cookie.split(';').some((item) => item.trim() === 'delee_intro_seen=1')
}

export const config = {
  matcher: '/((?!assets/|marks/).*)',
}

export default function middleware(request: Request) {
  const incoming = new URL(request.url)
  const isHome = incoming.pathname === '/'
  const enteringSite = incoming.searchParams.get('enter') === '1'

  if (isHome && !enteringSite && !hasSeenIntroduction(request)) {
    return next()
  }

  const destination = new URL(`${incoming.pathname}${incoming.search}`, MAIN_SITE_ORIGIN)
  destination.searchParams.delete('enter')
  return rewrite(destination)
}
