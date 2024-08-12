"use client";
import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Pichart from './pichart';
import Tables from './tables';
import Charts from './chart';
import Cards from './card';

function Dashboard() {
  return (
    // <Box
    //   sx={{
    //     width: '100%',
    //     height: 'calc(100vh - 54px)', // Adjust height to fit below the navbar (assuming navbar height is 54px)
    //     overflow: 'hidden', // Prevent scrolling
    //     boxSizing: 'border-box', // Ensure padding doesn't affect width
    //     padding: 2, // Add padding
    //     display: 'flex',
    //     justifyContent: 'space-between',
    //   }}
    // >
      <Grid container spacing={2} sx={{ width: '100%', height: '100%',flexDirection: 'column', }}>
        {/* Left side - Cards and Pichart */}
        <Grid item  sx={{ display: 'flex', flexDirection: 'column',  }}>
          <Box
            sx={{
              border: '1px solid #ccc', // Add border
              borderRadius: '8px', // Optional: add border radius
          
              height: '50%',
            }}
          >
            <Cards />
          </Box>
          <Box
            sx={{
              border: '1px solid #ccc', // Add border
              borderRadius: '8px', // Optional: add border radius
             
              height: '50%',
            }}
          >
            <Pichart />
          </Box>
        </Grid>

        {/* Right side - Tables and Charts */}
        <Grid item sx={{ display: 'flex', flexDirection: 'column', }}>
          <Box
            sx={{
              border: '1px solid #ccc', // Add border
              borderRadius: '8px', // Optional: add border radius
             
            }}
          >
            <Tables />
          </Box>
          <Box
            sx={{
              border: '1px solid #ccc', // Add border
              borderRadius: '8px', // Optional: add border radius
          
            }}
          >
            <Charts />
          </Box>
        </Grid>
      </Grid>
    
  );
}

export default Dashboard;
