import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function CardDemo() {
  return (
    <div style={{ margin: "25%" }} className=" w-60 h-32">
      <Card sx={{ maxWidth: 1000 }} variant="outlined">
        <CardContent>
          <Typography variant="h4" gutterBottom>
           this Month Statstic
          </Typography>
          <Typography variant="h6" component="div">
            Income
          </Typography>
          <div className=" w-full border-b-4 h-5 border-b-slate-700"></div>

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            ETB 34355
          </Typography>
          <Typography variant="body1">
            Card content
            <br />
            {'"describes the content"'}
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button size="small">Card Button</Button>
        </CardActions> */}
      </Card>
    </div>
  );
}