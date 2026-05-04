import {JoinForm} from '@/components/forms/JoinForm'

export function JoinBlock() {
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-8">
      <h2 className="text-2xl font-semibold">Gabung dan bergerak bersama</h2>
      <p className="mt-3 text-sm text-[#6b6b6b]">
        Isi form berikut untuk terlibat sebagai relawan atau pendukung.
      </p>
      <div className="mt-6">
        <JoinForm />
      </div>
    </section>
  )
}
