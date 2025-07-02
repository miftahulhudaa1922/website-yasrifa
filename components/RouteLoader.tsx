'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import LoadingDots from './LoadingDots'

export default function RouteLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 1000) // beri delay biar animasi muncul sebentar

    return () => clearTimeout(timeout)
  }, [pathname])

  return (
    <>
      {loading && <LoadingDots />}
      {!loading && children}
    </>
  )
}
