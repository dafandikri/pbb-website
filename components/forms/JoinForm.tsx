'use client'

import {useState} from 'react'

type JoinPayload = {
  name: string
  email: string
  city: string
  interest: string
  whatsapp: string
}

const emptyPayload: JoinPayload = {
  name: '',
  email: '',
  city: '',
  interest: '',
  whatsapp: '',
}

export function JoinForm() {
  const [payload, setPayload] = useState<JoinPayload>(emptyPayload)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  )

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')

    const response = await fetch('/api/join', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      setStatus('error')
      return
    }

    setPayload(emptyPayload)
    setStatus('success')
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Nama</span>
        <input
          className="w-full rounded-md border border-black/10 px-3 py-2"
          value={payload.name}
          onChange={(event) =>
            setPayload((prev) => ({...prev, name: event.target.value}))
          }
          required
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Email</span>
        <input
          className="w-full rounded-md border border-black/10 px-3 py-2"
          type="email"
          value={payload.email}
          onChange={(event) =>
            setPayload((prev) => ({...prev, email: event.target.value}))
          }
          required
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Kota</span>
        <input
          className="w-full rounded-md border border-black/10 px-3 py-2"
          value={payload.city}
          onChange={(event) =>
            setPayload((prev) => ({...prev, city: event.target.value}))
          }
          required
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Minat</span>
        <input
          className="w-full rounded-md border border-black/10 px-3 py-2"
          value={payload.interest}
          onChange={(event) =>
            setPayload((prev) => ({...prev, interest: event.target.value}))
          }
          required
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">WhatsApp</span>
        <input
          className="w-full rounded-md border border-black/10 px-3 py-2"
          value={payload.whatsapp}
          onChange={(event) =>
            setPayload((prev) => ({...prev, whatsapp: event.target.value}))
          }
          required
        />
      </label>
      <button
        className="rounded-full bg-black px-6 py-3 text-white"
        type="submit"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Mengirim...' : 'Daftar'}
      </button>
      {status === 'success' && (
        <p className="text-sm text-emerald-700">
          Terima kasih! Tim kami akan menghubungi.
        </p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-600">Gagal mengirim. Coba lagi.</p>
      )}
    </form>
  )
}
