import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, makeStyles, Paper } from '@material-ui/core';
import { InfoOutlined, Receipt } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  promotion: {
    padding: '9px 12px',
    fontSize: '13px',
    display: 'flex',
    flexDirection: 'column',
  },

  promotionHeader: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // lineHeight: '20px',
  },

  promotionHeaderTitle: {
    color: 'rgb(36, 36, 36)',
    textTransform: 'capitalize',
    fontWeight: '500',
  },

  promotionHeaderUsage: {
    color: 'rgb(120, 120, 120)',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },

  promotionCoupon: {
    margin: '16px 0',
  },

  promotionCart: {
    display: 'flex',
    alignItems: 'center',
    color: 'rgb(11, 116, 229)',
    lineHeight: '20px',
    cursor: 'pointer',
    gap: '8px',
  },
}));

function Promotion({ onChange }) {
  const classes = useStyles();

  return (
    <Box>
      <Paper elevation={0} style={{ marginBottom: '12px' }}>
        <Grid container className={classes.promotion}>
          <div className={classes.promotionHeader}>
            <div className={classes.promotionHeaderTitle}>Tiki Khuyến mãi</div>
            <div className={classes.promotionHeaderUsage}>
              <span>Có thể chọn 2</span> <InfoOutlined style={{ fontSize: '16px' }} />
            </div>
          </div>
          <div className={classes.promotionCoupon}></div>
          <div className={classes.promotionCart} onClick={onChange}>
            <Receipt /> <span>Chọn hoặc nhập khuyến mãi khác</span>
          </div>
        </Grid>
      </Paper>
    </Box>
  );
}

Promotion.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Promotion;
