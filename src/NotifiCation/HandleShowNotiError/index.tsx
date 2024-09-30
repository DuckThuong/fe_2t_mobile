import React, { ReactNode } from 'react';
import { toast } from 'react-toastify';

interface NotificationErrorProps {
  contentNoti: ReactNode | string;
}
const NotificationError: React.FC<NotificationErrorProps> = ({ contentNoti }) => {
  const handleShowNotiError = (content: ReactNode | string) => {
    return toast(<div className="d-flex align-items-center gap-10">{content}</div>, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      className: 'toast__notification-error',
    });
  };

  return <div>{handleShowNotiError(contentNoti)}</div>;
};

export default NotificationError;
