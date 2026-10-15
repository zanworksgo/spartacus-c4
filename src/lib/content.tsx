import type { ReactNode } from 'react'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { fetchContentMap, type ContentRow } from './supabase'

interface ContentContextValue {
  map: Record<string, ContentRow>
  loading: boolean
  refresh: () => Promise<void>
}

const ContentContext = createContext<ContentContextValue>({
  map: {},
  loading: false,
  refresh: async () => {},
})

/** Loads backend-managed content once and shares it with the app. */
export function ContentProvider({ children }: { children: ReactNode }) {
  const [map, setMap] = useState<Record<string, ContentRow>>({})
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    setLoading(true)
    const next = await fetchContentMap()
    setMap(next)
    setLoading(false)
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return (
    <ContentContext.Provider value={{ map, loading, refresh }}>{children}</ContentContext.Provider>
  )
}

export function useContent(): ContentContextValue {
  return useContext(ContentContext)
}

/** Resolve a slot key to its managed URL, falling back to a static value. */
export function useResolvedUrl(key?: string, fallback?: string | null): string | null {
  const { map } = useContent()
  if (key && map[key]?.url) return map[key].url
  return fallback ?? null
}
