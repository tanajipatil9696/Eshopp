import React from 'react';
import { AppBar, Toolbar, Typography, Badge, IconButton, Box } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const cartItems = useSelector((state: RootState) => state.cart.items);

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
                        onClick={() => navigate('/cart')}
                    >
                        <Badge badgeContent={cartItems.length} color="error">
                            <ShoppingCart />
                        </Badge>
                        <button>Login</button>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;