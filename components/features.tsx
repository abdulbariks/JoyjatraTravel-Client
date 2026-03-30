import { ArrowRight, Blocks, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const Features = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-(--breakpoint-lg) px-6 py-12">
        <h2 className="font-semibold text-3xl leading-10 tracking-tight sm:text-4xl md:text-[40px] md:leading-13">
          Discover Your Next Adventure
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="col-span-1 rounded-xl bg-muted p-6 md:col-span-2 lg:col-span-1">
            {/* Media 1 Mobile */}
            <div className="mb-6 aspect-video w-full rounded-xl bg-background md:hidden relative overflow-hidden">
              {" "}
              <Image
                src="/images/sajek.jpg"
                alt="Hero image"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            </div>

            <span className="font-semibold text-xl tracking-tight">
              Sajek Valley
            </span>

            <ul className="mt-6 space-y-5">
              <li>
                <div className="flex items-start gap-3">
                  <Settings2 className="shrink-0" />
                  <p className="-mt-0.5">
                    Sajek Valley is one of the most beautiful travel
                    destinations in Bangladesh, located in the hills of
                    Rangamati near the border of India.
                  </p>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <Blocks className="shrink-0" />
                  <p className="-mt-0.5">
                    Known as the “Queen of Hills”, Sajek offers breathtaking
                    views of clouds, mountains, and lush green landscapes..
                  </p>
                </div>
              </li>
            </ul>
            <Link href={"/event/1"}>
              {" "}
              <Button className="mt-8 w-full cursor-pointer">
                Booking for Details
                <ArrowRight />
              </Button>
            </Link>
          </div>
          {/* Media 1 Desktop */}
          <div className="col-span-1 hidden rounded-xl bg-muted md:col-span-3 md:block lg:col-span-2 relative overflow-hidden">
            <Image
              src="/images/sajek.jpg"
              alt="Hero image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Media 2 Desktop */}
          <div className="col-span-1 hidden rounded-xl bg-muted md:col-span-3 md:block lg:col-span-2 relative overflow-hidden">
            <Image
              src="/images/saint.jpg"
              alt="Hero image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Card 2 */}
          <div className="col-span-1 rounded-xl bg-muted p-6 md:col-span-2 lg:col-span-1">
            {/* Media 2 Mobile */}
            <div className="mb-6 aspect-video w-full rounded-xl bg-background md:hidden relative overflow-hidden">
              {" "}
              <Image
                src="/images/saint.jpg"
                alt="Hero image"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            </div>

            <span className="font-semibold text-xl tracking-tight">
              Saint Martin&#39s Island
            </span>

            <ul className="mt-6 space-y-4">
              <li>
                <div className="flex items-start gap-3">
                  <Settings2 className="shrink-0" />
                  <p className="-mt-0.5">
                    Saint Martin’s Island is the only coral island in
                    Bangladesh, located in the Bay of Bengal. It’s famous for
                    its crystal-clear water, coconut trees, and peaceful beach
                    vibes.
                  </p>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <Blocks className="shrink-0" />
                  <p className="-mt-0.5">
                    This is one of the most popular destinations for travelers
                    who want a relaxing and tropical experience.
                  </p>
                </div>
              </li>
            </ul>

            <Link href={"/event/1"}>
              {" "}
              <Button className="mt-8 w-full cursor-pointer">
                Booking for Details
                <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
