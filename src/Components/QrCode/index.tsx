import React from "react";
import { QRCode } from "antd";

interface QRCodeProps {
  accountNumber: string;
  bankCode: string;
  amount: number;
  note?: string;
  size?: number;
  className?: string;
}

const VietQRGenerator: React.FC<QRCodeProps> = ({
  accountNumber,
  bankCode,
  amount = 0,
  note = "Payment",
  size = 200,
  className,
}) => {
  const paymentInfo = `VNPAYQR://payment?bankCode=${encodeURIComponent(bankCode)}&accountNumber=${encodeURIComponent(accountNumber)}&amount=${encodeURIComponent(amount.toString())}&note=${encodeURIComponent(note)}`;

  return (
    <div className={className}>
      <div style={{ marginTop: "20px" }}>
        <QRCode value={paymentInfo} size={size} />
      </div>
    </div>
  );
};

export default VietQRGenerator;
