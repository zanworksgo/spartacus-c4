import { useToast } from '../components/ToastProvider'

/**
 * Returns a handler that either opens a real external link safely in a new tab
 * or shows a "not available yet" notice when the url is null.
 */
export function useSafeLink() {
  const { notify } = useToast()

  return function openLink(url: string | null, unavailableMessage = 'Tautan belum tersedia') {
    if (!url) {
      notify(unavailableMessage)
      return
    }
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

/** Build a wa.me URL from a plain international number (no "+"). */
export function waLink(whatsapp: string | null): string | null {
  if (!whatsapp) return null
  const digits = whatsapp.replace(/[^\d]/g, '')
  return digits ? `https://wa.me/${digits}` : null
}
