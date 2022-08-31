import Navigation from "./Navbar";
import Footer from "./Footer";
import { Box } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <Box
      sx={{ backgroundColor: "#21262d", minHeight: "1200px", width: "100%" }}
    >
      <Navigation />
      <main>{children}</main>
      <Footer />
    </Box>
  );
};

export default Layout;
