
import Header from '@/components/header/Header';
import HomeCard from '@/components/home-card/Home_card';
import Boards from '@/components/board/Boards';
import Pricing from '@/components/pricing/Pricing';
import Features from '@/components/features/Features';
import Reviews from '@/components/review/Review';
import FAQAccordion from '@/components/Faqs/Faqs';





export default async function Home() {
    return (
        <>
            <Header />
            <HomeCard />
            <Boards/>
            <Pricing/>
            <Features/>
            <Reviews/>
            <FAQAccordion/>
        </>
    )
}
