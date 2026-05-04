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

function isValid(payload: JoinPayload) {
  return (
    payload.name.length > 1 &&
    payload.email.includes('@') &&
    payload.city.length > 1 &&
    payload.interest.length > 1 &&
    payload.whatsapp.length > 5
  )
}

export async function POST(request: Request) {
  const payload = (await request.json()) as JoinPayload

  if (!isValid(payload)) {
    return NextResponse.json({error: 'invalid'}, {status: 400})
  }

  const {error} = await supabase.from('join_requests').insert(payload)
  if (error) {
    return NextResponse.json({error: 'failed'}, {status: 500})
  }

  await sendJoinNotification(payload)
  return NextResponse.json({ok: true})
}
