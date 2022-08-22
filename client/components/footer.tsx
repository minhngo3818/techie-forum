import styles from "../styles/Home.module.css";
import { Container, Box, Link } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Icon } from "@mui/material";

// Styling
const footerStyle = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  flexGrow: 0,
  display: { xs: "flex", md: "flex" },
};

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
  color: "white",
};

const Footer = () => {
  return (
    <Box bgcolor="transparent" sx={footerStyle}>
      <Container maxWidth="lg">
        <Box component="span" sx={boxStyle}>
          <Link href={`/homepage`} sx={linkStyle}>
            Home
          </Link>
          <Link href={`/about`} sx={linkStyle}>
            About
          </Link>
          <Link href={`/forum`} sx={linkStyle}>
            Forum
          </Link>
        </Box>
        <Box component="span" sx={boxStyle}>
          <IconButton href="#" target="_blank">
            <GitHubIcon sx={iconStyle} />
          </IconButton>
          <IconButton href="#" target="_blank">
            <LinkedInIcon sx={iconStyle} />
          </IconButton>
          <IconButton href="#" target="_blank">
            <TwitterIcon sx={iconStyle} />
          </IconButton>
        </Box>
        <Box component="span" sx={boxStyle}>
          <p>&lt; &copy; Power By Django and Next.js &gt;</p>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
