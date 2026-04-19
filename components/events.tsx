"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CountdownButton from "./shared/CountdownButton";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { IEvent } from "@/types/event.types";
import { getEvents } from "@/services/event.services";

const features = [
  {
    location: "Sajek Valley",
    title: "Sajek valley",
    details:
      "Take control over how and when to follow up with your leads. Store and reference leads in multiple tables and, from there, automatically send them personalized emails.",
    tutorialLink: "/event/1",
    image: "/images/sajek.jpg",
  },
  {
    location: "Cox's Bazar",
    title: "Cox's Bazar",
    details:
      "Organize tasks, deadlines, and team collaboration in one place. Use customizable boards to manage projects efficiently and automate routine updates.",
    tutorialLink: "/event/2",
  },
  {
    location: "Sandwip Island",
    title: "Sandwip Island",
    details:
      "Track and resolve customer queries faster with an integrated ticketing system. Set priorities, automate follow-ups, and enhance satisfaction with personalized responses.",
    tutorialLink: "/event/3",
  },
  {
    location: "Saint Martin's Island",
    title: "Saint Martin's Island",
    details:
      "Simplify communication and align team efforts with shared boards and real-time updates. Enable transparent goal tracking and instant feedback for better results.",
    tutorialLink: "/event/4",
  },
  {
    location: "Product Development",
    title: "Accelerate innovation with ease",
    details:
      "Bring your product ideas to life by managing prototypes, feedback, and iterations in one place. Collaborate with your team to refine features and release with confidence.",
    tutorialLink: "#",
  },
];

export default function Events({
  initialQueryString,
}: {
  initialQueryString: string;
}) {
  const { data: events, isLoading } = useQuery<IEvent[]>({
    queryKey: ["events", initialQueryString],
    queryFn: () => getEvents(initialQueryString || ""),
  });

  console.log("events====================", events);

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-(--breakpoint-lg) px-6 py-10">
        <h2 className="text-pretty font-semibold text-4xl tracking-[-0.03em] sm:mx-auto sm:max-w-xl sm:text-center md:text-[2.75rem] md:leading-[1.2]">
          Discover Your Next Adventure
        </h2>
        <div className="mx-auto mt-8 w-full space-y-20 md:mt-16">
          {events?.map((event) => (
            <div
              className="flex flex-col items-center gap-x-12 md:flex-row md:even:flex-row-reverse"
              key={event.id}
            >
              <div className="aspect-4.5/3 w-full basis-1/2 rounded-xl border border-border/50 bg-muted relative overflow-hidden">
                {" "}
                <Image
                  src={event?.imageUrl || "/images/placeholder.png"}
                  alt="Event image"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="shrink-0 basis-1/2">
                <span className="font-medium text-muted-foreground text-sm uppercase">
                  {event?.location}
                </span>
                <h4 className="font-semibold text-3xl tracking-[-0.01em]">
                  {event?.name}
                </h4>

                <p className="text-muted-foreground">{event?.description}</p>
                <Button
                  className="mt-6 gap-3"
                  size="lg"
                  render={<Link href={`event/${event?.id}`} />}
                  nativeButton={false}
                >
                  Booking for Details <ArrowRight />
                </Button>
                <CountdownButton targetDate={event?.startDate} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
