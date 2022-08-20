import PageHeader from "../../components/pageHeader";
import { Box } from "@mui/material";

// Styling
const boxStyle = {
  backgroundColor: "orange",
};

const Forum = () => {
  return (
    <Box sx={boxStyle}>
      <PageHeader pageName="Forum" />;
    </Box>
  );
};

export default Forum;
