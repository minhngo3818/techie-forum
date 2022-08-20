import { Box, Container } from "@mui/material";

// styling
const containerStyle = {
  display: { xs: "none", md: "flex" },
  maxWidth: "100px",
  margin: "3rem auto",
  backgroundColor: "#373f4a",
};

const boxStyle = {
  width: "100%",
  padding: "20px",
  color: "white",
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
