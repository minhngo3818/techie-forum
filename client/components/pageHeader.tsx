import { Box, Container } from "@mui/material";

// styling
const headerStyle = {
  display: "flex",
  justifyContent: "center",
  margin: "2rem",
  color: "green",
};

interface PageHeader {
  pageName: string;
}

const PageHeader = (props: PageHeader) => {
  const pageName = props.pageName;
  return (
    <Container>
      <Box sx={headerStyle}>
        <h1>{pageName}</h1>
      </Box>
    </Container>
  );
};

export default PageHeader;
