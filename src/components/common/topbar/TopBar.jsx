// components/TopBar.jsx
'use client';

import { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from 'notistack';
import Axios from '@/lib/Axios';

const TopBar = () => {
  const [open, setOpen] = useState(
    typeof window !== 'undefined' &&
    sessionStorage.getItem('topCapitalAcademyTopBar') === 'false'
      ? false
      : true
  );

  const { enqueueSnackbar } = useSnackbar();
  const [topbarContent, setTopbarContent] = useState(
    'Welcome Dear Student! May Your Journey Be Filled With Joy & Success'
  );

  useEffect(() => {
    const fetchTopbar = async () => {
      try {
        const res = await Axios.get('/homepage/topbar');
        setTopbarContent(res?.data?.tcontent);
      } catch (error) {
        console.error('Fetching topbar content failed:', error);
      }
    };

    fetchTopbar();
  }, []);

  const handleClose = () => {
    sessionStorage.setItem('topCapitalAcademyTopBar', 'false');
    setOpen(false);
  };

  return (
    <>
      {open && (
        <AppBar
          position="static"
          elevation={0}
          sx={{
            background: 'linear-gradient(to right, #1757ab, #e260a2)',
            height: 44,
            justifyContent: 'center',
          }}
        >
          <Toolbar sx={{ minHeight: 44, px: 2 }}>
            <Typography variant="body2" sx={{ flexGrow: 1, color: '#fff' }}>
              <div className="marquee-container">
                <marquee className="marquee-text" scrollAmount="4">
                  {topbarContent}
                </marquee>
              </div>
            </Typography>

            <IconButton
              size="small"
              sx={{
                color: '#fff',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
              onClick={handleClose}
              aria-label="Close"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
};

export default TopBar;
