import { Box, Container } from "@mui/material";

// styling
const headerStyle = {
  display: "flex",
  justifyContent: "center",
  margin: "2rem",
  color: "#ff6c33",
};

interface PageHeaderType {
  pageName: string | any;
}

const PageHeader = (props: PageHeaderType) => {
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
