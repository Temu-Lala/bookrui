// app/(owner)/Layout.tsx

import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Sidebar from './sidebar'; // Import the Sidebar component

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <CssBaseline />
      <Sidebar /> {/* Sidebar is included here */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
        }}
      >
        <Toolbar /> {/* This is used to push the content below the AppBar */}
        {children} {/* Render the child components here */}
      </Box>
    </Box>
  );
};

export default Layout;
