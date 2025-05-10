import React, { useState } from 'react';
import { 
    Card, 
    CardContent, 
    CardMedia, 
    Typography, 
    Button, 
    FormControl, 
    Select, 
    MenuItem, 
    SelectChangeEvent,
    Box,
    Rating,
    Chip,
    styled
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { Product } from '../types/types';
import { addToCart } from '../store/cartSlice';

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[4],
    },
}));

const ProductImageContainer = styled(Box)({
    height: 260,
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const dispatch = useDispatch();
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

    const handleSizeChange = (event: SelectChangeEvent<string>) => {
        setSelectedSize(event.target.value);
    };

    const handleAddToCart = () => {
        dispatch(addToCart({
            ...product,
            quantity: 1,
            selectedSize
        }));
    };

    return (
        <StyledCard>
            <ProductImageContainer>
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain'
                    }}
                />
            </ProductImageContainer>
            <CardContent sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                height: '100%',
                p: 2,
            }}>
                <Box sx={{ mb: 1.5 }}>
                    <Chip 
                        label={product.category}
                        size="small"
                        sx={{ 
                            textTransform: 'capitalize',
                            backgroundColor: 'primary.light',
                            color: 'white',
                            mb: 1
                        }}
                    />
                    <Typography 
                        variant="h6" 
                        component="div"
                        sx={{
                            fontSize: '1rem',
                            fontWeight: 500,
                            lineHeight: 1.2,
                            height: '2.4em',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {product.name}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Rating 
                        value={product.rating?.rate || 0}
                        precision={0.5}
                        size="small"
                        readOnly
                    />
                    <Typography variant="body2" color="text.secondary">
                        ({product.rating?.count || 0})
                    </Typography>
                </Box>

                <Typography 
                    variant="h6" 
                    color="primary" 
                    sx={{ 
                        mb: 1.5,
                        fontSize: '1.25rem',
                        fontWeight: 600
                    }}
                >
                    ${product.price.toFixed(2)}
                </Typography>

                <Box sx={{ mt: 'auto' }}>
                    <FormControl fullWidth size="small" sx={{ mb: 1.5 }}>
                        <Select
                            value={selectedSize}
                            onChange={handleSizeChange}
                        >
                            {product.sizes.map((size) => (
                                <MenuItem key={size} value={size}>
                                    {size}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleAddToCart}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            py: 1
                        }}
                    >
                        Add to Cart
                    </Button>
                </Box>
            </CardContent>
        </StyledCard>
    );
};

export default ProductCard;