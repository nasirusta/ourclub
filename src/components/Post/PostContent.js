import { CardContent, CardMedia } from "@mui/material";
import ReadMoreReact from "read-more-react";

const PostContent = ({ content, media }) => {
  return (
    <div className="postBody">
      {media && <CardMedia component="img" height="194" image={media} />}
      {content && (
        <CardContent
          sx={{
            paddingTop: 1,
            paddingBottom: 1,
            marginBottom: 0,
            "&:last-child": {
              paddingBottom: 1,
            },
          }}
        >
          <div className="block text-sm text-gray-600">
            <ReadMoreReact
              text={content}
              min={180}
              ideal={300}
              max={400}
              readMoreText={"Devamını oku..."}
              className="read-more-button"
            />
          </div>
        </CardContent>
      )}
    </div>
  );
};

export default PostContent;
