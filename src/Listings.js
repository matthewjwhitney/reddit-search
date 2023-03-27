import Context from "./Context";
import ListingCard from "./ListingCard";
import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";
import { useContext } from "react";

export default function Listings() {
  const { listings } = useContext(Context);
  return (
    <Box sx={{ ml: 2, mt: 2 }}>
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={2}>
        {listings.map((listing) => (
          <ListingCard key={listing.data.id} data={listing.data} />
        ))}
      </Masonry>
    </Box>
  );
}
