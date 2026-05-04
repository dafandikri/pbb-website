const props = [
  {
    title: 'Transparan dan mudah dipahami',
    description: 'Ringkasan program dan agenda disajikan singkat dan rapi.',
  },
  {
    title: 'Fokus isu yang dekat dengan anak muda',
    description: 'Pendidikan, kerja, dan ruang digital jadi prioritas.',
  },
  {
    title: 'Aktif di lapangan',
    description: 'Update kegiatan terbaru dari berbagai daerah.',
  },
]

export function ValueProps() {
  return (
    <section className="grid gap-6 md:grid-cols-3">
      {props.map((item) => (
        <div key={item.title} className="rounded-2xl border border-black/10 bg-white p-6">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="mt-3 text-sm text-[#6b6b6b]">{item.description}</p>
        </div>
      ))}
    </section>
  )
}
