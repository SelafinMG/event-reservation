import { notFound } from "next/navigation"
import { SpeakerDetailClient } from "./SpeakerDetailClient"
import { getSpeaker } from "@/data/speakers"

interface SpeakerDetailPageProps {
  params: Promise<{ speakerId: string }>
}

export default async function SpeakerDetailPage({ params }: SpeakerDetailPageProps) {
  const { speakerId } = await params

  try {
    await getSpeaker(speakerId)
  } catch {
    notFound()
  }

  return <SpeakerDetailClient speakerId={speakerId} />
}
