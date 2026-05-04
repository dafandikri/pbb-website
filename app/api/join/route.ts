import {NextResponse} from 'next/server'
import {supabase} from '@/lib/supabase/client'
import {sendJoinNotification} from '@/lib/email/sender'

type JoinPayload = {
  name: string
  email: string
  city: string
  interest: string
  whatsapp: string
}

export async function POST(request: Request) {
  const payload = (await request.json()) as JoinPayload

  const {error} = await supabase.from('join_requests').insert(payload)
  if (error) {
    return NextResponse.json({error: 'failed'}, {status: 500})
  }

  await sendJoinNotification(payload)
  return NextResponse.json({ok: true})
}
