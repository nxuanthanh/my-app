import { Box, Container, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core';
import { addToCart } from 'features/Cart/cartSlice';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useParams } from 'react-router';
import AddToCartForm from '../components/AddToCartForm';
import ProductAdditional from '../components/ProductAdditional';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductReviews from '../components/ProductReviews';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductPage from '../hooks/useProductDetail.js';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },

  left: {
    width: '400px',
    borderRight: `1px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(1.5),
  },

  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
  },

  loading: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
  },
}));

function ProductsDetailPage(props) {
  const classes = useStyles();
  const { productId } = useParams();
  const dispatch = useDispatch();

  const { product, loading } = useProductPage(productId);

  const handleAddToCartSubmit = ({ quantity }) => {
    const action = addToCart({
      id: product.id,
      product,
      quantity: Number.parseInt(quantity),
    });

    dispatch(action);
  };

  if (loading) {
    return (
      <Box className={classes.loading}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>

            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <AddToCartForm onSubmit={handleAddToCartSubmit} />
            </Grid>
          </Grid>
        </Paper>

        <ProductMenu />
        <Routes>
          <Route index element={<ProductDescription product={product} />} />
          <Route path="additional" element={<ProductAdditional />} />
          <Route path="reviews" element={<ProductReviews />} />
        </Routes>
      </Container>
    </Box>
  );
}

ProductsDetailPage.propTypes = {
  onSubmit: PropTypes.func,
};

export default ProductsDetailPage;
