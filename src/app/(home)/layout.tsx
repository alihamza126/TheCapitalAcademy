import StickyNav from "@/components/stickyNav/StickyNav";
import Footer from '@/components/footer/Footer'
import Axios from "@/lib/Axios";



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  let content = '';
  try {
    const res = await Axios.get('/api/v1/common/topbar');
    content = res?.data?.tcontent;
  } catch (error) {
    console.log(error)
  }


  return (
    <>
      <StickyNav content={content} />
      {children}
      <Footer />
    </>
  )
}
