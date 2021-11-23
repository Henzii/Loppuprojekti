/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

const FormikField = ({
  field, type, label, form, placeholder,
}) => {
  console.log(field);
  return (
    <TextField
      name={field.name}
      value={field.value}
      onChange={field.onChange}
      type={type}
      label={label}
      placeholder={placeholder}
      error={(form.errors[field.name])}
      helperText={(form.errors[field.name]) ? form.errors[field.name] : ''}
    />
  );
};

FormikField.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  form: PropTypes.shape({
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  }).isRequired,
};
FormikField.defaultProps = {
  type: 'text',
  label: null,
  placeholder: null,
};

export default FormikField;
