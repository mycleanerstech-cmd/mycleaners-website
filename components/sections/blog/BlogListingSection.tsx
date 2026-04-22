import Link from "next/link";
import Image from "next/image";

import type { BlogPost } from "@/types/content";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function BlogListingSection({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="w-full bg-white">
      <div className="container py-10 sm:py-14">
        <div className="mb-8">
          <SectionHeader
            title="Laundry & Dry Cleaning"
            subtitle="Find everything from laundry tips and dry cleaning guides to exploring profitable laundry franchise opportunities, all here at MyCleaners."
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              className="group overflow-hidden rounded-2xl border border-border-light bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_0_0_1px_rgba(245,130,32,0.12),0_10px_30px_rgba(245,130,32,0.18)]"
              href={`/blogs/${post.slug}`}
            >
              <div className="relative h-[160px] sm:h-[180px] md:h-[200px] w-full overflow-hidden bg-surface">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="mt-1 block text-[17px] sm:text-[18px] font-semibold leading-tight text-dark transition-colors group-hover:text-primary">
                  {post.title}
                </h3>

                <div className="mt-4">
                  <span className="inline-flex h-8 w-full items-center justify-center rounded-btn bg-primary px-4 text-sm font-semibold text-white shadow-btn transition-all duration-200 hover:bg-primary-dark hover:shadow-btn sm:h-9 sm:w-auto">
                    Read More
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

