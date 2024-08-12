import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const data = [
  { value: 5, label: 'Fiction', color: '#FF5733' },
  { value: 10, label: 'Self Center', color: '#33FF57' },
  { value: 15, label: 'Psychology', color: '#3357FF' },
];

const size = {
  width: 300,
  height: 300,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 14, // Adjust font size as needed
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
        maxWidth: 400, // Ensure the chart doesn't get too large
        maxHeight: 400,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        boxShadow: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <PieChart
        sx={{ width: '100%', height: 'auto' }}
        series={[{ data: data.map(({ value }) => ({ value })), innerRadius: 80 }]}
        {...size}
      >
        <PieCenterLabel>This Week</PieCenterLabel>
      </PieChart>
      <Box
        sx={{
          marginTop: 2,
          width: '100%',
          maxWidth: 400,
          padding: 1,
        }}
      >
        {data.map((item) => (
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
        ))}
      </Box>
    </Box>
  );
}
