import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingCtas } from "@/components/layout/FloatingCtas";

// Complete Layout of our main

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-1">{children}</main>
      <Footer />
      <FloatingCtas />
    </>
  );
}
