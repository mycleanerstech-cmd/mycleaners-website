import Link from "next/link";
import Image from "next/image";

import type { BlogPost } from "@/types/content";
import { Badge } from "@/components/ui/Badge";

export function BlogPostSection({ post }: { post: BlogPost }) {
  const hasContent = Boolean(post.content?.trim());

  return (
    <section className="w-full bg-white">
      <div className="container py-10 sm:py-14">
        <div className="flex items-center gap-3">
          <Link
            href="/blogs"
            className="text-sm font-semibold text-primary hover:text-primary-dark sm:text-[15px]"
          >
            ← Back to Blogs
          </Link>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-2xl border border-border-light bg-surface">
              <div className="relative h-[220px] sm:h-[280px] w-full overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-5 sm:p-6">
                <h1 className="mt-4 text-[24px] font-bold leading-tight text-dark sm:text-[38px]">
                  {post.title}
                </h1>

                <p className="mt-3 text-body-md text-dark-muted">
                  By <span className="font-semibold text-dark">{post.author}</span>
                </p>

                <p className="mt-5 text-body-md sm:text-body-lg text-dark-secondary">
                  {post.excerpt}
                </p>

                {!hasContent ? (
                  <p className="mt-6 text-body-md font-semibold text-dark-muted sm:mt-7">
                    Content will be added soon.
                  </p>
                ) : (
                  <div className="mt-6 whitespace-pre-wrap text-body-md text-dark-secondary sm:mt-7 sm:text-body-lg">
                    {post.content}
                  </div>
                )}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="mt-2 rounded-2xl border border-border-light bg-surface p-4 sm:mt-0 sm:p-5">
              <h2 className="text-[16px] font-semibold text-dark">Tags</h2>
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

