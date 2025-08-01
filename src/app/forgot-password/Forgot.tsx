'use client'
import React, { useState } from 'react'
import Link from 'next/link'



const ForgotPassword = () => {

    return (
        <>
            <div className="forgot-pass md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex gap-y-8 max-md:flex-col">
                        <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
                            <div className="heading4">Reset your password</div>
                            <div className="body1 mt-2">We will send you an email to reset your password</div>
                            <form className="md:mt-7 mt-4">
                                <div className="email ">
                                    <input className="border-line px-4 pt-3 pb-3 w-full rounded-lg" id="username" type="email" placeholder="Username or email address *" required />
                                </div>
                                <div className="block-button md:mt-7 mt-4">
                                    <button className="button-main">Submit</button>
                                </div>
                            </form>
                        </div>
                        <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
                            <div className="text-content">
                                <div className="heading4">New Customer</div>
                                <div className="mt-2 text-secondary">Be part of our growing family of new customers! Join us today and unlock a world of exclusive benefits, offers, and personalized experiences.</div>
                                <div className="block-button md:mt-7 mt-4">
                                    <Link href={'/register'} className="button-main">Register</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword