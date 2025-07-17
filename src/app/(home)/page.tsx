
import Header from '@/components/header/Header';
import HomeCard from '@/components/home-card/Home_card';
import Boards from '@/components/board/Boards';
import Pricing from '@/components/pricing/Pricing';
import Features from '@/components/features/Features';
import Reviews from '@/components/review/Review';
import FAQAccordion from '@/components/Faqs/Faqs';
import Axios from '@/lib/Axios';





export default async function Home() {
    let reviews = [];
    try {
        const res = await Axios.get('/api/v1/review');
        reviews = res.data;
    } catch (error) {
        console.log(error)
    }

    return (
        <>
            <Header />
            <HomeCard />
            <Boards />
            <Pricing />
            <Features />
            <Reviews reviews={reviews} />
            <FAQAccordion />
        </>
    )
}
