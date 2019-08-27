import React from 'react';
import {ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';

import {Container, Text} from './styles';

export default function Button({children, loading, size, ...rest}) {
  return (
    <Container {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <Text size={size || 18}>{children}</Text>
      )}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  loading: false,
};
