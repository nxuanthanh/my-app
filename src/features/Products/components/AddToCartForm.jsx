import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import QuantityField from 'components/form-controls/QuantityField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

function AddToCartForm({ onSubmit = null }) {
  const schema = yup.object().shape({
    quantity: yup
      .string()
      .required('Please enter quantity')
      .min(1, 'Minimun value is 1')
      .typeError('Please enter a number'),
  });

  const form = useForm({
    defaultValues: {
      quantity: 1,
    },

    resolver: yupResolver(schema),
  });

  const handleOnSubmit = async (values) => {
    if (!onSubmit) return;

    await onSubmit(values);
  };

  return (
    <form onSubmit={form.handleSubmit(handleOnSubmit)}>
      <QuantityField name="quantity" label="Quantity" form={form} />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        style={{ cursor: 'pointer', width: '252px' }}
      >
        Add to cart
      </Button>
    </form>
  );
}

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default AddToCartForm;
