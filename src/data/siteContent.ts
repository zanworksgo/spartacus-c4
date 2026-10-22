/**
 * Single source of truth for all editable site content.
 * Use `null` for links/documents that are not yet available.
 * Nothing here is invented as fact — placeholders are clearly marked.
 */

export interface NavItem {
    label: string
    /** Router path or hash target (e.g. "/", "/#informasi", "/profil"). */
    href: string
}

export interface DocItem {
    title: string
    /** Single external link (opens or downloads one file). */
    url?: string | null
    /** Word-format download link. */
    word?: string | null
    /** PDF-format download link. */
    pdf?: string | null
    /** Backend slot key for the single file/link (overrides `url` when uploaded). */
    key?: string
    /** Backend slot keys for the Word/PDF formats. */
    wordKey?: string
    pdfKey?: string
}

export interface DocPanel {
    title: string
    items: DocItem[]
}

export interface SubmissionItem {
    title: string
    description: string
    /** External form URL, or null when not yet available. */
    url: string | null
    /** Backend slot key (overrides `url` when set in admin). */
    key?: string
}

export interface ScoringLevel {
    /** School level, e.g. "SMA/SMK/MA" or "SMP/MTs". */
    level: string
    items: DocItem[]
}

export interface Champion {
    rank: number
    /** Winning school name, or null until announced. */
    name: string | null
}

export interface ChampionGroup {
    /** School level, e.g. "SMA/SMK/MA" or "SMP/MTs". */
    level: string
    champions: Champion[]
}

export interface ChapterItem {
    chapter: string
    label: string
    /** Event date, or null until announced. */
    date?: string | null
    /** Pamphlet image/PDF URL, or null until available. */
    pamphlet?: string | null
    /** Backend slot key for the pamphlet (overrides `pamphlet` when uploaded). */
    pamphletKey?: string
    /** Overall champions (juara umum 1-3). */
    champions?: Champion[]
    /** Champions split per level (overrides `champions` when present). */
    championGroups?: ChampionGroup[]
    /** Teaser card for the upcoming chapter. */
    teaser?: boolean
    teaserText?: string
    teaserSubtitle?: string
    highlight?: boolean
}

export interface ContactPerson {
    label: string
    name: string
    /** WhatsApp number in international format without "+" (e.g. "628xx"), or null. */
    whatsapp: string | null
    /** Optional message prefilled in the WhatsApp chat. */
    message?: string
}

export const site = {
    identity: {
        unitLabel: 'PASKIBRA UNIT 101 SMA NEGERI 1 JENEPONTO',
        name: 'SPARTACUS',
        chapter: 'CHAPTER 4',
        tagline: 'Semangat Paskibra Tangguh, Cerdas, Unggul, dan Sportivitas',
        // organizer: 'Paskibra Unit 101 SMA Negeri 1 Jeneponto',
    },

    assets: {
        /** Path to a logo image in /public, or null to use the text wordmark. */
        logo: '/logo.png' as string | null,
        /** Combined logo strip shown at the far left of the navbar. */
        navLogo: '/logo-semua.png' as string | null,
        /** Path to a hero illustration image in /public, or null to use the built-in SVG artwork. */
        hero: '/hero.png' as string | null,
    },

    nav: [
        { label: 'Beranda', href: '/#' },
        { label: 'Profil', href: '/profil' },
        { label: 'Jejak', href: '/sejarah' },
        { label: 'Kontak', href: '/#kontak' },
    ] as NavItem[],

    /** School submission models — invitation request and contingent registration. */
    submissions: [
        {
            title: 'Pengajuan Undangan',
            description: 'Untuk sekolah yang memerlukan surat undangan resmi.',
            url: null,
            key: 'form-undangan',
        },
        {
            title: 'Pendaftaran Kontingen',
            description: 'Registrasi kontingen peserta SPARTACUS Chapter 4.',
            url: null,
            key: 'form-kontingen',
        },
    ] as SubmissionItem[],

    info: {
        kegiatan: {
            title: 'Informasi Kegiatan',
            items: [
                { title: 'Pamflet Lomba', url: null, key: 'pamflet-ch4' },
                { title: 'Surat Rekomendasi', url: null, key: 'surat-rekomendasi' },
                { title: 'Juklak & Juknis', url: null, key: 'juklak-juknis' },
            ],
        } as DocPanel,
        panduan: {
            title: 'Berkas Pendaftaran',
            items: [
                { title: 'Berkas Pendaftaran SMA/SMK/MA', word: null, pdf: null, wordKey: 'berkas-sma-word', pdfKey: 'berkas-sma-pdf' },
                { title: 'Berkas Pendaftaran SMP/MTs', word: null, pdf: null, wordKey: 'berkas-smp-word', pdfKey: 'berkas-smp-pdf' },
            ],
        } as DocPanel,
    },

    scoring: [
        {
            level: 'SMA/SMK/MA',
            items: [
                { title: 'Lomba Khusus', url: null, key: 'nilai-sma-khusus' },
                { title: 'Lomba Umum', url: null, key: 'nilai-sma-umum' },
                { title: 'Lomba Seni', url: null, key: 'nilai-sma-seni' },
                { title: 'Lomba Eksebisi', url: null, key: 'nilai-sma-eksebisi' },
            ],
        },
        {
            level: 'SMP/MTs',
            items: [
                { title: 'Lomba Khusus', url: null, key: 'nilai-smp-khusus' },
                { title: 'Lomba Umum', url: null, key: 'nilai-smp-umum' },
                { title: 'Lomba Seni', url: null, key: 'nilai-smp-seni' },
                { title: 'Lomba Eksebisi', url: null, key: 'nilai-smp-eksebisi' },
            ],
        },
    ] as ScoringLevel[],

    contacts: [
        {
            label: 'Registrasi Peserta',
            name: 'Registrasi Peserta',
            whatsapp: '6285151263208',
            message: 'Halo, Kak. Saya ingin bertanya mengenai SPARTACUS Chapter 4, khususnya terkait informasi lomba dan pendaftaran peserta. Mohon informasi lebih lanjutnya. Terima kasih.'
        },
        {
            label: 'Boby Prakasi',
            name: 'Boby Prakasi',
            whatsapp: '6285824750537',
            message: 'Halo, Kak Boby. Saya ingin bertanya mengenai SPARTACUS Chapter 4. Mohon informasi lebih lanjutnya. Terima kasih.'
        },
    ] as ContactPerson[],

    profil: {
        title: 'Profil SPARTACUS',
        description: [
            'SPARTACUS merupakan ajang perlombaan Paskibra antarsekolah yang diselenggarakan oleh Paskibra Unit 101 SMA Negeri 1 Jeneponto pada tingkat kabupaten maupun provinsi. Nama SPARTACUS merupakan singkatan dari Semangat Paskibra Tangguh, Cerdas, Unggul, dan Sportivitas. Kegiatan ini menjadi wadah bagi generasi muda untuk mengembangkan kemampuan, menyalurkan kreativitas, serta mempererat persaudaraan antarsekolah melalui kompetisi.',

            'Perjalanan SPARTACUS dimulai pada tahun 2022, dilanjutkan dengan Chapter 2 pada tahun 2024 dan Chapter 3 pada awal tahun 2026. Setiap chapter menjadi kesempatan untuk mengevaluasi dan meningkatkan kualitas penyelenggaraan, sekaligus menghadirkan pengalaman serta ruang berprestasi bagi para peserta.',

            'Memasuki Chapter 4, SPARTACUS melanjutkan komitmennya untuk menghadirkan kompetisi yang menjunjung kedisiplinan, kekompakan, kreativitas, dan sportivitas. Melalui beragam mata lomba, peserta diharapkan mampu mengasah keterampilan, membangun kepercayaan diri, serta menunjukkan prestasi terbaik setiap proses yang dilalui.',
        ],
    },

    sejarah: {
        title: 'Perjalanan SPARTACUS',
        chapters: [
            {
                chapter: 'Chapter 1',
                label: 'SPARTACUS Chapter 1',
                date: '07 - 09 Oktober 2022',
                pamphlet: null,
                pamphletKey: 'pamflet-ch1',
                champions: [
                    { rank: 1, name: 'SMA Negeri 6 Jeneponto' },
                    { rank: 2, name: 'SMA Negeri 2 Jeneponto' },
                    { rank: 3, name: 'SMA Al - Bahra Jeneponto' },
                ],
            },
            {
                chapter: 'Chapter 2',
                label: 'SPARTACUS Chapter 2',
                date: '16 - 21 Desember 2024',
                pamphlet: null,
                pamphletKey: 'pamflet-ch2',
                champions: [
                    { rank: 1, name: 'SMA Negeri 2 Jeneponto' },
                    { rank: 2, name: 'SMA Negeri 3 Jeneponto' },
                    { rank: 3, name: 'MTs Negeri 2 Jeneponto' },
                ],
            },
            {
                chapter: 'Chapter 3',
                label: 'SPARTACUS Chapter 3',
                date: '04 - 09 Januari 2026',
                pamphlet: null,
                pamphletKey: 'pamflet-ch3',
                championGroups: [
                    {
                        level: 'SMA/SMK/MA',
                        champions: [
                            { rank: 1, name: 'SMA Negeri 2 Gowa' },
                            { rank: 2, name: 'SMA Negeri 2 Jeneponto' },
                            { rank: 3, name: 'SMK Negeri 2 Gowa' },
                        ],
                    },
                    {
                        level: 'SMP/MTs',
                        champions: [
                            { rank: 1, name: 'MTs Negeri 2 Jeneponto' },
                            { rank: 2, name: 'SMP Negeri 1 Parangloe' },
                            { rank: 3, name: 'SMP Negeri 1 Binamu' },
                        ],
                    },
                ],
            },
            {
                chapter: 'Chapter 4',
                label: 'SPARTACUS Chapter 4',
                teaser: true,
                teaserText: "Who's Next?",
                teaserSubtitle: 'Giliran sekolahmu membuktikan diri di SPARTACUS Chapter 4.',
                highlight: true,
            },
        ] as ChapterItem[],
    },

    footer: {
        copyright: '© 2026',
        developer: { label: 'Developed by', name: 'Farhan', url: 'https://fauzanazhari.vercel.app' },
    },
}

export type Site = typeof site
