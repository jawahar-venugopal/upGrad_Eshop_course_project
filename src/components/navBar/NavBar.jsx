import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ShoppingCart } from "@mui/icons-material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import SearchBar from "../searchBar/SearchBar";
import useAuth from "../../hooks/useAuth";
import Logout from "../logout/Logout";

const NavBar = () => {

    const [navMenu, setNavMenu] = useState(null);
    const { AuthContext } = useAuth();
    const { loggedInUser, hasRole } = useContext(AuthContext);

    const navTabs = [
        {
            id: "1",
            label: "Home",
            url: "/home",
            visible: loggedInUser != null,
        },
        {
            id: "2",
            label: "Add Product",
            url: "/product/add",
            visible: loggedInUser != null && hasRole(["ADMIN"]),
        },
        {
            id: "3",
            label: "Login",
            url: "/login",
            visible: loggedInUser == null,
        },
        {
            id: "4",
            label: "Sign Up",
            url: "/signup",
            visible: loggedInUser == null,
        },
    ];

    const handleOpenNavMenu = (event) => {
        setNavMenu(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setNavMenu(null);
    };

    return (
        <AppBar sx={{ bgcolor: "#3f51b5", position: 'fixed' }}>
            <Container maxWidth={false}>
                <Toolbar disableGutters>
                    <ShoppingCart sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/home"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        upGrad E-Shop
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={navMenu}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(navMenu)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {navTabs.map((element) => {
                                if (element.visible) {
                                    return (
                                        <MenuItem key={"menu_item_" + element.id} onClick={handleCloseNavMenu}>
                                            <Link key={"link_" + element.id} to={element.url} style={{ textDecoration: "none" }}>
                                                <Typography textAlign="center">{element.label}</Typography>
                                            </Link>
                                        </MenuItem>
                                    );
                                }
                                return null;
                            })}
                            {
                                loggedInUser != null &&
                                <MenuItem key="5" onClick={handleCloseNavMenu}>
                                    <Logout />
                                </MenuItem>
                            }
                        </Menu>
                    </Box>

                    <ShoppingCart sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        upGrad E-Shop
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />

                    {loggedInUser != null && <SearchBar />}

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {navTabs.map((element) => {
                            if (element.visible) {
                                return (
                                    <Link key={"main_link_" + element.id} to={element.url} style={{ textDecoration: "none" }}>
                                        <Button
                                            key={"button_link_" + element.id}
                                            sx={{ my: 2, color: 'white', display: 'block', textTransform: "none" }}
                                        >
                                            <u>{element.label}</u>
                                        </Button>
                                    </Link>
                                );
                            }
                            return null;
                        })}
                        {
                            loggedInUser != null &&
                            <Logout sx={{ my: 2, ml: 2, color: 'white', display: 'block' }} />
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;