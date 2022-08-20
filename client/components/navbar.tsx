import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Icon } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { forumLinks as pages } from "../data/forumLinks";

const userPages = ["Dashboard", "Profile", "Account", "Logout"];

// TODO: break downs Navigation into sub functions
const Navigation = () => {
  const [navElState, setNavElState] = useState<null | HTMLElement>(null);
  const [userElState, setUserElState] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setNavElState(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setUserElState(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setNavElState(null);
  };

  const handleCloseUserMenu = () => {
    setUserElState(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Icon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
            <Image src="/explosion.png" width="60px" height="60px"></Image>
          </Icon>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 800,
              display: { xs: "none", md: "flex" },
              textDecoration: "none",
              color: "white",
            }}
          >
            Techies Hub
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="current-user"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={navElState}
              keepMounted
              open={Boolean(navElState)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name}>
                  <Link href={`/forum${page.field}`}>
                    <Typography component="a" textAlign="center">
                      {page.name}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Icon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <Image src="/explosion.png" width="60px" height="60px"></Image>
          </Icon>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 800,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              textDecoration: "none",
              color: "white",
            }}
          >
            Techies Hub
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <Link key={page.name} href={{ pathname: `/forum/${page.field}` }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    display: "block",
                    color: "white",
                  }}
                >
                  <Typography component="a" textAlign="center">
                    {page.name}
                  </Typography>
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGow: 0 }}>
            <Tooltip title="user menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="username" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={userElState}
              open={Boolean(userElState)}
              onClose={handleCloseUserMenu}
            >
              {userPages.map((userPage) => (
                <MenuItem key={userPage} onClick={handleCloseUserMenu}>
                  <Typography component="a" textAlign="center">
                    {userPage}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
