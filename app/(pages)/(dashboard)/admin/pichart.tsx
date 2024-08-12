import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const genres = [
  { value: 12, label: 'Science Fiction', color: '#FF5733' },
  { value: 8, label: 'Fantasy', color: '#33FF57' },
  { value: 10, label: 'Horror', color: '#3357FF' },
  { value: 7, label: 'Mystery', color: '#FF33A6' },
  { value: 9, label: 'Thriller', color: '#FFBF00' },

  // Additional genres if needed
];

const size = {
  width: 300,
  height: 300,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 14,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function PieChartWithCenterLabel() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
        maxWidth: 500, // Adjusted for better fit
        maxHeight:500,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        boxShadow: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <PieChart
        sx={{ width: '100%', height: 'auto' }}
        series={[{ data: genres, innerRadius: 80 }]} // Use full data array
        {...size}
      >
        <PieCenterLabel>Genres</PieCenterLabel>
      </PieChart>
      <Box
        sx={{
          marginTop: 2,
          width: '100%',
          maxWidth: 500,
          padding: 1,
        }}
      >
        {/* {genres.map((item) => (
          <Box key={item.label} display="flex" alignItems="center" mb={1}>
            <Box
              sx={{
                width: 16,
                height: 16,
                backgroundColor: item.color,
                borderRadius: '50%',
                marginRight: 1,
              }}
            />
            <Typography variant="body2">
              {item.label}: {item.value}
            </Typography>
          </Box>
        ))} */}
      </Box>
    </Box>
  );
}
