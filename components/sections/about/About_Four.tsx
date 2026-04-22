import {
  BadgeCheck,
  BriefcaseBusiness,
  HandCoins,
  Leaf,
} from "lucide-react";

const WORK_ITEMS = [
  {
    title: "Experienced Professionals",
    description:
      "Our skilled team has years of experience in dry cleaning and laundry services, ensuring your garments receive the best care possible.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Eco-Friendly Solutions",
    description:
      "We use environmentally friendly cleaning products and methods to protect your clothes and the planet.",
    icon: Leaf,
  },
  {
    title: "Convenient Services",
    description:
      "From easy online booking to reliable pickup and delivery, we make it simple to keep your wardrobe in top condition.",
    icon: HandCoins,
  },
  {
    title: "Satisfaction Guarantee",
    description:
      "We are committed to your satisfaction. If you're not completely happy with our service, we'll make it right.",
    icon: BadgeCheck,
  },
];

export function About_Four() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
        <h2 className="text-[30px] leading-[1.15] font-normal tracking-[0.01em] text-[#2a2a2a] sm:text-[38px] lg:text-[44px]">
          How Mycleaners Work?
        </h2>

        <div className="mt-7 grid gap-4 sm:mt-8 sm:gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
          {WORK_ITEMS.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="h-full rounded-[18px] bg-[#f7f7f7] px-5 py-7 text-center sm:px-6 sm:py-8"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center text-[#f58220] sm:h-14 sm:w-14">
                <Icon
                  className="h-8 w-8 stroke-[1.6] sm:h-9 sm:w-9 lg:h-10 lg:w-10"
                  aria-hidden="true"
                />
              </div>

              <h3 className="mt-4 text-[20px] leading-tight font-bold text-[#f58220] sm:text-[22px] lg:text-[24px]">
                {title}
              </h3>

              <p className="mx-auto mt-3 max-w-[300px] text-[15px] leading-[1.65] text-[#6b6b6b] sm:mt-4 sm:text-[16px] lg:text-[17px]">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
