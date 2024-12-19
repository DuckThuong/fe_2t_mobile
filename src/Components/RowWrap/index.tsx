import { Row } from "antd";
import { ReactNode } from "react";
import "./rowWrap.scss";
import { RowProps } from "antd/lib";

export interface IRowWrapProps {
  children: ReactNode;
  isGutter?: boolean;
  isWrap?: boolean;
  gutter?: number | [number, number];
  isAutoFillRow?: boolean;
  styleFill?: "around" | "center" | "between" | "end" | "start";
  className?: string;
  rowClassName?: string;
  isColumn?: boolean;
  rowProps?: RowProps;
}

function RowWrap(props: IRowWrapProps) {
  const {
    children,
    gutter,
    styleFill,
    isAutoFillRow,
    isGutter,
    isWrap,
    className,
    rowClassName,
    isColumn,
    rowProps,
  } = props;
  return (
    <div className={`custom__row-wrap ${className || ""}`}>
      <Row
        wrap={isWrap}
        {...rowProps}
        className={`${
          isAutoFillRow
            ? `${rowClassName ?? ""} justify-content-${styleFill ?? "between"}`
            : rowClassName ?? ""
        } ${isColumn ? "flex-column" : ""}`}
        gutter={isGutter ? gutter ?? 20 : 0}
      >
        {children}
      </Row>
    </div>
  );
}
export default RowWrap;
