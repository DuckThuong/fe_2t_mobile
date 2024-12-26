import { FC, ReactNode } from 'react';
import { toast } from 'react-toastify';

interface ToastSuccessProps {
  content: ReactNode;
}

const ToastSuccess: FC<ToastSuccessProps> = (props) => {
  const { content } = props;

  return toast.success(<div className="d-flex align-items-center gap-10">{content}</div>);
};

export default ToastSuccess;
