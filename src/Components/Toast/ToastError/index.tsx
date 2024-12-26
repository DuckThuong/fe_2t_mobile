import { FC, ReactNode } from 'react';
import { toast } from 'react-toastify';

interface ToastErrorProps {
  content: ReactNode;
}

const ToastError: FC<ToastErrorProps> = (props) => {
  const { content } = props;

  return toast.error(<div className="d-flex align-items-center gap-10">{content}</div>);
};

export default ToastError;
