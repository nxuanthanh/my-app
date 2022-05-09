import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { formatPrice } from 'utils';
import { cartItemTotalPriceSelector } from '../cartSelector';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '',
  },

  prices__list: {
    padding: '17px 20px',
  },

  prices__item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  prices__total: {
    padding: '17px 20px',
  },
}));

function CheckOut(props) {
  const classes = useStyles();
  const cartItemTotal = useSelector(cartItemTotalPriceSelector);
  console.log(cartItemTotal);

  return (
    <div className={classes.root}>
      <ul className={classes.prices__list}>
        <li className={classes.prices__item}>
          <span>Tạm tính</span>
          <span>{formatPrice(cartItemTotal)}</span>
        </li>
        <li className={classes.prices__item}>
          <span>Giảm giá</span>
          <span>{formatPrice(0)}</span>
        </li>
      </ul>
      <div className={classes.prices__total}>
        <li className={classes.prices__item}>
          <span>Tổng tiền</span>
          <span style={{ fontSize: '22px', color: 'rgb(254, 56, 52)' }}>
            {formatPrice(cartItemTotal)}
          </span>
        </li>
      </div>
    </div>
  );
}

CheckOut.propTypes = {};

export default CheckOut;
