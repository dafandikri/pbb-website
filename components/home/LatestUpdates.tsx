import {sanityFetch} from '@/lib/sanity/client'
import {eventListQuery, newsListQuery} from '@/lib/sanity/queries'
import type {EventItem, NewsItem} from '@/lib/sanity/types'

export async function LatestUpdates() {
  const news = await sanityFetch<NewsItem[]>(newsListQuery, undefined, [])
  const events = await sanityFetch<EventItem[]>(eventListQuery, undefined, [])

  return (
    <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="rounded-2xl border border-black/10 bg-white p-6">
        <h2 className="text-2xl font-semibold">News Terbaru</h2>
        <ul className="mt-4 space-y-3">
          {news.slice(0, 3).map((item) => (
            <li key={item._id}>
              <a className="text-sm underline" href={`/news/${item.slug}`}>
                {item.title}
              </a>
            </li>
          ))}
          {news.length === 0 && (
            <li className="text-sm text-[#6b6b6b]">Belum ada berita.</li>
          )}
        </ul>
      </div>
      <div className="rounded-2xl border border-black/10 bg-white p-6">
        <h2 className="text-2xl font-semibold">Event</h2>
        <ul className="mt-4 space-y-3">
          {events.slice(0, 2).map((item) => (
            <li key={item._id}>
              <a className="text-sm underline" href={`/events/${item.slug}`}>
                {item.title}
              </a>
            </li>
          ))}
          {events.length === 0 && (
            <li className="text-sm text-[#6b6b6b]">Belum ada event.</li>
          )}
        </ul>
      </div>
    </section>
  )
}
