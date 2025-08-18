import Axios from "@/lib/Axios";
import Checkout from "./Checkout";

export const metadata = {
	title: "Checkout",
	description: `Secure checkout for your selected course. Choose your payment method and complete your purchase.`,
};

const page = async ({ searchParams }) => {
	let seriesData = {};
	const {
		type = '',
		id = null,
		price = 0,
	} = searchParams;

	console.log(searchParams, "search params in checkout page");

	if (type === 'series') {
		const res = await Axios.get(`/api/v1/series/${id}`);
		seriesData = res.data;
		console.log("check out", seriesData)
	}


	return (
		<Checkout seriesData={seriesData} isSeries={type == 'series' ? true : false} />
	)
}

export default page