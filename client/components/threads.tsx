import { Box, Container } from "@mui/material";

// styling
const containerStyle = {
  display: { sx: "flex", md: "none" },
  margin: "2rem",
  backgroundColor: "green",
  color: "black",
  border: "2px",
};

// Props
interface ThreadType {
  username: string;
  thread: string;
}

const Thread = (props: ThreadType) => {
  return (
    <Container sx={containerStyle}>
      <Box>
        <h1>{props.username}</h1>
        <p>{props.thread}</p>
      </Box>
    </Container>
  );
};

export default Thread;
