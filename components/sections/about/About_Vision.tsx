export function About_Vision() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
        <div className="grid items-center gap-8 md:grid-cols-[1fr_1.25fr] md:gap-10">
          <div className="flex justify-center md:justify-start">
            <h2 className="text-center text-[clamp(2.8rem,13vw,4.75rem)] leading-[1.02] font-normal italic tracking-[0.01em] text-[#3a3137] md:text-left">
              Our
              <br />
              Vision...
            </h2>
          </div>

          <div className="relative mx-auto w-full max-w-[700px] py-2 sm:py-3 md:py-4">
            <div className="absolute top-6 right-0 h-[78%] w-[88%] bg-[#dceaf1] sm:top-8 md:top-10 md:w-[86%]" />

            <div className="vision-frame-glow absolute top-0 left-[4%] h-[85%] w-[90%] border-8 border-[#f58220] sm:left-[5%] sm:border-10 md:h-[83%] md:w-[86%] md:border-12" />

            <div className="vision-card-float relative ml-[7%] bg-[#d7e6ef] px-5 py-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)] sm:ml-[9%] sm:px-8 sm:py-7 md:ml-[10%] md:px-12 md:py-8">
              <span
                aria-hidden="true"
                className="absolute -top-4 -left-2 text-[54px] leading-none font-bold text-black sm:-top-5 sm:-left-3 sm:text-[62px] md:-left-4 md:text-[72px]"
              >
                &quot;
              </span>

              <p className="text-center text-[13px] leading-[1.68] font-normal italic text-[#2f343a] sm:text-[14px] sm:leading-[1.7] md:text-[16px] md:leading-[1.72]">
                Mycleaners offers the best laundry and dry-cleaning services,
                utilizing the latest industry technology. Our robust mobile app
                and website support seamless online business. With over 150+
                stores in 50+ cities across India, we aim to be the top laundry
                and dry-cleaning provider and achieve 1,000 franchises by 2027.
                Mycleaners has built a strong reputation as a reliable service
                provider, allowing franchisees to benefit from brand recognition,
                instant reputation, and customer trust.
              </p>

              <span
                aria-hidden="true"
                className="absolute -right-1 -bottom-7 text-[54px] leading-none font-bold text-black sm:-right-2 sm:-bottom-8 sm:text-[62px] md:-bottom-10 md:text-[72px]"
              >
                &quot;
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
