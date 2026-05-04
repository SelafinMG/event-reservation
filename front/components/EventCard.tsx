import Link from "next/link";

type Event = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
};

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="bg-blue-950/30 backdrop-blur-md border border-blue-800 rounded-lg p-4 shadow hover:shadow-lg transition">
      <h2 className="text-xl font-bold text-cyan-200">{event.title}</h2>
      <p className="text-blue-100">{event.description}</p>
      <p className="text-sm text-blue-300">
        📍 {event.location} | {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
      </p>
      <Link href={`/events/${event.id}`} className="text-cyan-300 hover:underline">
        Voir détails →
      </Link>
    </div>
  );
}
