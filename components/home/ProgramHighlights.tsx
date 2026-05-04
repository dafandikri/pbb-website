const programs = [
  'Kualitas pendidikan dan literasi digital',
  'Kesempatan kerja untuk generasi muda',
  'Ekonomi kreatif dan UMKM lokal',
  'Keadilan sosial dan layanan publik',
]

export function ProgramHighlights() {
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-8">
      <h2 className="text-2xl font-semibold">Program Prioritas</h2>
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {programs.map((program) => (
          <li key={program} className="rounded-xl border border-black/10 px-4 py-3">
            {program}
          </li>
        ))}
      </ul>
      <a className="mt-4 inline-flex text-sm underline" href="/program">
        Lihat semua program
      </a>
    </section>
  )
}
