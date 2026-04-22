export function CleaningServicesMarquee() {
  const bannerText = "India's 1st Organized Chain of Cleaning Services";
  const bannerText2 = "Dry Cleaning and Laundry Services";
  const marqueeLine = `${bannerText}`;
  const marqueeLine2 = `${bannerText2}`;

  return (
    <section className="w-full bg-primary">
      <div className="relative w-full overflow-hidden px-4 py-4 sm:px-6 sm:py-5">
        <div className="relative overflow-hidden">
          <div className="section-two-marquee-track" aria-hidden="true">
            <p className="section-two-marquee-content text-[20px] font-semibold leading-[30px] text-white sm:text-[26px] sm:leading-[36px] md:text-[28px] md:leading-[38px]">
              {marqueeLine}
            </p>
            <p className="section-two-marquee-content text-[20px] font-semibold leading-[30px] text-white sm:text-[26px] sm:leading-[36px] md:text-[28px] md:leading-[38px]">
              {marqueeLine2}
            </p>
            <p className="section-two-marquee-content text-[20px] font-semibold leading-[30px] text-white sm:text-[26px] sm:leading-[36px] md:text-[28px] md:leading-[38px]">
              {marqueeLine}
            </p>
            <p className="section-two-marquee-content text-[20px] font-semibold leading-[30px] text-white sm:text-[26px] sm:leading-[36px] md:text-[28px] md:leading-[38px]">
              {marqueeLine2}
            </p>
          </div>
          <p className="sr-only">{bannerText}</p>
        </div>
      </div>
    </section>
  );
}

