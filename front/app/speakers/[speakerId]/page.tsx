import { SpeakerDetailClient } from "./SpeakerDetailClient"

interface SpeakerDetailPageProps {
  params: Promise<{ speakerId: string }>
}

export default async function SpeakerDetailPage({ params }: SpeakerDetailPageProps) {
  const { speakerId } = await params

  return <SpeakerDetailClient speakerId={speakerId} />
}
