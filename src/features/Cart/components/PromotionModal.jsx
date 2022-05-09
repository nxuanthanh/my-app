import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import PromotionItem from './PromotionItem';

const useStyles = makeStyles((theme) => ({
  promotionSearch: {
    padding: '9px 14px',
    marginRight: '4px',
    borderRadius: '3px',
    width: '348px',
    border: '1px solid #cbcbd5',

    '&:focus': {
      outline: '1px solid rgb(11, 116, 229)',
    },
  },

  promotionDialogHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  promotionDialogTitle: {
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  promotionItem: {
    width: '100%',
    height: '100px',
    filter: 'drop-shadow(rgba(0, 0, 0, 0.15) 0px 1px 3px)',

    '& img': {
      height: '100%',
      borderRadius: '20px',
    },
  },
}));

function PromotionModal({ open, onChange, products }) {
  const classes = useStyles();

  const handleOnChange = () => {
    if (!onChange) return;

    onChange();
  };

  return (
    <Dialog open={open} onClose={handleOnChange} aria-labelledby="form-dialog-title">
      <div className={classes.dialog}>
        <div className={classes.promotionDialogHeader}>
          <DialogTitle id="form-dialog-title">Tiki Khuyến Mãi</DialogTitle>
          <IconButton onClick={handleOnChange} style={{ cursor: 'pointer', padding: '18px' }}>
            <Close />
          </IconButton>
        </div>
        <DialogContent>
          <div style={{ marginBottom: '16px' }}>
            <input
              type="search"
              className={classes.promotionSearch}
              placeholder="Nhập mã khuyến mãi"
            />
            <Button variant="contained" color="primary">
              Áp dụng
            </Button>
          </div>
          <div className={classes.promotionDialogTitle}>
            <div style={{ fontWeight: '500' }}>Mã giảm giá</div>
            <span>Áp dụng tối đa: 1</span>
          </div>
          <div className={classes.promotionList}>
            {products.map(
              (item, id) =>
                item.product.isPromotion && (
                  <li key={id}>
                    <PromotionItem item={item} />
                  </li>
                )
            )}
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
}

PromotionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  products: PropTypes.array,
};

export default PromotionModal;
