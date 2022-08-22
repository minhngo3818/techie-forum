import { Box, Container } from "@mui/material";

// styling
const containerStyle = {
  display: "block",
  margin: "3rem auto",
};

const boxStyle = {
  margin: "auto",
  maxWidth: "1000px",
  width: "100%",
  padding: "20px 50px",
  color: "white",
  backgroundColor: "#373f4a",
};

// Props
interface ThreadType {
  author: string;
  content: string;
  created: string;
  likes: number;
  category: string;
}

const Thread = (props: ThreadType) => {
  return (
    <Container sx={containerStyle}>
      <Box sx={boxStyle}>
        <h1>{props.author}</h1>
        <p>Created on {props.created}</p>
        <p>{props.content}</p>
        <p>Likes: {props.likes}</p>
        <p>Forum: {props.category}</p>
      </Box>
    </Container>
  );
};

export default Thread;
