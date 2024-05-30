// ProductCard.jsx
import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

const ProductCard = ({ good }) => {
  return (
    <Box>

      <Card sx={{ maxWidth: 285, borderRadius: 3, marginTop: '20px' }}>
        <CardMedia component="img" height="260" image={good && good.media[0]} alt="" />
        <CardContent>
          <Typography gutterBottom variant="h7" component="div">
            {good && good.title.slice(0, 48) + ".."}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Аksiya
          </Typography>
          <Typography variant="body2" bgcolor="yellow">
            {Math.floor((good && good.price * 12) / 100)} so'm/oy
          </Typography>
          <div>
            <Typography variant="body2" color="text.primary">
              {good && good.price} so'm
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {good && good.price - Math.floor((good.price * good.salePercentage) / 100)} руб
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductCard;
