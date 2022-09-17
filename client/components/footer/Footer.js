import { Container, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";

// Styling
const footerStyle = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  flexGrow: 0,
  display: { xs: "flex", md: "flex" },
};

const boxStyle = {
  display: "flex",
  justifyContent: "center",
  color: "black",
  margin: "10px auto",
};

const iconStyle = {
  color: "black",
};

const Footer = () => {
  return (
    <Box bgcolor="white" sx={footerStyle}>
      <Container maxWidth="lg">
        <Box sx={boxStyle}>
          <Box>Devloped by Minh Tuyen Ngo</Box>
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
          <p> &copy; Power By Django and Next.js </p>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
