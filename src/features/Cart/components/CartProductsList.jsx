import { Box, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import CartProducts from './CartProducts';
import PromotionItem from './PromotionItem';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function CartProductsList({ products }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {products.map((item, id) => (
        <CartProducts item={item} key={id} />
      ))}
    </Box>
  );
}

CartProductsList.propTypes = {
  products: PropTypes.array,
};

export default CartProductsList;
