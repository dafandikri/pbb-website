const navItems = [
  {label: 'Home', href: '/'},
  {label: 'Profil', href: '/profil'},
  {label: 'Program', href: '/program'},
  {label: 'News', href: '/news'},
  {label: 'Events', href: '/events'},
  {label: 'Blog', href: '/blog'},
  {label: 'Press Kit', href: '/press-kit'},
  {label: 'FAQ', href: '/faq'},
  {label: 'Join', href: '/join'},
]

export function Header() {
  return (
    <header className="border-b border-black/10 bg-[#f6f2ea]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-6 py-6">
        <span className="text-lg font-semibold">PBB</span>
        <nav className="flex flex-wrap gap-4 text-sm text-black/70">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
