import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

CategorySkeletonList.propTypes = {
  length: PropTypes.number,
};

CategorySkeletonList.defaultProps = {
  length: 6,
};

function CategorySkeletonList({ length }) {
  return (
    <Box>
      <Grid container>
        {Array.from(new Array(length)).map((x, id) => (
          <Grid item key={id} xs={12}>
            <Box padding={1}>
              <Skeleton width="60%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CategorySkeletonList;
