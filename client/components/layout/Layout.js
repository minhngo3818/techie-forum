import Navigation from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Box } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <Box sx={{ backgroundColor: "#000", minHeight: "1200px", width: "100%" }}>
      <Navigation />
      <main>{children}</main>
    </Box>
  );
};

export default Layout;
