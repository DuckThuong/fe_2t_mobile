import { Rule } from "antd/lib/form";
import { _validator } from "./validator.validate";

interface Validate {
  [key: string]: Rule[];
}

export const ValidateLibrary: (_option?: any[], data?: unknown) => Validate = (
  _option?,
  data?
) => {
  if (!_option) {
    _option = [];
  }

  const email = [
    {
      validator: _validator({
        required: "Nhập dữ liệu vào đi thằng lồn",
        email: "Vui lòng nhập đúng định dạng",
      }),
    },
    ..._option,
  ];

  const password = [
    {
      validator: _validator({
        required: "Nhập dữ liệu vào đi thằng lồn",
        password: "Nhập mật khẩu đi",
      }),
    },
    ..._option,
  ];

  const required = [
    {
      validator: _validator({
        required: "Nhập dữ liệu vào đi thằng lồn",
      }),
    },
    ..._option,
  ];
  const space = [
    {
      validator: _validator({
        space: "Không được nhập khoảng trống",
        required: "Nhập dữ liệu vào đi thằng lồn",
      }),
    },
    ..._option,
  ];
  const userName = [
    {
      validator: _validator({
        space: "Không được nhập khoảng trống",
        required: "Nhập dữ liệu vào đi thằng lồn",
      }),
    },
    ..._option,
  ];

  const phone = [
    {
      validator: _validator({
        required: "Nhập dữ liệu vào đi thằng lồn",
        phone: "Nhập số điện thoại vào",
      }),
    },
    ..._option,
  ];

  const postCode = [
    {
      validator: _validator({
        postCode: "Nhập đúng mã code đi",
      }),
    },
    ..._option,
  ];

  const passport = [
    {
      validator: _validator({
        required: "Nhập dữ liệu vào đi thằng lồn",
        number: "Vui lòng nhập số",
      }),
    },
    ..._option,
  ];

  const number = [
    {
      validator: _validator({
        required: "Nhập dữ liệu vào đi thằng lồn",
        number: "Vui lòng nhập số",
      }),
    },
    ..._option,
  ];

  const cardNumber = [
    {
      validator: _validator({
        required: "Nhập dữ liệu vào đi thằng lồn",
        number: "Vui lòng nhập số",
      }),
    },
    ..._option,
  ];
  const expirationDate = [
    {
      validator: _validator(
        {
          required: "Nhập dữ liệu vào đi thằng lồn",
          expirationDate: "Vui lòng nhập ngày hết hạn",
        },
        data
      ),
    },
  ];
  const dob = [
    {
      validator: _validator(
        {
          required: "Nhập dữ liệu vào đi thằng lồn",
          dob: "Vui lòng nhập ngày sinh",
        },
        data
      ),
    },
  ];

  return {
    email,
    password,
    required,
    postCode,
    phone,
    number,
    userName,
    passport,
    cardNumber,
    dob,
    space,
    expirationDate,
  };
};
