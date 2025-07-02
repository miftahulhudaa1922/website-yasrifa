'use client'

import { useEffect, useState } from 'react'
import LoadingDots from './LoadingDots'

export default function PageLoaderClient({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timeout)
  }, [])

  return <>{loading ? <LoadingDots /> : children}</>
}
