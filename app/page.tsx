import {HeroSection} from '@/components/home/HeroSection'
import {JoinBlock} from '@/components/home/JoinBlock'
import {LatestUpdates} from '@/components/home/LatestUpdates'
import {ProgramHighlights} from '@/components/home/ProgramHighlights'
import {SocialStrip} from '@/components/home/SocialStrip'
import {ValueProps} from '@/components/home/ValueProps'

export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16">
      <HeroSection />
      <ValueProps />
      <ProgramHighlights />
      <LatestUpdates />
      <JoinBlock />
      <SocialStrip />
    </main>
  )
}
