export function HeroSection() {
  return (
    <section className="rounded-3xl border border-black/10 bg-white px-8 py-12">
      <p className="text-sm uppercase tracking-[0.2em] text-[#6b6b6b]">
        Partai Bulan Bintang
      </p>
      <h1 className="mt-4 text-4xl font-semibold leading-tight">
        Membangun ruang politik yang relevan dan dekat dengan generasi muda.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-[#6b6b6b]">
        Ikuti program, kegiatan, dan gagasan PBB dengan cara yang lebih sederhana
        dan mudah dipahami.
      </p>
      <a
        className="mt-6 inline-flex items-center rounded-full bg-black px-6 py-3 text-white"
        href="/join"
      >
        Join/Volunteer
      </a>
    </section>
  )
}
