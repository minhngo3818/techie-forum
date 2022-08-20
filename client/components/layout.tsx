import Navigation from "./navbar";
import Footer from "./footer";
import { HTMLProps } from "react";
import { Box } from "@mui/material";

const Layout = ({ children }: HTMLProps<HTMLAllCollection>) => {
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
