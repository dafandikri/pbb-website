import {Resend} from 'resend'

const apiKey = process.env.RESEND_API_KEY ?? ''
const resend = apiKey ? new Resend(apiKey) : null

export async function sendJoinNotification(payload: {
  name: string
  email: string
  city: string
  interest: string
  whatsapp: string
}) {
  if (!resend) {
    return
  }

  await resend.emails.send({
    from: 'noreply@partaibulanbintang.or.id',
    to: [process.env.JOIN_NOTIFICATION_EMAIL ?? 'admin@example.com'],
    subject: 'Pendaftaran Join/Volunteer Baru',
    text: `Nama: ${payload.name}\nEmail: ${payload.email}\nKota: ${payload.city}\nMinat: ${payload.interest}\nWhatsApp: ${payload.whatsapp}`,
  })
}
