import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const data = [
  { value: 5, label: 'Fiction ', color: '#FF5733' },
  { value: 10, label: 'Self center ', color: '#33FF57' },
  { value: 15, label: 'Pyschology', color: '#3357FF' },
  
];

const size = {
  width: 300,
  height: 300,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 10,
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
    <Box display="flex" flexDirection="column" alignItems="center"   >
      <PieChart sx={{paddingLeft:'60px'}} series={[{ data: data.map(({ value }) => ({ value })), innerRadius: 80 }]} {...size}>
        <PieCenterLabel>This Week</PieCenterLabel>
      </PieChart>
      <Box >
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
