import Checkout from "./Checkout";

export const metadata = {
	title: "Checkout",
	description: `Secure checkout for your selected course. Choose your payment method and complete your purchase.`,
};

const page = () => {
	return (
		<Checkout />
	)
}

export default page