import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Button, Box } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { RootState } from '../store/store';
import { removeFromCart } from '../store/cartSlice';

const Cart: React.FC = () => {
    const dispatch = useDispatch();
    const { items, total } = useSelector((state: RootState) => state.cart);

    const handleRemoveItem = (id: number, selectedSize: string) => {
        dispatch(removeFromCart({ id, selectedSize }));
    };

    if (items.length === 0) {
        return (
            <Container sx={{ py: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Your cart is empty
                </Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Shopping Cart
            </Typography>
            <List>
                {items.map((item) => (
                    <ListItem key={`${item.id}-${item.selectedSize}`}>
                        <ListItemText
                            primary={item.name}
                            secondary={`Size: ${item.selectedSize} | Quantity: ${item.quantity} | $${(item.price * item.quantity).toFixed(2)}`}
                        />
                        <ListItemSecondaryAction>
                            <IconButton 
                                edge="end" 
                                onClick={() => handleRemoveItem(item.id, item.selectedSize)}
                            >
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <Box sx={{ mt: 4, textAlign: 'right' }}>
                <Typography variant="h5" gutterBottom>
                    Total: ${total.toFixed(2)}
                </Typography>
                <Button variant="contained" color="primary" size="large">
                    Proceed to Checkout
                </Button>
            </Box>
        </Container>
    );
};

export default Cart;