import React from 'react';
import { AppBar, Toolbar, Typography, Badge, IconButton, Box } from '@mui/material';
import { ShoppingCart, Brightness4, Brightness7 } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { toggleTheme } from '../store/themeSlice';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const themeMode = useSelector((state: RootState) => state.theme.mode);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{ flexGrow: 1, cursor: 'pointer' }}
                    onClick={() => navigate('/')}
                >
                    EasyShop
                </Typography>
                <Box>
                    <IconButton 
                        color="inherit"
                        onClick={() => dispatch(toggleTheme())}
                        sx={{ mr: 1 }}
                    >
                        {themeMode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                    <IconButton 
                        color="inherit"
                        onClick={() => navigate('/cart')}
                    >
                        <Badge badgeContent={cartItems.length} color="error">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;