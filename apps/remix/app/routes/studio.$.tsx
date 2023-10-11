import { useEffect, useMemo, useState } from 'react'
import { Studio } from 'sanity'
import { getSanityConfig } from '../../sanity.config'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { projectId, datasets } from 'apps-common/env'

export async function loader() {
  const dataset = datasets.development

  if (!projectId) {
    throw new Error('Missing environment variable: SANITY_PROJECT_ID')
  }

  if (!dataset) {
    throw new Error('Missing environment variable: SANITY_DATASET')
  }

  return json({ projectId, dataset })
}

export default function StudioRoute() {
  const data = useLoaderData<typeof loader>()

  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const studioConfig = useMemo(() => getSanityConfig(data), [data])

  if (!mounted) {
    return null
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      <Studio config={studioConfig} />
    </div>
  )
}
