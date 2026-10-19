export interface AdminSlot {
  key: string
  label: string
  type: 'file' | 'link'
  /** `accept` attribute for file inputs. */
  accept?: string
}

export interface AdminGroup {
  title: string
  slots: AdminSlot[]
}

const DOC_ACCEPT = '.pdf,.doc,.docx,image/*'
const IMG_ACCEPT = 'image/*,.pdf'

/** All backend-managed content slots, grouped for the admin dashboard. */
export const adminGroups: AdminGroup[] = [
  {
    title: 'Formulir Pengajuan',
    slots: [
      { key: 'form-undangan', label: 'Form Pengajuan Undangan', type: 'link' },
      { key: 'form-kontingen', label: 'Form Pendaftaran Kontingen', type: 'link' },
    ],
  },
  {
    title: 'Informasi & Berkas',
    slots: [
      { key: 'pamflet-ch4', label: 'Pamflet Chapter 4', type: 'file', accept: IMG_ACCEPT },
      { key: 'surat-rekomendasi', label: 'Surat Rekomendasi', type: 'file', accept: DOC_ACCEPT },
      { key: 'berkas-sma-word', label: 'Berkas Pendaftaran SMA/SMK/MA — Word', type: 'file', accept: '.doc,.docx' },
      { key: 'berkas-sma-pdf', label: 'Berkas Pendaftaran SMA/SMK/MA — PDF', type: 'file', accept: '.pdf' },
      { key: 'berkas-smp-word', label: 'Berkas Pendaftaran SMP/MTs — Word', type: 'file', accept: '.doc,.docx' },
      { key: 'berkas-smp-pdf', label: 'Berkas Pendaftaran SMP/MTs — PDF', type: 'file', accept: '.pdf' },
      { key: 'juklak-juknis', label: 'Juklak & Juknis', type: 'file', accept: DOC_ACCEPT },
    ],
  },
  {
    title: 'Format Penilaian — SMA/SMK/MA',
    slots: [
      { key: 'nilai-sma-khusus', label: 'Lomba Khusus', type: 'file', accept: DOC_ACCEPT },
      { key: 'nilai-sma-umum', label: 'Lomba Umum', type: 'file', accept: DOC_ACCEPT },
      { key: 'nilai-sma-seni', label: 'Lomba Seni', type: 'file', accept: DOC_ACCEPT },
      { key: 'nilai-sma-eksebisi', label: 'Lomba Eksebisi', type: 'file', accept: DOC_ACCEPT },
    ],
  },
  {
    title: 'Format Penilaian — SMP/MTs',
    slots: [
      { key: 'nilai-smp-khusus', label: 'Lomba Khusus', type: 'file', accept: DOC_ACCEPT },
      { key: 'nilai-smp-umum', label: 'Lomba Umum', type: 'file', accept: DOC_ACCEPT },
      { key: 'nilai-smp-seni', label: 'Lomba Seni', type: 'file', accept: DOC_ACCEPT },
      { key: 'nilai-smp-eksebisi', label: 'Lomba Eksebisi', type: 'file', accept: DOC_ACCEPT },
    ],
  },
  {
    title: 'Pamflet Sejarah',
    slots: [
      { key: 'pamflet-ch1', label: 'Pamflet Chapter 1', type: 'file', accept: IMG_ACCEPT },
      { key: 'pamflet-ch2', label: 'Pamflet Chapter 2', type: 'file', accept: IMG_ACCEPT },
      { key: 'pamflet-ch3', label: 'Pamflet Chapter 3', type: 'file', accept: IMG_ACCEPT },
    ],
  },
]
