"use client";

import Image from "next/image";

const teamData = [
  {
    id: 1,
    name: "Leroy Jenkins",
    role: "Visual Designer",
    image: "/images/saint.jpg",
  },
  {
    id: 2,
    name: "Leroy Jenkins",
    role: "Visual Designer",
    image: "/images/saint.jpg",
  },
  {
    id: 3,
    name: "Leroy Jenkins",
    role: "Visual Designer",
    image: "/images/saint.jpg",
  },
  {
    id: 4,
    name: "Leroy Jenkins",
    role: "Visual Designer",
    image: "/images/saint.jpg",
  },
  {
    id: 5,
    name: "Leroy Jenkins",
    role: "Visual Designer",
    image: "/images/saint.jpg",
  },
  {
    id: 6,
    name: "Leroy Jenkins",
    role: "Visual Designer",
    image: "/images/saint.jpg",
  },
];

export default function Team() {
  return (
    <section className="py-6 dark:bg-gray-100 dark:text-gray-800">
      <div className="container flex flex-col items-center justify-center p-4 mx-auto space-y-8 sm:p-10">
        <h1 className="text-4xl font-bold leading-none text-center sm:text-5xl">
          Our team
        </h1>

        <p className="max-w-2xl text-center dark:text-gray-600">
          At a assumenda quas cum earum ut itaque commodi saepe rem aspernatur
          quam natus quis nihil quod, hic explicabo doloribus magnam neque,
          exercitationem eius sunt!
        </p>

        <div className="flex flex-row flex-wrap-reverse justify-center">
          {teamData.map((member) => (
            <div
              key={member.id}
              className="flex flex-col justify-center m-8 text-center"
            >
              {/* ✅ Next Image */}
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="rounded-full object-cover"
                  sizes="96px"
                />
              </div>

              <p className="text-xl font-semibold leading-tight">
                {member.name}
              </p>
              <p className="dark:text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
