import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
export const dynamic = "force-dynamic";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className="mt-16">{children}</div>
      <Footer />
    </div>
  );
}
