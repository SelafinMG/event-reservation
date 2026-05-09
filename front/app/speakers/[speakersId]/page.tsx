import { notFound } from "next/navigation"
import { getSpeakerById } from "@/lib/mockApi"
import { SpeakerDetailClient } from "./SpeakerDetailClient"

interface SpeakerDetailPageProps {
  params: Promise<{ speakerId: string }>
}

export default async function SpeakerDetailPage({ params }: SpeakerDetailPageProps) {
  const { speakerId } = await params
  const speaker = await getSpeakerById(speakerId)

  if (!speaker) {
    notFound()
  }

  return <SpeakerDetailClient speaker={speaker} />
}
