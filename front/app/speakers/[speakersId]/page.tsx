import { notFound } from "next/navigation"
import { SpeakerDetailClient } from "./SpeakerDetailClient"

interface SpeakerDetailPageProps {
  params: Promise<{ speakerId: string }>
}

export default async function SpeakerDetailPage({ params }: SpeakerDetailPageProps) {
  const { speakerId } = await params

  const res = await fetch(`http://localhost:3001/v1/speakers/${speakerId}`, { cache: "no-store" })
  if (!res.ok) {
    notFound()
  }

  const speaker = await res.json()

  return <SpeakerDetailClient speakerId={speakerId} />
}
