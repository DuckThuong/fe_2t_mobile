
export const users = [
  {
    username: "admin",
    email: "admin@gmail.com",
    password: "1234",
    verifyCode: "11111111"
  },
  {
    username: "TuanAnh",
    email: "nguyentuananh-it@gmail.com",
    password: "nguyentuananh-it",
    verifyCode: "22222222"
  },
  {
    username: "KhanhHung",
    email: "KhanhHungTran@gmail.com",
    password: "KhanhHungTran",
    verifyCode: "33333333"
  },
];

export const getAccount = (username: string) => {
  return users.find(user => user.username === username);
};

export const updatePassword = (username: string, newPassword: string) => {
  const user = getAccount(username);
  if (user) {
    user.password = newPassword;
  }
};

