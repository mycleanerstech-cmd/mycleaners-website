import Image from "next/image";

export function BecomeFranchisePartner() {
  return (
    <section className="w-full bg-white">
      <div className="container py-12 sm:py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="w-full">
            <div className="relative mx-auto aspect-4/3 w-full overflow-hidden rounded-3xl sm:aspect-16/10">
              <Image
                src="/images/fp1.jpg"
                alt="Franchise partner"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          <div className="w-full">
            <h2 className="text-[32px] leading-[1.15] font-bold text-primary sm:text-[44px]">
              Become a Franchise Partner
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-dark-muted sm:text-[16px] sm:leading-8">
              Mycleaners, established in 2020, has emerged as a leading name in the laundry and dry cleaning
              sector in India. Mycleaners, a leading player in the laundry and dry cleaning industry, offers
              franchise opportunities for entrepreneurs looking to tap into the growing demand for convenient
              garment care services. With a focus on quality, reliability, and innovation, Mycleaners provides
              franchisees with a proven business model, comprehensive training, and ongoing support to ensure
              success in this recession-resistant sector.
            </p>
          </div>
        </div>
      </div>

      <div className="container pb-12 sm:pb-16">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <p className="text-[15px] leading-7 text-dark sm:text-[16px] sm:leading-8">
              Invest in Mycleaners, a leading laundry and dry cleaning franchise with over 100 successful centers.
              With an investment range of INR 15 lakh to 30 lakh and a required area of 300 to 600 sq. ft.,
              Mycleaners offers a lucrative opportunity to enter the thriving cleaning industry. Join us to provide
              top-quality laundry services and benefit from our established brand and operational support.
            </p>

            <p className="mt-5 text-[15px] leading-7 text-dark-muted sm:text-[16px] sm:leading-8">
              <span className="font-semibold text-dark">“</span>
              Join the top laundry franchise in India with Mycleaners. Benefit from our established brand,
              comprehensive training, and ongoing support.
              <span className="font-semibold text-dark">”</span>
            </p>
          </div>

          <div className="w-full">
            <div className="relative mx-auto aspect-4/3 w-full overflow-hidden rounded-3xl sm:aspect-16/10">
              <Image
                src="/images/fp2.jpg"
                alt="Laundry franchise"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>

        <h3 className="mt-10 text-[30px] font-semibold leading-[1.15] text-dark sm:text-[44px]">
          Why Laundry is{" "}
          <span className="text-primary">Most profitable</span> franchise business in India
        </h3>

        <div className="mt-8 grid items-start gap-10 md:grid-cols-2">
          <div className="w-full">
            <div className="relative mx-auto h-auto w-full overflow-hidden rounded-2xl border border-border-light bg-white">
              <Image
                src="/images/fp3.jpg"
                alt="Franchise profitability comparison"
                width={1200}
                height={700}
                className="h-auto w-full select-none"
                priority
              />
            </div>
          </div>

          <div>
            <p className="text-[15px] leading-7 text-dark sm:text-[16px] sm:leading-8">
              The Laundry &amp; Dry Cleaning franchise company has a great opportunity to expand, with high ROI, low risk
              and no downside. That’s what makes the laundry business the best investment.
            </p>

            <p className="mt-5 text-[15px] leading-7 text-dark-muted sm:text-[16px] sm:leading-8">
              With a proven business model and a growing demand for laundry services, investing in this franchise could lead
              to significant profits in a short amount of time. the support and resources provided by the franchise company
              can help ensure the success of each new location.
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center">
          <a
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-white shadow-btn transition-colors hover:bg-primary-dark"
          >
            Contact Us for Details
          </a>
        </div>
      </div>
    </section>
  );
}

