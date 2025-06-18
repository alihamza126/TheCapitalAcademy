"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import {
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Alert,
	Snackbar,
	Dialog,
	DialogTitle,
	DialogContent,
	Chip,
	Divider,
} from "@mui/material"
import { ArrowLeftIcon, ArrowUpLeftFromSquare, CheckCircle2Icon, CheckCircleIcon, CreditCardIcon, ShoppingCartIcon, TagIcon } from "lucide-react"
import { DocumentScanner, DocumentScannerOutlined } from "@mui/icons-material"
import { CurrencyDollarIcon } from "@phosphor-icons/react/dist/ssr"
import jazzCash from "/public/assets/jazzcash.png"
import easyPaisa from "/public/assets/easypaisa.png"
import bank from "/public/assets/bank.png"
import mdImg from "/public/courses/1.png"
import numsImg from "/public/courses/2.png"
import mdNumsImg from "/public/courses/3.png"

// Mock data - replace with your actual data
const courseImages = {
	mdcat: mdImg,
	nums: numsImg,
	"mdcat+nums": mdNumsImg,
}

const paymentLogos = {
	jazzcash: jazzCash,
	easypaisa: easyPaisa,
	bank: bank,
}

const accounts = {
	jazzcash: {
		name: "Muhammad Taimoor Hafeez",
		ac: "03479598144",
		iban: "PK47JCMA2605923479598144",
	},
	easypaisa: {
		name: "Muhammad Taimoor Hafeez",
		ac: "03479598144",
		iban: "PK38TMFB0000000058917550",
	},
	bank: {
		name: "Muhammad Taimoor Hafeez",
		ac: "22010109673135",
		iban: "PK03MEZN0022010109673135",
	},
}

interface CourseData {
	cprice: number
	cdesc: string
	features: string[]
}

export default function Checkout() {
	const [activeTab, setActiveTab] = useState(0)
	const [payMethod, setPayMethod] = useState("jazzcash")
	const [imageUrl, setImageUrl] = useState("/placeholder.svg?height=400&width=300")
	const [image, setImage] = useState<File | null>(null)
	const [showAlert, setShowAlert] = useState(false)
	const [loading, setLoading] = useState(false)
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: "",
		severity: "info" as "success" | "error" | "warning" | "info",
	})
	const [cData, setCData] = useState<CourseData>({
		cprice: 5000,
		cdesc:
			"Comprehensive MCQ bank designed for medical entrance exam preparation with detailed explanations and practice tests.",
		features: ["5000+ MCQs", "Detailed Explanations", "Practice Tests", "Progress Tracking", "Mobile Access"],
	})
	const [promoPrice, setPromoPrice] = useState(0)
	const [promoCode, setPromoCode] = useState("")

	const router = useRouter()
	const searchParams = useSearchParams()
	const course = searchParams.get("course") || "mdcat"
	const ref = useRef<HTMLInputElement>(null)

	const showSnackbar = (message: string, severity: "success" | "error" | "warning" | "info") => {
		setSnackbar({ open: true, message, severity })
	}

	const handleRedeem = async () => {
		const promoCodeValue = ref.current?.value || ""
		setPromoCode(promoCodeValue)

		try {
			if (!promoCodeValue) {
				setPromoPrice(0)
				throw new Error("Please provide a promo code")
			}

			// Mock API call - replace with actual API
			const mockResponse = Math.random() > 0.5

			if (mockResponse) {
				showSnackbar("Promo code applied successfully!", "success")
				const percentage = 15 // Mock 15% discount
				const originalPrice = cData.cprice
				const totalPrice = (originalPrice * percentage) / 100
				setPromoPrice(totalPrice)
			} else {
				showSnackbar("Invalid or expired promo code", "error")
				setPromoPrice(0)
				setPromoCode("")
			}
		} catch (error) {
			showSnackbar((error as Error).message, "error")
			setPromoCode("")
		}
	}

	useEffect(() => {
		// Mock data fetch - replace with actual API call
		const fetchCourseData = async () => {
			const mockData = {
				mdcat: {
					cprice: 5000,
					cdesc:
						"Complete MDCAT MCQ bank with detailed explanations, practice tests, and comprehensive study materials designed by medical education experts.",
					features: [
						"50K+ MDCAT MCQs",
						"Detailed Explanations",
						"Mock Tests",
						"Performance Analytics",
					],
				},
				nums: {
					cprice: 4500,
					cdesc:
						"Comprehensive NUMS MCQ collection with expert-crafted questions, detailed solutions, and strategic preparation guidance.",
					features: ["4500+ NUMS MCQs", "Expert Solutions", "Topic-wise Tests", "Progress Tracking", "Study Planner"],
				},
				"mdcat+nums": {
					cprice: 8000,
					cdesc:
						"Combined MDCAT and NUMS MCQ banks offering complete preparation package with extensive question bank and advanced features.",
					features: [
						"9500+ Combined MCQs",
						"Dual Exam Prep",
						"Advanced Analytics",
						"Priority Support",
						"Lifetime Updates",
					],
				},
			}

			setCData(mockData[course as keyof typeof mockData] || mockData.mdcat)
		}

		fetchCourseData()
	}, [course])

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			if (file.type.startsWith("image/")) {
				const url = URL.createObjectURL(file)
				setImageUrl(url)
				setImage(file)
			} else {
				showSnackbar("Please upload a valid image file", "error")
			}
		}
	}

	const handlePurchase = async () => {
		setLoading(true)

		if (!image) {
			showSnackbar("Please upload payment screenshot to proceed", "warning")
			setLoading(false)
			return
		}

		try {
			// Mock API call - replace with actual implementation
			await new Promise((resolve) => setTimeout(resolve, 2000))

			showSnackbar("Order placed successfully! We'll verify your payment shortly.", "success")
			setShowAlert(true)
			setLoading(false)
		} catch (error) {
			showSnackbar("Failed to process order. Please try again.", "error")
			setLoading(false)
		}
	}

	const TabPanel = ({ children, value, index }: { children: React.ReactNode; value: number; index: number }) => (
		<div hidden={value !== index} className="w-full">
			{value === index && children}
		</div>
	)

	return (
		<div className="min-h-screen bg-surface">
			{/* Header */}
			<div className="bg-white border-b border-line">
				<div className="container mx-auto px-4 py-6">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold  bg-gradient-to-r from-primary  to-purple text-transparent bg-clip-text">
								{course.toUpperCase()} MCQ Bank
							</h1>
							<p className="text-secondary-700 mt-1">Secure Checkout Process</p>
						</div>
						<Chip
							icon={<ShoppingCartIcon className="w-4 h-4" />}
							label="1 Item"
							className="bg-[#1F305E] text-white"
						/>
					</div>
				</div>

			</div>

			<div className="container mx-auto px-4 py-8">
				<div className="max-w-7xl mx-auto">
					{/* Progress Steps */}
					<div className="mb-8">
						<div className="flex items-center justify-center space-x-8">
							<div className={`flex items-center space-x-2 ${activeTab >= 0 ? "text-primary" : "text-secondary2"}`}>
								<div
									className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab >= 0 ? "bg-primary text-white" : "bg-line text-secondary2"}`}
								>
									{activeTab > 0 ? (
										<CheckCircleIcon className="w-5 h-5" />
									) : (
										<DocumentScanner className="w-5 h-5" />
									)}
								</div>
								<span className="font-medium">Course Details</span>
							</div>
							<div className={`w-16 h-0.5 ${activeTab >= 1 ? "bg-primary" : "bg-line"}`}></div>
							<div className={`flex items-center space-x-2 ${activeTab >= 1 ? "text-primary" : "text-secondary2"}`}>
								<div
									className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab >= 1 ? "bg-primary text-white" : "bg-line text-secondary2"}`}
								>
									<CreditCardIcon className="w-5 h-5" />
								</div>
								<span className="font-medium">Payment</span>
							</div>
						</div>
					</div>

					{/* Main Content */}
					<div className="grid lg:grid-cols-12 gap-8">
						{/* Main Content Area */}
						<div className="lg:col-span-8">
							<div className="bg-white rounded-2xl shadow-card border border-line overflow-hidden">
								{/* Course Details Tab */}
								{activeTab === 0 && (
									<div className="p-8">
										<div className="flex items-center space-x-3 mb-6">
											<DocumentScannerOutlined className="w-6 h-6 text-primary" />
											<h2 className="text-2xl font-bold text-black">Course Information</h2>
										</div>

										<div className="grid md:grid-cols-2 gap-8">
											<div>
												<div className="bg-gradient-to-br from-surface to-green/20 rounded-xl  mb-6">
													<Image
														src={courseImages[course as keyof typeof courseImages] || courseImages.mdcat}
														alt={course}
														width={500}
														height={300}
														className="w-full h-48 object-fill rounded-lg"
													/>
												</div>

												<div className="space-y-4">
													<h3 className="text-lg font-semibold text-black">What's Included:</h3>
													<div className="space-y-2">
														{cData.features.map((feature, index) => (
															<div key={index} className="flex items-center space-x-3">
																<CheckCircleIcon className="w-5 h-5 text-success flex-shrink-0" />
																<span className="text-secondary">{feature}</span>
															</div>
														))}
													</div>
												</div>
											</div>

											<div>
												<h3 className="text-lg font-semibold text-black mb-4">Course Description</h3>
												<p className="text-secondary leading-relaxed mb-6">{cData.cdesc}</p>

												<div className="bg-surface rounded-xl p-6">
													<h4 className="font-semibold text-black mb-3">Key Benefits</h4>
													<ul className="space-y-2 text-sm text-secondary">
														<li>• Expert-curated question bank</li>
														<li>• Detailed explanations for every question</li>
														<li>• Regular updates and new content</li>
														<li>• Mobile-friendly platform</li>
														<li>• 24/7 customer support</li>
													</ul>
												</div>
											</div>
										</div>

										<div className="mt-8 pt-6 border-t border-line">
											<Button
												variant="contained"
												size="large"
												className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold"
												onClick={() => setActiveTab(1)}
											>
												Proceed to Payment
												<ArrowLeftIcon className="w-5 h-5 ml-2 rotate-180" />
											</Button>
										</div>
									</div>
								)}

								{/* Payment Tab */}
								{activeTab === 1 && (
									<div className="p-8">
										<div className="flex items-center space-x-3 mb-6">
											<CreditCardIcon className="w-6 h-6 text-primary" />
											<h2 className="text-2xl font-bold text-black">Payment Method</h2>
										</div>

										<div className="grid lg:grid-cols-2 gap-8">
											{/* Payment Methods */}
											<div>
												<FormControl component="fieldset" className="w-full">
													<FormLabel component="legend" className="text-lg font-semibold text-black mb-4">
														Choose Payment Option
													</FormLabel>
													<RadioGroup
														value={payMethod}
														onChange={(e) => setPayMethod(e.target.value)}
														className="space-y-3"
													>
														{Object.entries(accounts).map(([method, _]) => (
															<div
																key={method}
																className={`border-2 rounded-xl p-4 transition-all ${payMethod === method ? "border-primary bg-primary/5" : "border-line bg-white hover:border-primary/30"}`}
															>
																<FormControlLabel
																	value={method}
																	control={<Radio sx={{ color: "#1757ab", "&.Mui-checked": { color: "#1757ab" } }} />}
																	label={
																		<div className="flex items-center justify-between w-full">
																			<span className="font-medium text-black">
																				{method === "jazzcash"
																					? "JazzCash"
																					: method === "easypaisa"
																						? "EasyPaisa"
																						: "Bank Transfer"}
																			</span>
																			<Image
																				src={paymentLogos[method as keyof typeof paymentLogos] || "/placeholder.svg"}
																				alt={method}
																				width={120}
																				height={40}
																				className="h-8 w-auto ms-2"
																			/>
																		</div>
																	}
																	className="w-full m-0"
																/>
															</div>
														))}
													</RadioGroup>
												</FormControl>
											</div>

											{/* Payment Details */}
											<div>
												<div className="bg-surface rounded-xl p-6 mb-6">
													<div className="flex items-center space-x-3 mb-4">
														<Image
															src={paymentLogos[payMethod as keyof typeof paymentLogos] || "/placeholder.svg"}
															alt={payMethod}
															width={120}
															height={40}
															className="h-8 w-auto"
														/>
														<span className="text-sm text-secondary">Selected Payment Method</span>
													</div>

													<div className="space-y-3 text-sm">
														<div className="flex justify-between">
															<span className="text-secondary">Account Title:</span>
															<span className="font-medium text-black">
																{accounts[payMethod as keyof typeof accounts]?.name}
															</span>
														</div>
														<div className="flex justify-between">
															<span className="text-secondary">Account No:</span>
															<span className="font-mono font-medium text-black">
																{accounts[payMethod as keyof typeof accounts]?.ac}
															</span>
														</div>
														<div className="flex justify-between">
															<span className="text-secondary">IBAN:</span>
															<span className="font-mono font-medium text-black">
																{accounts[payMethod as keyof typeof accounts]?.iban}
															</span>
														</div>
													</div>
												</div>

												{/* Screenshot Upload */}
												<div className="border-2 border-dashed border-line rounded-xl p-6 text-center">
													<div className="mb-4">
														<Image
															src={imageUrl || "/placeholder.svg"}
															alt="Payment screenshot"
															width={300}
															height={400}
															className="w-full max-w-xs h-48 object-cover rounded-lg mx-auto border border-line"
														/>
													</div>
													<input
														type="file"
														accept="image/*"
														onChange={handleImageChange}
														className="hidden"
														id="payment-screenshot"
													/>
													<label
														htmlFor="payment-screenshot"
														className="inline-flex items-center px-6 py-3 bg-white border-2 border-primary text-primary rounded-lg cursor-pointer hover:bg-primary hover:text-white transition-all font-medium"
													>
														<ArrowUpLeftFromSquare className="w-5 h-5 mr-2" />
														Upload Payment Screenshot
													</label>
													<p className="text-xs text-secondary2 mt-2">
														Upload a clear screenshot of your payment confirmation
													</p>
												</div>
											</div>
										</div>

										<Divider className="my-8 pb-4" />

										{/* Action Buttons */}
										<div className="flex flex-col mt-4 sm:flex-row gap-4 justify-between">
											<Button
												variant="outlined"
												className="border-secondary2 text-secondary2 hover:border-black hover:text-black"
												onClick={() => setActiveTab(0)}
												startIcon={<ArrowLeftIcon className="w-5 h-5" />}
											>
												Back to Course Details
											</Button>

											<Button
												variant="contained"
												size="large"
												className="px-8 py-3 bg-success hover:bg-success/90 text-white font-semibold"
												onClick={handlePurchase}
												disabled={loading || !image}
												startIcon={loading ? null : <CurrencyDollarIcon className="w-5 h-5" />}
											>
												{loading ? "Processing Order..." : "Complete Purchase"}
											</Button>
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Order Summary Sidebar */}
						<div className="lg:col-span-4">
							<div className="bg-white rounded-2xl shadow-card border border-line p-6 sticky top-4">
								<div className="flex items-center space-x-3 mb-6">
									<ShoppingCartIcon className="w-6 h-6 text-primary" />
									<h3 className="text-xl font-bold text-black">Order Summary</h3>
								</div>

								<div className="space-y-4 mb-6">
									<div className="flex justify-between items-start">
										<div>
											<p className="font-semibold text-black">{course.toUpperCase()} MCQ Bank</p>
											<p className="text-sm text-secondary">Digital Course Access</p>
										</div>
										<span className="font-bold text-black">PKR {cData.cprice.toLocaleString()}</span>
									</div>

									{promoPrice > 0 && (
										<div className="flex justify-between items-center text-success">
											<div className="flex items-center space-x-2">
												<TagIcon className="w-4 h-4" />
												<span className="font-medium">Discount Applied</span>
											</div>
											<span className="font-bold">-PKR {promoPrice.toLocaleString()}</span>
										</div>
									)}

									<Divider />

									<div className="flex justify-between items-center">
										<span className="text-lg font-bold text-black">Total Amount</span>
										<span className="text-2xl font-bold text-primary">
											PKR {(cData.cprice - promoPrice).toLocaleString()}
										</span>
									</div>
								</div>

								{/* Promo Code Section */}
								<div className="bg-surface rounded-xl p-4 mb-6">
									<div className="flex items-center space-x-2 mb-3">
										<TagIcon className="w-5 h-5 text-primary" />
										<span className="font-medium text-black">Have a promo code?</span>
									</div>
									<div className="space-y-3">
										<input
											ref={ref}
											type="text"
											placeholder="Enter referral code"
											className="w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
										/>
										<Button
											variant="outlined"
											fullWidth
											onClick={handleRedeem}
											className="border-primary text-primary hover:bg-primary hover:text-white py-2"
										>
											Apply Code
										</Button>
									</div>
								</div>

								{/* Security Badge */}
								<div className="bg-green/10 border border-green/20 rounded-lg p-4 text-center">
									<CheckCircleIcon className="w-8 h-8 text-success mx-auto mb-2" />
									<p className="text-sm font-medium text-black">Secure Payment</p>
									<p className="text-xs text-secondary">Your payment information is protected</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Success Dialog */}
			<Dialog
				open={showAlert}
				onClose={() => setShowAlert(false)}
				PaperProps={{
					className: "rounded-2xl p-4",
				}}
			>
				<DialogTitle className="text-center pb-2">
					<CheckCircle2Icon className="w-16 h-16 text-success mx-auto mb-4" />
					<h3 className="text-2xl font-bold text-black">Order Placed Successfully!</h3>
				</DialogTitle>
				<DialogContent className="text-center pb-6">
					<p className="text-secondary mb-6">
						Thank you for your purchase. We've received your payment screenshot and will verify it within 24 hours.
					</p>
					<div className="space-y-3">
						<Button
							variant="contained"
							fullWidth
							className="bg-primary hover:bg-primary/90 text-white py-3"
							onClick={() => router.push("/dashboard/course-details")}
						>
							View Course Details
						</Button>
						<Button
							variant="outlined"
							fullWidth
							className="border-secondary2 text-secondary2 py-3"
							onClick={() => setShowAlert(false)}
						>
							Continue Shopping
						</Button>
					</div>
				</DialogContent>
			</Dialog>

			{/* Snackbar */}
			<Snackbar
				open={snackbar.open}
				autoHideDuration={4000}
				onClose={() => setSnackbar({ ...snackbar, open: false })}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert
					onClose={() => setSnackbar({ ...snackbar, open: false })}
					severity={snackbar.severity}
					variant="filled"
					className="font-medium"
				>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</div>
	)
}
