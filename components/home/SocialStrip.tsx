const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/partaibulanbintang.official',
  },
  {label: 'X / Twitter', href: 'https://x.com/officialdpp_pbb'},
  {label: 'YouTube', href: 'https://www.youtube.com/@pbbchannelofficial'},
]

export function SocialStrip() {
  return (
    <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white px-6 py-5">
      <p className="text-sm text-[#6b6b6b]">Ikuti update kami di media sosial.</p>
      <div className="flex gap-4 text-sm">
        {socials.map((item) => (
          <a
            key={item.label}
            className="underline"
            href={item.href}
            target="_blank"
            rel="noreferrer noopener"
          >
            {item.label}
          </a>
        ))}
      </div>
    </section>
  )
}
