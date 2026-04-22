import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 gap-6">
      <div className="text-[6rem] font-bold text-primary leading-none">404</div>
      <div className="flex flex-col gap-2">
        <h1 className="text-heading-lg text-dark font-bold">Page Not Found</h1>
        <p className="text-body-md text-dark-muted max-w-sm">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
      <Button variant="primary" asChild>
        <Link href="/">Go Back Home</Link>
      </Button>
    </div>
  );
}
