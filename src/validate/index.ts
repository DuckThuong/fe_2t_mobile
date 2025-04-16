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
        required: "Không được để trống",
        email: "Sai định dạng email",
      }),
    },
    ..._option,
  ];

  const password = [
    {
      validator: _validator({
        required: "Không được để trống",
        password: "Mật khẩu cần tối thiểu 8 kí tự, có chữ hoa, chữ thường và chữ số",
      }),
    },
    ..._option,
  ];

  const required = [
    {
      validator: _validator({
        required: "Không được để trống",
      }),
    },
    ..._option,
  ];
  const space = [
    {
      validator: _validator({
        space: "Không được nhập khoảng trống",
        required: "Không được để trống",
      }),
    },
    ..._option,
  ];
  const userName = [
    {
      validator: _validator({
        space: "Không được nhập khoảng trống",
        required: "Không được để trống",
      }),
    },
    ..._option,
  ];

  const phone = [
    {
      validator: _validator({
        required: "Không được để trống",
        phone: "Số điện thoại không đúng định dạng",
      }),
    },
    ..._option,
  ];

  const postCode = [
    {
      validator: _validator({
        postCode: "Mã code không đúng",
      }),
    },
    ..._option,
  ];

  const passport = [
    {
      validator: _validator({
        required: "Không được để trống",
        number: "Vui lòng nhập số",
      }),
    },
    ..._option,
  ];

  const number = [
    {
      validator: _validator({
        required: "Không được để trống",
        number: "Vui lòng nhập số",
      }),
    },
    ..._option,
  ];

  const cardNumber = [
    {
      validator: _validator({
        required: "Không được để trống",
        number: "Vui lòng nhập số",
      }),
    },
    ..._option,
  ];
  const expirationDate = [
    {
      validator: _validator(
        {
          required: "Không được để trống",
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
          required: "Không được để trống",
          dob: "Vui lòng nhập ngày sinh",
        },
        data
      ),
    },
  ];
const confirmPassword = [
  {
    validator: _validator(
      {
        required: "Không được để trống",
        confirmPassword: "Mật khẩu xác nhận không khớp",
      },
      data // data phải chứa { password: 'giá trị password' }
      // { password: getFieldValue('password') },
    ),
  },
  // ..._option,
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
    confirmPassword,
    space,
    expirationDate,   
  };
};
