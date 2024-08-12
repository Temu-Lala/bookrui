// app/(owner)/Layout.tsx

import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Sidebar from './sidebar'; // Import the Sidebar component

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box >
      <CssBaseline />
     {/* Sidebar is included here */}
      <Box
        component="main"
       
      >
        <Toolbar /> {/* This is used to push the content below the AppBar */}
        {children} {/* Render the child components here */}
      </Box>
    </Box>
  );
};

export default Layout;
