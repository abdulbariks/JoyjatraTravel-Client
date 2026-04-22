import Image from "next/image";

export default function PhotoGrid() {
  return (
    <section className="py-6 dark:bg-gray-100 dark:text-gray-900">
      <div className="container grid grid-cols-2 gap-4 p-4 mx-auto md:grid-cols-4">
        {/* Large Item 1 */}
        <div className="relative w-full col-span-2 row-span-2 min-h-96 md:col-start-3 md:row-start-1">
          <Image
            src="https://res.cloudinary.com/di4lxioem/image/upload/v1776758922/joyjatra-travel/images/uh6fdqk380e-1776758920136-----sajek-valley-tour-package-2.webp" // Replace with actual ID
            alt="Gallery image"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="rounded shadow-sm object-cover"
          />
        </div>

        {/* Small Items */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="relative w-full min-h-48">
            <Image
              src={`https://res.cloudinary.com/di4lxioem/image/upload/v1776758922/joyjatra-travel/images/uh6fdqk380e-1776758920136-----sajek-valley-tour-package-2.webp`}
              alt={`Gallery image ${i}`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="rounded shadow-sm object-cover"
            />
          </div>
        ))}

        {/* Large Item 2 */}
        <div className="relative w-full col-span-2 row-span-2 min-h-96 md:col-start-1 md:row-start-3">
          <Image
            src="https://res.cloudinary.com/di4lxioem/image/upload/v1776758922/joyjatra-travel/images/uh6fdqk380e-1776758920136-----sajek-valley-tour-package-2.webp"
            alt="Gallery image"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="rounded shadow-sm object-cover"
          />
        </div>
      </div>
    </section>
  );
}
