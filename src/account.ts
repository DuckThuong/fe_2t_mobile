import { useState } from "react";

export const Account = {
  admin: "TrinhThuong26022003@gmail.com",
  TuanAnh: "nguyentuananh-it@gmail.com",
  KhanhHung: "KhanhHungTran@gmail.com",
};
export const PassWord = {
  admin: "26022003",
  TuanAnh: "nguyentuananh-it",
  KhanhHung: "KhanhHungTran",
};
export const verifyCode = {
  admin: "admin1234",
  TuanAnh: "nguyentuananh-it",
  KhanhHung: "khanhhunggg",
};
export const useAccount = () => {
  const [accounts, setAccounts] = useState({ Account, PassWord });

  const updateAccount = (username: string, newEmail: string) => {
    setAccounts(prev => ({
      ...prev,
      Account: {
        ...prev.Account,
        [username]: newEmail,
      },
    }));
  };

  const updatePassword = (username: string, newPassword: string) => {
    setAccounts(prev => ({
      ...prev,
      PassWord: {
        ...prev.PassWord,
        [username]: newPassword,
      },
    }));
  };

  return { accounts, updateAccount, updatePassword };
};
