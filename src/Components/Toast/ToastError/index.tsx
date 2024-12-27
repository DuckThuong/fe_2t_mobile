import { FC, ReactNode, useEffect } from "react";
import { toast } from "react-toastify";

interface ToastErrorProps {
  content: ReactNode;
}

const ToastError: FC<ToastErrorProps> = ({ content }) => {
  useEffect(() => {
    toast.error(
      <div className="d-flex align-items-center gap-10">{content}</div>
    );
  }, [content]);

  return null;
};

export default ToastError;
