import * as React from "react";
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
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Switch from "@mui/material/Switch";
import Ask from "../Ask/Ask";
import { Link } from "react-router-dom";
const pages = ["Create", "Hackathons", "My Blogs", "My Notes", "Inbox"];
const linkToPage = ["/create", "/hackathon", "/myBlogs", "/myNotes", "/inbox"];
const notifications = ["Codeforces", "Hackathons", "Job Posting"];
const settings = ["Dashboard", "Logout"];

function NavBar({ onLogout }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorElNav_notify, setAnchorElNav_notify] = React.useState(null);
  const [anchorElUser_notify, setAnchorElUser_notify] = React.useState(null);

  const handleOpenNavMenu_notify = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav_notify(event.currentTarget);
  };
  const handleOpenUserMenu_notify = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser_notify(event.currentTarget);
  };

  const handleCloseNavMenu_notify = () => {
    setAnchorElNav_notify(null);
  };

  const handleCloseUserMenu_notify = () => {
    setAnchorElUser_notify(null);
  };

  return (
    <div style={{ width: "100vw" }}>
      <AppBar position="static" style={{ backgroundColor: "pink" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img
              src={"/images/slazysloth.png"}
              alt="slazysloth"
              style={{ height: "50px", width: "160px" }}
            />

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                paddingRight: "20px",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="black"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page, index) => (
                  <Link to={linkToPage[index]}>
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                paddingRight: "20px",
                alignItems: "center",
                justifyContent: "flex-end",
                display: { xs: "none", md: "flex" },
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    fontWeight: "bold",
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, marginRight: "2%" }}>
              <Tooltip title="Notifications">
                <IconButton onClick={handleOpenUserMenu_notify} sx={{ p: 0 }}>
                  <NotificationsActiveIcon />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                style={{ position: "absolute", zIndex: "1000" }}
                id="menu-appbar"
                anchorEl_notify={anchorElUser_notify}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser_notify)}
                onClose={handleCloseUserMenu_notify}
              >
                {notifications.map((option) => (
                  <Link to={option.toLowerCase()}>
                    <MenuItem key={option} onClick={handleCloseUserMenu_notify}>
                      <Typography textAlign="center">
                        {option} <Switch />
                      </Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Profile">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    style={{ backgroundColor: "#008080" }}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                style={{ position: "absolute" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <Link
                    to={index === 0 ? setting.toLowerCase() : "/"}
                    onClick={index === 1 ? () => onLogout() : null}
                  >
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography
                        textAlign="center"
                        style={{ color: "#008080" }}
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Ask />
    </div>
  );
}
export default NavBar;
