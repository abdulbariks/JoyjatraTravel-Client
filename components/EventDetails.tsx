"use client";
import { useState } from "react";
import { ArrowUpRight, CirclePlay, LocationEditIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import BookingModal from "./modal/BookingModal";

export default function EventDetails() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const isLoggedIn = true; // Replace with actual authentication logic
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
        <div className="">
          <h1 className="mt-6 max-w-[17ch] font-semibold text-4xl leading-[1.2]! tracking-[-0.035em] md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]">
            Sajek Valley
          </h1>
          <p
            className="flex items-center
          gap-3"
          >
            <LocationEditIcon /> Rangamati, Bangladesh
          </p>
          <p>BDT 6000 Per Person </p>
          <div>
            <p>start date: 15th June 2023 to 17th June 2023</p>
            <p>Duration: 3 Days 2 Nights</p>
          </div>
          <p className="mt-6 max-w-[60ch] text-foreground/80 text-lg">
            Discover stunning locations, plan your journey, and book with
            confidence. Adventure, relaxation, and unforgettable memories are
            just a click away.
          </p>
          <div className="mt-12 flex items-center gap-4">
            {" "}
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
              <CirclePlay className="h-5! w-5!" /> Watch Sajek Valley Video
            </Button>
          </div>
        </div>
        <div className="aspect-video w-full rounded-xl bg-accent lg:aspect-auto lg:h-[calc(100vh-4rem)] lg:w-250 relative overflow-hidden ">
          <Image
            src="/images/hero.jpg"
            alt="Hero image"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
