import { ArrowUpRight, CirclePlay } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden">
      <div className="mx-auto grid w-full max-w-(--breakpoint-xl) gap-12 px-6 py-12 lg:grid-cols-2 lg:py-0">
        <div className="my-auto">
          <Badge
            className="rounded-full border-border py-1"
            variant="secondary"
            render={<Link href="#" />}
          >
            Just released v1.0.0 <ArrowUpRight className="ml-1 size-4" />
          </Badge>
          <h1 className="mt-6 max-w-[17ch] font-semibold text-4xl leading-[1.2]! tracking-[-0.035em] md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]">
            Turn Your Travel Dreams Into Reality
          </h1>
          <p className="mt-6 max-w-[60ch] text-foreground/80 text-lg">
            Discover stunning locations, plan your journey, and book with
            confidence. Adventure, relaxation, and unforgettable memories are
            just a click away.
          </p>
          <div className="mt-12 flex items-center gap-4">
            <Link href={"/event"}>
              {" "}
              <Button
                className="rounded-full text-base cursor-pointer"
                size="lg"
              >
                Get Started <ArrowUpRight className="h-5! w-5!" />
              </Button>
            </Link>

            <Button
              className="rounded-full text-base shadow-none cursor-pointer"
              size="lg"
              variant="outline"
            >
              <CirclePlay className="h-5! w-5!" /> Watch Demo
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
