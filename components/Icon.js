import React from 'react';
import * as VectorIcons from '@expo/vector-icons';

const Icon = ({ subset, ...rest }) => {
  const IconComponent = VectorIcons[subset || 'MaterialCommunityIcons'];
  return <IconComponent {...rest} />;
};

export default Icon;
