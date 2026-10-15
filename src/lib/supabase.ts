import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

/** Shared admin login email (non-secret). The password is typed at /admin. */
export const adminEmail = (import.meta.env.VITE_ADMIN_EMAIL as string | undefined) ?? ''

/** True when the backend env vars are present, enabling admin + dynamic content. */
export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string)
  : null

/** Public storage bucket that holds uploaded documents. */
export const BUCKET = 'documents'

export interface ContentRow {
  key: string
  type: 'file' | 'link'
  url: string | null
  filename: string | null
  updated_at?: string | null
}

/** Load all managed content rows, keyed by slot id. Returns {} when unconfigured. */
export async function fetchContentMap(): Promise<Record<string, ContentRow>> {
  if (!supabase) return {}
  const { data, error } = await supabase.from('site_content').select('*')
  if (error || !data) return {}
  const map: Record<string, ContentRow> = {}
  for (const row of data as ContentRow[]) map[row.key] = row
  return map
}

/** Upload a file for a slot and upsert its public URL into site_content. */
export async function uploadDocument(key: string, file: File): Promise<ContentRow> {
  if (!supabase) throw new Error('Backend belum dikonfigurasi.')
  const ext = file.name.includes('.') ? file.name.split('.').pop() : 'bin'
  const path = `${key}/${Date.now()}.${ext}`
  const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file, {
    upsert: true,
    contentType: file.type || undefined,
  })
  if (upErr) throw upErr
  const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path)
  const row: ContentRow = { key, type: 'file', url: pub.publicUrl, filename: file.name }
  const { error: dbErr } = await supabase
    .from('site_content')
    .upsert({ ...row, updated_at: new Date().toISOString() })
  if (dbErr) throw dbErr
  return row
}

/** Save a plain link (e.g. Google Form URL) for a slot. */
export async function setLink(key: string, linkUrl: string): Promise<ContentRow> {
  if (!supabase) throw new Error('Backend belum dikonfigurasi.')
  const row: ContentRow = { key, type: 'link', url: linkUrl.trim() || null, filename: null }
  const { error } = await supabase
    .from('site_content')
    .upsert({ ...row, updated_at: new Date().toISOString() })
  if (error) throw error
  return row
}

/** Remove a slot's content row (the stored file blob is left in the bucket). */
export async function removeContent(key: string): Promise<void> {
  if (!supabase) throw new Error('Backend belum dikonfigurasi.')
  const { error } = await supabase.from('site_content').delete().eq('key', key)
  if (error) throw error
}

export async function signInAdmin(password: string) {
  if (!supabase) throw new Error('Backend belum dikonfigurasi.')
  return supabase.auth.signInWithPassword({ email: adminEmail, password })
}

export async function signOutAdmin(): Promise<void> {
  if (supabase) await supabase.auth.signOut()
}
