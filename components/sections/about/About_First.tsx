import Image from "next/image";

export function About_First() {
  return (
    <section className="bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-2 px-5 pt-8 pb-10 sm:px-8 sm:pt-10 md:flex-row md:items-center md:justify-center md:gap-6 lg:gap-8 lg:px-12 lg:pt-12">
        <div className="w-full md:w-[34%]">
          <h1 className="text-center text-[44px] leading-[1.05] font-normal text-[#3b2f3b] sm:text-[56px] md:text-center md:text-[64px] lg:text-[70px]">
            About us
          </h1>
        </div>

        <div className="w-full md:w-[60%]">
          <Image
            src="/images/About_First.jpg"
            alt="Mycleaners store front"
            width={1400}
            height={900}
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
