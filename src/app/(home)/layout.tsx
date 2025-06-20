import StickyNav from "@/components/stickyNav/StickyNav";
import Footer from '@/components/footer/Footer'



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <>
      <StickyNav />
      {children}
      <Footer />
    </>
  )
}
