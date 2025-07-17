"use client";
import React from 'react';
import AppBar from '@mui/material/AppBar';
import './stickynav.scss'; // Import your CSS file for additional styling
import TopBar from '../../components/common/topbar/TopBar';
import Navbar from '../../components/common/navbar/Navbar';

const StickyNav = ({ content }) => {

    return (
        <div className=' sticky top-0 z-50 w-full shadow-sm'>
            <AppBar position="static" sx={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
                backdropFilter: 'blur(10px)',
            }}
                color='white' className='border-none backdrop-blur-xl shadow-xl  bg-white '>
                <TopBar content={content} />
                <Navbar />
            </AppBar>
        </div>
    );
};

export default StickyNav;
