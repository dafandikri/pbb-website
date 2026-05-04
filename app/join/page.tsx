import {JoinForm} from '@/components/forms/JoinForm'

export default function JoinPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Join</h1>
      <div className="mt-6">
        <JoinForm />
      </div>
    </main>
  )
}
