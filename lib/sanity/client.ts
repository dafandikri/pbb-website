import {createClient} from 'next-sanity'
import type {QueryParams} from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export const hasSanityConfig =
  projectId.length > 0 &&
  dataset.length > 0 &&
  projectId !== 'example' &&
  dataset !== 'example'

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2025-03-04',
  useCdn: true,
})

export async function sanityFetch<T>(
  query: string,
  params: QueryParams | undefined,
  fallback: T
): Promise<T> {
  if (!hasSanityConfig) {
    return fallback
  }

  return sanityClient.fetch<T>(query, params)
}
