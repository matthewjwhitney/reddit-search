import { Card, CardHeader, Typography, CardActionArea } from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ReactHlsPlayer from "react-hls-player";
import converUnixTimestampToDate from "./convertUnixTimestampToDate";
import { useNavigate } from "react-router-dom";

export default function ListingCard({ data }) {
  const ref = useRef(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

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

  const navigate = useNavigate();

  return (
    <Card ref={ref}>
      <CardActionArea onClick={() => navigate(`/${data.name}`)}>
        <CardHeader
          title={<Typography variant="h6">{data.title}</Typography>}
          subheader={
            <Typography variant="caption">
              posted by {data.author} in {data.subreddit_name_prefixed} on{" "}
              {converUnixTimestampToDate(data.created_utc)}
            </Typography>
          }
        />
        {data.is_video && (
          <ReactHlsPlayer
            src={data.media.reddit_video.hls_url.split("?")[0]}
            autoPlay={false}
            controls={true}
            width={width}
          />
        )}
        {data.url.includes("jpg") && (
          <img src={data.url} style={{ width }} alt={"listing"} />
        )}
      </CardActionArea>
    </Card>
  );
}
