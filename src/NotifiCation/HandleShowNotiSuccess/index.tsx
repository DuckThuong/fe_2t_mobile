import React, { ReactNode } from 'react';
import { toast } from 'react-toastify';

interface NotificationSuccessProps {
  contentNoti: ReactNode | string;
}
const NotificationSuccess: React.FC<NotificationSuccessProps> = ({ contentNoti }) => {
  const handleShowNotiSuccess = (content: ReactNode | string) => {
    return toast(<div className="d-flex align-items-center gap-10">{content}</div>, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      className: 'toast__notification-success',
    });
  };

  return <div>{handleShowNotiSuccess(contentNoti)}</div>;
};

export default NotificationSuccess;
