import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useParams } from 'react-router';
import AddToCartForm from '../components/AddToCartForm';
import ProductInfo from '../components/ProductInfo';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductPage from '../hooks/useProductDetail.js';
import ProductMenu from '../components/ProductMenu';
const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '400px',
    borderRight: `1px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(1.5),
  },
  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
  },
}));

function ProductsDetailPage(props) {
  const classes = useStyles();
  const { productId } = useParams();

  const { product, loading } = useProductPage(productId);

  const handleAddToCartSubmit = (formValues) => {
    console.log('submit formValues', formValues);
  };

  if (loading) {
    return <>loading</>;
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
      </Container>
    </Box>
  );
}

ProductsDetailPage.propTypes = {
  onSubmit: PropTypes.func,
};

export default ProductsDetailPage;
