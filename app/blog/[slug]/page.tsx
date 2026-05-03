import {sanityClient} from '@/lib/sanity/client'
import {blogBySlugQuery, blogListQuery} from '@/lib/sanity/queries'
import type {BlogItem} from '@/lib/sanity/types'

export const revalidate = 120

export async function generateStaticParams() {
  const blogs = await sanityClient.fetch<BlogItem[]>(blogListQuery)
  return blogs.map((item) => ({slug: item.slug}))
}

export default async function BlogDetailPage({
  params,
}: {
  params: {slug: string}
}) {
  const blog = await sanityClient.fetch<BlogItem | null>(blogBySlugQuery, {
    slug: params.slug,
  })
  if (!blog) {
    return <main className="mx-auto max-w-4xl px-6 py-16">Not found</main>
  }
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-semibold">{blog.title}</h1>
      <p className="mt-4 text-lg text-[#6b6b6b]">{blog.excerpt}</p>
    </main>
  )
}
