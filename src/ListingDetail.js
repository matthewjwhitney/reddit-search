import {
  Box,
  Card,
  CardHeader,
  CircularProgress,
  Typography
} from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ReactHlsPlayer from "react-hls-player";
import { useLocation } from "react-router-dom";
import converUnixTimestampToDate from "./convertUnixTimestampToDate";

export default function ListingDetail() {
  const ref = useRef(null);
  const [listingDetail, setListingDetail] = useState();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const { pathname } = useLocation();

  console.log(listingDetail);

  useEffect(() => {
    fetch(`https://api.reddit.com/api/info/?id=${pathname.replace("/", "")}`)
      .then((response) => response.json())
      .then((data) => setListingDetail(data.data.children[0].data));
  }, [pathname]);

  useLayoutEffect(() => {
    setWidth(ref.current.clientWidth);
    setHeight(ref.current.clientHeight);
  }, []);

  useEffect(() => {
    function handleWindowResize() {
      setWidth(ref.current.clientWidth);
      setHeight(ref.current.clientHeight);
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  if (!listingDetail) {
    return (
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Card sx={{ m: 2 }} ref={ref}>
      <CardHeader
        // avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //     R
        //   </Avatar>
        // }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={listingDetail.title}
        subheader={
          <Typography variant="caption">
            posted by {listingDetail.author} in{" "}
            {listingDetail.subreddit_name_prefixed} on{" "}
            {converUnixTimestampToDate(listingDetail.created_utc)}
          </Typography>
        }
      />
      {listingDetail.is_video && (
        <ReactHlsPlayer
          src={listingDetail.media.reddit_video.hls_url.split("?")[0]}
          autoPlay={false}
          controls={true}
          width={width}
        />
      )}
      {listingDetail.url.includes("jpg") && (
        <img src={listingDetail.url} style={{ width }} alt={"listing"} />
      )}
    </Card>
  );
}
