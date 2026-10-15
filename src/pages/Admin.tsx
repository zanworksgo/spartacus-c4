import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { Lock, LogOut, Upload, Trash2, ExternalLink, Loader2, Save } from 'lucide-react'
import {
  supabase,
  isSupabaseConfigured,
  adminEmail,
  uploadDocument,
  setLink,
  removeContent,
} from '../lib/supabase'
import { useContent } from '../lib/content'
import { adminGroups } from '../data/adminSlots'
import type { AdminSlot } from '../data/adminSlots'
import { useToast } from '../components/ToastProvider'

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [email, setEmail] = useState(adminEmail)
  const [password, setPassword] = useState('')
  const [signingIn, setSigningIn] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { refresh } = useContent()

  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false)
      return
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setAuthLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  const wrapper = 'mx-auto max-w-3xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32'

  if (!isSupabaseConfigured) {
    return (
      <section className={wrapper}>
        <h1 className="text-3xl font-extrabold tracking-tight text-green-900">Panel Admin</h1>
        <div className="mt-6 rounded-2xl border border-border-soft bg-white p-6 shadow-soft">
          <p className="font-semibold text-green-900">Backend belum dikonfigurasi.</p>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">
            Tambahkan kredensial Supabase pada berkas <code className="rounded bg-green-900/[0.06] px-1">.env</code>{' '}
            lalu jalankan ulang aplikasi:
          </p>
          <pre className="mt-3 overflow-x-auto rounded-xl bg-ink/[0.04] p-4 text-xs text-ink/80">
{`VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_ADMIN_EMAIL=admin@spartacus.id`}
          </pre>
          <p className="mt-3 text-sm text-ink/60">
            Lihat <code className="rounded bg-green-900/[0.06] px-1">README.md</code> dan{' '}
            <code className="rounded bg-green-900/[0.06] px-1">supabase/setup.sql</code> untuk langkah lengkap.
          </p>
        </div>
      </section>
    )
  }

  if (authLoading) {
    return (
      <section className={wrapper}>
        <div className="flex items-center gap-2 text-ink/60">
          <Loader2 className="animate-spin" size={18} /> Memuat…
        </div>
      </section>
    )
  }

  if (!session) {
    const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setError(null)
      setSigningIn(true)
      const { error: signErr } = await supabase!.auth.signInWithPassword({ email, password })
      setSigningIn(false)
      if (signErr) setError('Login gagal. Periksa email/password admin.')
    }
    return (
      <section className={wrapper}>
        <h1 className="text-3xl font-extrabold tracking-tight text-green-900">Panel Admin</h1>
        <form
          onSubmit={onSubmit}
          className="mt-6 max-w-sm rounded-2xl border border-border-soft bg-white p-6 shadow-soft"
        >
          <div className="mb-4 flex items-center gap-2 text-green-900">
            <Lock size={18} />
            <span className="font-semibold">Masuk Admin</span>
          </div>
          {!adminEmail && (
            <label className="mb-3 block">
              <span className="mb-1 block text-sm font-medium text-ink/70">Email admin</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-border-soft bg-cream px-3 py-2.5 text-sm outline-none focus:border-green-600"
              />
            </label>
          )}
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-ink/70">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-border-soft bg-cream px-3 py-2.5 text-sm outline-none focus:border-green-600"
            />
          </label>
          {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={signingIn}
            className="mt-5 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-green-900 px-5 text-sm font-semibold text-cream transition-colors hover:bg-green-900/90 disabled:opacity-60"
          >
            {signingIn ? <Loader2 className="animate-spin" size={18} /> : <Lock size={18} />}
            Masuk
          </button>
        </form>
      </section>
    )
  }

  return (
    <section className={wrapper}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-green-900">Panel Admin</h1>
          <p className="mt-1 text-sm text-ink/60">Unggah dan ganti berkas, pamflet, serta tautan formulir.</p>
        </div>
        <button
          type="button"
          onClick={async () => {
            await supabase!.auth.signOut()
            await refresh()
          }}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border-soft bg-white px-4 text-sm font-semibold text-green-900 transition-colors hover:border-green-600/60"
        >
          <LogOut size={18} /> Keluar
        </button>
      </div>

      <div className="mt-8 flex flex-col gap-8">
        {adminGroups.map((group) => (
          <div key={group.title}>
            <h2 className="mb-3 text-lg font-bold text-green-900">{group.title}</h2>
            <div className="flex flex-col gap-3">
              {group.slots.map((slot) => (
                <SlotRow key={slot.key} slot={slot} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function SlotRow({ slot }: { slot: AdminSlot }) {
  const { map, refresh } = useContent()
  const { notify } = useToast()
  const row = map[slot.key]
  const [busy, setBusy] = useState(false)
  const [linkValue, setLinkValue] = useState(row?.url ?? '')

  useEffect(() => {
    setLinkValue(row?.url ?? '')
  }, [row?.url])

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setBusy(true)
    try {
      await uploadDocument(slot.key, file)
      await refresh()
      notify('Berkas berhasil diunggah')
    } catch (err) {
      notify('Gagal mengunggah berkas')
      console.error(err)
    } finally {
      setBusy(false)
    }
  }

  const onSaveLink = async () => {
    setBusy(true)
    try {
      await setLink(slot.key, linkValue)
      await refresh()
      notify('Tautan disimpan')
    } catch (err) {
      notify('Gagal menyimpan tautan')
      console.error(err)
    } finally {
      setBusy(false)
    }
  }

  const onRemove = async () => {
    setBusy(true)
    try {
      await removeContent(slot.key)
      await refresh()
      notify('Berhasil dihapus')
    } catch (err) {
      notify('Gagal menghapus')
      console.error(err)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="rounded-xl border border-border-soft bg-white p-4 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-green-900">{slot.label}</p>
          {row?.url ? (
            <a
              href={row.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-0.5 inline-flex max-w-full items-center gap-1 truncate text-xs font-medium text-green-600 hover:underline"
            >
              <ExternalLink size={13} className="flex-none" />
              <span className="truncate">{row.filename ?? row.url}</span>
            </a>
          ) : (
            <p className="mt-0.5 text-xs text-ink/45">Belum ada</p>
          )}
        </div>

        <div className="flex flex-none items-center gap-2">
          {slot.type === 'file' ? (
            <label
              className={`inline-flex min-h-[40px] cursor-pointer items-center gap-1.5 rounded-lg bg-green-900 px-3.5 text-sm font-semibold text-cream transition-colors hover:bg-green-900/90 ${
                busy ? 'pointer-events-none opacity-60' : ''
              }`}
            >
              {busy ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
              {row?.url ? 'Ganti' : 'Unggah'}
              <input type="file" accept={slot.accept} onChange={onFile} className="sr-only" disabled={busy} />
            </label>
          ) : null}

          {row?.url && (
            <button
              type="button"
              onClick={onRemove}
              disabled={busy}
              aria-label="Hapus"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border-soft text-red-600 transition-colors hover:border-red-300 hover:bg-red-50 disabled:opacity-60"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      {slot.type === 'link' && (
        <div className="mt-3 flex flex-wrap gap-2">
          <input
            type="url"
            value={linkValue}
            onChange={(e) => setLinkValue(e.target.value)}
            placeholder="https://forms.gle/…"
            className="min-w-0 flex-1 rounded-lg border border-border-soft bg-cream px-3 py-2.5 text-sm outline-none focus:border-green-600"
          />
          <button
            type="button"
            onClick={onSaveLink}
            disabled={busy}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-green-900 px-3.5 text-sm font-semibold text-cream transition-colors hover:bg-green-900/90 disabled:opacity-60"
          >
            {busy ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            Simpan
          </button>
        </div>
      )}
    </div>
  )
}
