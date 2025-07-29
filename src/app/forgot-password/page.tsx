import ForgotPassword from "./Forgot";

export const metadata = {
    title: "Forgot Password",
    description: `Reset your password securely. Enter your email address to receive a link for resetting your password.`,
};




const page = () => {
    return (
        <ForgotPassword />
    )
}

export default page