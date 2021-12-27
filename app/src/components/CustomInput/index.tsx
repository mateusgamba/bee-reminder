import React from 'react';
import { Input, InputProps } from 'reactstrap';

export default React.forwardRef<HTMLInputElement, InputProps>(function CustomInput(props, ref) {
  return <Input innerRef={ref} {...props} />;
});
