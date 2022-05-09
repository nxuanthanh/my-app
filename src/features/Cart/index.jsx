import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { cartCountSelector } from './cartSelector';
import CartProductsList from './components/CartProductsList';
import CheckOut from './components/CheckOut';
import Promotion from './components/Promotion';
import PromotionModal from './components/PromotionModal';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '16px',
  },

  left: {
    width: '910px',
  },
  right: {
    width: '310px',
  },

  title: {
    margin: '20px 0',
  },

  top: {
    display: 'grid',
    gridTemplateColumns: '398px 190px 130px 130px 30px',
    padding: '9px 12px',
    alignItems: 'center',
  },

  checkbox: {
    padding: '0 12px',
  },

  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));
function CartFeature(props) {
  const classes = useStyles();
  const productsCartList = useSelector((state) => state.cart.cartItems);
  const cartItemCount = useSelector(cartCountSelector);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Typography variant="h6" className={classes.title}>
          GIỎ HÀNG
        </Typography>
        <Grid container spacing={2}>
          <Grid item className={classes.left}>
            <Grid item xs={12} style={{ marginBottom: '12px' }}>
              <Paper elevation={0} className={classes.top}>
                <FormControlLabel
                  control={
                    <Checkbox
                      // checked={state.checkedB}
                      // onChange={handleChange}
                      name="checkedB"
                      color="primary"
                      className={classes.checkbox}
                    />
                  }
                  label={`Tất cả(${cartItemCount} sản phẩm)`}
                />
                <Typography variant="body2">Đơn giá</Typography>
                <Typography variant="body2">Số lượng</Typography>
                <Typography variant="body2">Thành tiền</Typography>
                <IconButton aria-label="delete" disabled color="primary" style={{ padding: 0 }}>
                  <Delete />
                </IconButton>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={0}>
                <CartProductsList products={productsCartList} />
              </Paper>
            </Grid>
          </Grid>

          <Grid item className={classes.right}>
            <Promotion onChange={handleClickOpen} />
            <Grid item xs={12}>
              <Paper elevation={0} className={classes.bottom}>
                <CheckOut />
              </Paper>
            </Grid>

            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                style={{ cursor: 'pointer', width: '100%', marginTop: '16px' }}
              >
                Mua hàng
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      {open && <PromotionModal open={open} onChange={handleClose} products={productsCartList} />}
    </Box>
  );
}

CartFeature.propTypes = {};

export default CartFeature;
