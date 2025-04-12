import React, { useEffect, useState } from 'react';
import { 
    Container, 
    CircularProgress, 
    Box, 
    Typography,
    Tabs,
    Tab,
    Grid,
    Paper,
    Divider
} from '@mui/material';
import ProductCard from './ProductCard';
import { Product, ApiProduct } from '../types/types';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [categories, setCategories] = useState<string[]>([]);

    const transformApiProduct = (apiProduct: ApiProduct): Product => ({
        id: apiProduct.id,
        name: apiProduct.title,
        price: apiProduct.price,
        description: apiProduct.description,
        imageUrl: apiProduct.image,
        category: apiProduct.category,
        sizes: ['S', 'M', 'L', 'XL'],
        color: 'Various',
        rating: apiProduct.rating
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data: ApiProduct[] = await response.json();
                const transformedProducts = data.map(transformApiProduct);
                setProducts(transformedProducts);
                
                // Extract unique categories
                const uniqueCategories = ['all', ...Array.from(new Set(transformedProducts.map(p => p.category)))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleCategoryChange = (_event: React.SyntheticEvent, newValue: string) => {
        setSelectedCategory(newValue);
    };

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(product => product.category === selectedCategory);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Category Tabs */}
            <Paper elevation={2} sx={{ mb: 3 }}>
                <Tabs
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ px: 2 }}
                >
                    {categories.map((category) => (
                        <Tab 
                            key={category}
                            label={category.charAt(0).toUpperCase() + category.slice(1)}
                            value={category}
                            sx={{ textTransform: 'capitalize' }}
                        />
                    ))}
                </Tabs>
            </Paper>

            {/* Products Grid */}
            <Grid container spacing={3}>
                {filteredProducts.map((product) => (
                    <Grid 
                        sx={{ width: { xs: '100%', sm: '50%', md: '33.33%', lg: '25%' } }}
                        key={product.id}
                    >
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
                <Box textAlign="center" py={8}>
                    <Typography variant="h6" color="text.secondary">
                        No products found in this category
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default ProductList;