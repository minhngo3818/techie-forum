import { Box, Container } from "@mui/material";

// styling
const containerStyle = {
  display: "block",
  margin: "3rem auto",
};

const boxStyle = {
  margin: "auto",
  maxWidth: "800px",
  width: "100%",
  padding: "20px 50px",
  color: "white",
  backgroundColor: "#373f4a",
};

// Props
const Thread = (props) => {
  return (
    <Container sx={containerStyle}>
      <Box sx={boxStyle}>
        <h1>{props.author}</h1>
        <p>Created on {props.created}</p>
        <p>{props.content}</p>
        <p>Likes: {props.likes}</p>
        <p>Forum: {props.category}</p>
        <p>Tags: {props.tag}</p>
      </Box>
    </Container>
  );
};

export default Thread;
