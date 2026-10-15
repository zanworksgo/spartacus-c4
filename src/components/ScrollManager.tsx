import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * On route change: scroll to the hash target if present, otherwise to the top.
 * Keeps anchor links working when navigating from Profil/Sejarah to "/#section".
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      // Allow the target page to render before scrolling.
      const t = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 60)
      return () => window.clearTimeout(t)
    }
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname, hash])

  return null
}
