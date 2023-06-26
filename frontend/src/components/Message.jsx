import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;

// The "variant" prop is a special React-Bootstrap prop that will be used to determine the color of the alert, in this case. It's a "special" kind of prop, like the "children" prop
