import { ArrowRight, Blocks, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { getEvents } from "@/services/event.services";
import { IEvent } from "@/types/event.types";
import CountdownButton from "./shared/CountdownButton";

// 1. Mark the component as async to fetch data directly
const Features = async () => {
  // Fetch data directly inside the component
  const events = await getEvents();
  // console.log("==========events", events);
  if (!events || events.length === 0) {
    return <div className="text-center py-20">No adventures found.</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-(--breakpoint-lg) px-6 py-12">
        <h2 className="font-semibold text-3xl leading-10 tracking-tight sm:text-4xl md:text-[40px] md:leading-13">
          Discover Your Next Adventure
        </h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-3">
          {events?.map((event, index) => {
            const isEven = index % 2 === 0;

            return (
              <div key={event.id} className="contents">
                {/* Mobile View */}
                <div className="col-span-1 rounded-xl bg-muted p-6 md:hidden">
                  <div className="mb-6 aspect-video w-full rounded-xl bg-background relative overflow-hidden">
                    <Image
                      src={event.imageUrl || "/placeholder.jpg"}
                      alt={event.name || "Event"}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                  <RenderCardContent event={event} />
                </div>

                {/* Desktop View (Alternating Layout) */}
                {isEven ? (
                  <>
                    <div className="hidden md:block col-span-2 lg:col-span-1 rounded-xl bg-muted p-6">
                      <RenderCardContent event={event} />
                    </div>
                    <div className="hidden md:block col-span-3 lg:col-span-2 relative rounded-xl overflow-hidden">
                      <Image
                        src={event.imageUrl || "/placeholder.jpg"}
                        alt={event.name || "Event"}
                        fill
                        sizes="(max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="hidden md:block col-span-3 lg:col-span-2 relative rounded-xl overflow-hidden">
                      <Image
                        src={event.imageUrl || "/placeholder.jpg"}
                        alt={event.name || "Event"}
                        fill
                        sizes="(max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="hidden md:block col-span-2 lg:col-span-1 rounded-xl bg-muted p-6">
                      <RenderCardContent event={event} />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Sub-component to render the card text (Server-Side)
const RenderCardContent = ({ event }: { event: IEvent }) => (
  <>
    <span className="font-semibold text-xl tracking-tight">{event.name}</span>
    <ul className="mt-6 space-y-5">
      <li>
        <div className="flex items-start gap-3">
          <Settings2 className="shrink-0" />
          <p className="-mt-0.5">{event.description || event.description}</p>
        </div>
      </li>
      <li>
        <div className="flex items-start gap-3">
          <Blocks className="shrink-0" />
          <div>
            <div>
              <p>Event Fee: {event?.price} Tk</p>
            </div>
            <div className="flex gap-2">
              <p>Start Event:</p>
              <CountdownButton targetDate={event?.startDate} />
            </div>
          </div>
          {/* <p className="-mt-0.5">
            {event.description ||
              "Explore more details about this amazing trip."}
          </p> */}
        </div>
      </li>
    </ul>
    <Link href={`/event/${event.id}`}>
      <Button className="mt-8 w-full cursor-pointer">
        Booking for Details
        <ArrowRight />
      </Button>
    </Link>
  </>
);

export default Features;
