import EventDetails from "@/components/EventDetails";
import { getUserInfo } from "@/services/auth.services";
import { getEventById } from "@/services/event.services";
import { notFound } from "next/navigation";

export default async function EventDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const event = await getEventById(id);
  const userInfo = await getUserInfo().catch(() => null);
  console.log(userInfo);
  if (!event) {
    return notFound();
  }

  return <EventDetails event={event} userInfo={userInfo} />;
}
