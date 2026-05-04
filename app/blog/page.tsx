import {sanityFetch} from '@/lib/sanity/client'
import {blogListQuery} from '@/lib/sanity/queries'
import type {BlogItem} from '@/lib/sanity/types'

export const revalidate = 120

export default async function BlogPage() {
  const blogs = await sanityFetch<BlogItem[]>(blogListQuery, undefined, [])
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Blog</h1>
      <ul className="mt-6 space-y-3">
        {blogs.map((item) => (
          <li key={item._id}>
            <a className="text-lg underline" href={`/blog/${item.slug}`}>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
