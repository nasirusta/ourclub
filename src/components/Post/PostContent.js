import { Typography, CardContent, CardMedia } from "@mui/material";
import ReadMoreReact from "read-more-react";

const PostContent = ({ content, media }) => {
  return (
    <div className="postBody">
      {media && <CardMedia component="img" height="194" image={media} />}
      {content && (
        <CardContent>
          <Typography component={"span"} variant="body1" color="text.secondary">
            <ReadMoreReact
              text={content}
              min={180}
              ideal={300}
              max={400}
              readMoreText={"Devamını oku..."}
              className="read-more-button"
            />
          </Typography>
        </CardContent>
      )}
    </div>
  );
};

export default PostContent;
