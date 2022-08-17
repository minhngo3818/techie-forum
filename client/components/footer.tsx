import styles from "../styles/Home.module.css";
import { Container, Box, Grid, Link } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Icon } from "@mui/material";

// Styling
const linkStyle = {
  padding: "20px",
  cursor: "pointer",
  textDecoration: "none",
  color: "white",
};

const boxStyle = {
  display: "flex",
  justifyContent: "center",
  color: "white",
};

const iconStyle = {
  margin: "10px",
};

const Footer = () => {
  return (
    <Box bgcolor="primary.main">
      <Container maxWidth="lg">
        <Box component="span" sx={boxStyle}>
          <Link sx={linkStyle}>WebDesign</Link>
          <Link sx={linkStyle}>OS</Link>
          <Link sx={linkStyle}>GameDev</Link>
          <Link sx={linkStyle}>CyberSecurity</Link>
          <Link sx={linkStyle}>Server</Link>
          <Link sx={linkStyle}>Languages</Link>
        </Box>
        <Box component="span" sx={boxStyle}>
          <GitHubIcon sx={iconStyle} />
          <LinkedInIcon sx={iconStyle} />
          <TwitterIcon sx={iconStyle} />
        </Box>
        <Box component="span" sx={boxStyle}>
          <p>&lt; &copy; Power By Django and Next.js &gt;</p>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
