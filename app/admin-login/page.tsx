'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (res?.ok) {
      router.push('/admin') // Arahkan ke dashboard utama
    } else {
      setError('Login gagal. Periksa kembali email dan password Anda.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 px-4">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4 text-center">Login Admin</h1>
        {error && <p className="text-red-600 mb-2 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-green-700 text-white p-2 rounded">Masuk</button>
      </form>
    </div>
  )
}
