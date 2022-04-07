import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import QuantityField from 'components/form-controls/QuantityField';

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
