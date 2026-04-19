"use client";
import { useState } from "react";
import { ArrowUpRight, CirclePlay, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import BookingModal from "./modal/BookingModal";
import { IEvent } from "@/types/event.types";
import CountdownButton from "./shared/CountdownButton";
import { getUserInfo } from "@/services/auth.services";

export default function EventDetails({
  event,
  userInfo,
}: {
  event: IEvent;
  userInfo: any;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const isLoggedIn = !!userInfo;

  const handleBooking = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setOpen(true);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden">
      <div className="mx-auto grid w-full max-w-(--breakpoint-xl) gap-12 px-6 py-12 lg:grid-cols-2 lg:py-0">
        <div>
          <h1 className="mt-6 font-semibold text-4xl leading-[1.2]! tracking-[-0.035em] md:text-5xl">
            {event?.name}
          </h1>

          <p className="flex items-center gap-3 mt-4 text-muted-foreground">
            <MapPin className="h-5 w-5" /> {event.location}
          </p>

          <p className="mt-2 text-2xl font-bold">
            BDT {event.price} Per Person
          </p>

          <div className="mt-4 space-y-1">
            <p>Start Date: {new Date(event.startDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(event.endDate).toLocaleDateString()}</p>
            <p className="flex gap-2 items-center">
              Start Event: <CountdownButton targetDate={event?.startDate} />
            </p>
          </div>

          <div
            className="mt-6 prose text-foreground/80"
            dangerouslySetInnerHTML={{ __html: event.content }}
          />

          <div className="mt-12 flex items-center gap-4">
            <Button
              onClick={handleBooking}
              className="rounded-full text-base cursor-pointer"
              size="lg"
            >
              Booking Now <ArrowUpRight className="h-5! w-5!" />
            </Button>
            <BookingModal open={open} setOpen={setOpen} />
            <Button
              className="rounded-full text-base shadow-none cursor-pointer"
              size="lg"
              variant="outline"
            >
              <CirclePlay className="h-5! w-5!" /> Watch Video
            </Button>
          </div>
        </div>

        <div className="aspect-video w-full rounded-xl bg-accent lg:aspect-auto lg:h-[calc(100vh-4rem)] lg:w-full relative overflow-hidden">
          <Image
            src={event.imageUrl || "/placeholder.jpg"}
            alt={event.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
