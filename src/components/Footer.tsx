import { Link } from 'react-router-dom'
import { site } from '../data/siteContent'

export default function Footer() {
  return (
    <footer className="border-t border-border-soft bg-cream">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-8 text-center sm:px-6">
        <p className="text-sm font-medium text-ink/60">
          {site.footer.copyright}
          <span aria-hidden="true"> · </span>
          {site.footer.developer.label}{' '}
          <a
            href={site.footer.developer.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-green-900 underline-offset-4 transition-colors hover:text-green-600 hover:underline"
          >
            {site.footer.developer.name}
          </a>
        </p>
        <Link
          to="/admin"
          className="inline-flex items-center gap-1 text-xs font-medium text-ink/40 transition-colors hover:text-green-900"
        >
          {/* <Lock size={12} aria-hidden="true" /> */}
          {/* Admin */}
        </Link>
      </div>
    </footer>
  )
}
