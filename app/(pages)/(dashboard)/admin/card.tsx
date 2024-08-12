import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function CardDemo() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 400, // Adjust the max width of the card to fit your design
          borderRadius: 2,
          boxShadow: 3,
          padding: 2,
          textAlign: 'center',
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            This Month's Statistics
          </Typography>
          <Typography variant="h6" color="text.primary">
            Income
          </Typography>
          <Box
            sx={{
              borderBottom: 2,
              borderColor: 'primary.main',
              marginBottom: 2,
            }}
          />
          <Typography variant="h4" color="text.secondary">
            ETB 34,355
          </Typography>
          <Typography variant="body2">
            Detailed statistics of this months earnings.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
