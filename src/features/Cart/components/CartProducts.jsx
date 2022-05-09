import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Grid,
  IconButton,
  makeStyles,
  OutlinedInput,
  Typography,
} from '@material-ui/core';
import { AddCircleOutline, Delete, RemoveCircleOutline } from '@material-ui/icons';
import img from 'assets/images/promotion.png';
import { STATIC_HOST } from 'constants';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { formatPrice } from 'utils';
import * as yup from 'yup';
import { removeFromCart } from '../cartSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '18px 12px',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: '398px 190px 130px 130px 30px',
    alignItems: 'center',
    height: 'content',
  },

  productImage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '10px',
    height: '70px',
  },

  imgbox: {
    width: '100%',
    height: '100%',

    '& img': {
      width: '100%',
      height: '100%',
    },
  },

  imgboxInfo: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  priceBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  originalPrice: {
    textDecoration: 'line-through',
    marginLeft: '14px',
    color: 'rgb(124, 124, 124)',
    fontSize: '12px',
  },

  box: {
    width: '70%',
    '& button': {
      minWidth: '24px',
      // width: '2px',
      padding: '0',
    },

    '& input': {
      '&::webkitOuterSpinButton': {
        wetkitAppearance: 'none',
        margin: '0',
      },

      '&::webkitInnerSpinButton': {
        wetkitAppearance: 'none',
        margin: '0',
      },
    },
  },

  block: {
    height: '24px',
    backgroundColor: '#f2f0fe',
    borderRadius: '4px',
    padding: '0 5px',
    color: 'rgb(64, 45, 161)',
    fontSize: '14px',
    fontWeight: '500',
    width: '156px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
  },

  checkbox: {
    padding: '0 12px',
  },

  productDesTitle: {
    fontSize: '13px',
    lineHeight: '18px',
    height: '16px',
    overflow: 'hidden',
    display: 'block',
    display: '-webkit-box',
    webkitBoxOrient: 'vertical',
    WebkitLineClamp: '2',
  },

  realPrice: {
    color: '#ff424e',
  },

  outlinedInput: {
    '& input': {
      padding: '5.5px 10px',
    },
  },
}));

function CartProducts({ item }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { product, quantity } = item;
  const { name, shortDescription, salePrice, originalPrice, promotionPercent, thumbnail } = product;

  const thumbnailUrl = thumbnail ? `${STATIC_HOST}${thumbnail.formats.thumbnail.url}` : `${img}`;

  const handleOnDeleteClick = (id) => {
    const action = removeFromCart(id);
    dispatch(action);
  };

  const schema = yup.object().shape({
    quantity: yup
      .string()
      .required('Please enter quantity')
      .min(1, 'Minimun value is 1')
      .typeError('Please enter a number'),
  });
  console.log(quantity);

  const form = useForm({
    defaultValues: {
      quantity: quantity,
    },
    resolver: yupResolver(schema),
  });

  const { errors, setValue } = form;

  const handleOnSubmit = async (values) => {
    console.log('hihi');
  };

  return (
    <Box className={classes.root}>
      <Grid container className={classes.grid}>
        <Grid item>
          <Box className={classes.productImage}>
            <Checkbox style={{ padding: '0' }} color="primary" />
            <Box className={classes.imgbox}>
              <img src={thumbnailUrl} alt="" />
            </Box>
            <Box className={classes.imgboxInfo}>
              <Typography variant="body2" className={classes.productDesTitle}>
                {shortDescription}
              </Typography>
              <div className={classes.block}>
                <span>⛩️</span>
                <span>Thưởng 109,64 ASA</span>
              </div>
            </Box>
          </Box>
        </Grid>
        <Grid item className={classes.priceBox}>
          <Typography variant="subtitle2">{formatPrice(salePrice)}</Typography>
          {promotionPercent > 0 && (
            <>
              <Box component="span" className={classes.originalPrice}>
                {formatPrice(originalPrice)}
              </Box>
            </>
          )}
        </Grid>
        <Grid item>
          <form onSubmit={form.handleSubmit(handleOnSubmit)}>
            <Controller
              style={{ width: '80%', height: '30px' }}
              name={name}
              control={form.control}
              render={({ onChange, onBlur, value, name }) => (
                <ButtonGroup
                  color="primary"
                  style={{ height: '30px', padding: '0' }}
                  className={classes.box}
                >
                  <Button
                    onClick={() =>
                      setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1)
                    }
                  >
                    -
                  </Button>
                  <OutlinedInput
                    id={name}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    type="number"
                    className={classes.outlinedInput}
                  />
                  <Button
                    onClick={() =>
                      setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)
                    }
                  >
                    +
                  </Button>
                </ButtonGroup>
              )}
            />
          </form>
        </Grid>
        <Grid item className={classes.realPrice}>
          {formatPrice(salePrice * item.quantity)}
        </Grid>
        <Grid item>
          <IconButton
            aria-label="delete"
            style={{ padding: 0 }}
            onClick={() => handleOnDeleteClick(item.id)}
          >
            <Delete />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}

CartProducts.propTypes = {};

export default CartProducts;
