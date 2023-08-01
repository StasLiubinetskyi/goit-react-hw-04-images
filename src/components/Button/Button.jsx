import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from './Button.styled';

const Button = ({ onClick }) => {
  return <StyledButton onClick={onClick}>Load More</StyledButton>;
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
