import { FC, ReactNode, useEffect } from "react";
import { toast } from "react-toastify";

interface ToastSuccessProps {
  content: ReactNode;
}

const ToastSuccess: FC<ToastSuccessProps> = ({ content }) => {
  useEffect(() => {
    toast.success(
      <div className="d-flex align-items-center gap-10">{content}</div>
    );
  }, [content]);

  return null;
};

export default ToastSuccess;
