import { Link } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { site } from '../data/siteContent'

export default function Footer() {
  return (
    <footer className="border-t border-border-soft bg-cream">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-8 text-center sm:px-6">
        <p className="text-sm font-medium text-ink/60">{site.footer.copyright}</p>
        <Link
          to="/admin"
          className="inline-flex items-center gap-1 text-xs font-medium text-ink/40 transition-colors hover:text-green-900"
        >
          <Lock size={12} aria-hidden="true" />
          Admin
        </Link>
      </div>
    </footer>
  )
}
