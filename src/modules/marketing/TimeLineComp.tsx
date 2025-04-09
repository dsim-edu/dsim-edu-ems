import Image from "next/image";
import React from "react";
import { Timeline } from "@/modules/marketing/Timeline";

import image1 from "../../../public/students/m-student-1.jpg";
import image2 from "../../../public/students/m-student-2.jpg";
import image3 from "../../../public/students/m-student-teacher.jpg";
import image4 from "../../../public/students/m-student-4.jpg";

import vision1 from "../../../public/vision/4.jpg";
import vision2 from "../../../public/vision/1.png";
import vision3 from "../../../public/vision/2.jpg";
import vision4 from "../../../public/vision/3.jpg";

import contact1 from "../../../public/contact/contact-1.jpg";
import contact2 from "../../../public/contact/contact-3.jpg";
import contact3 from "../../../public/contact/contact-2.jpg";
import contact4 from "../../../public/photo.png";

export function TimelineComp() {
  const data = [
    {
      title: "2025",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Empowering Minds with Knowledge & Faith at Our Madrasha
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src={image1}
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[...]"
            />
            <Image
              src={image2}
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[...]"
            />
            <Image
              src={image3}
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[...]"
            />
            <Image
              src={image4}
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[...]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Our Vision",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            In our Madrasha, education is a journey of both knowledge and
            faith...
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Knowledge is a trust, and we take this responsibility seriously...
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src={vision1}
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[...]"
            />
            <Image
              src={vision2}
              alt="feature template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[...]"
            />
            <Image
              src={vision3}
              alt="bento template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[...]"
            />
            <Image
              src={vision4}
              alt="cards template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[...]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Contact",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Contact Info
          </p>
          <div>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
              Get in touch with us for any inquiries or assistance
            </p>
            <div className="mb-8">
              <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
                📞 Phone: +880 1924753973
              </div>
              <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
                📧 Email: dsim.edu.management@gmail.com
              </div>
              <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
                📍 Address: Collage Road, Damurhuda, Chuadanga
              </div>
              <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
                🌐 Website: www.madrashaexample.com
              </div>
              <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
                🕋 Open Hours: 24/7
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Image
              src={contact1}
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[...]"
            />
            <Image
              src={contact2}
              alt="feature template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[...]"
            />
            <Image
              src={contact3}
              alt="bento template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[...]"
            />
            <Image
              src={contact4}
              alt="cards template"
              width={500}
              height={500}
              className="rounded-lg bg-white object-contain h-20 md:h-44 lg:h-60 w-full shadow-[...]"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full">
      <div className="w-full">
        <Timeline data={data} />
      </div>
    </div>
  );
}
