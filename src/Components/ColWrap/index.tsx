import { Col } from 'antd';
import { ColProps } from 'antd/lib';
import { ReactNode, Ref } from 'react';
import './colWrap.scss';

export interface IRowWrapProps {
  children: ReactNode;
  colProps?: ColProps;
  isFitContent?: boolean;
  isScrollCol?: boolean;
  className?: string;
  colRef?: Ref<HTMLDivElement> | null;
}

function ColWrap(props: IRowWrapProps) {
  const { children, colProps, isFitContent, isScrollCol, className, colRef } = props;
  return (
    <Col
      {...colProps}
      className={`${colProps?.className ?? ''} ${isFitContent ? 'custom__col-wrap-fit-content' : ''} ${
        isScrollCol ? 'custom__col-wrap-scroll' : ''
      }${className ? ' ' + className : ''}`}
      ref={colRef}
    >
      {children}
    </Col>
  );
}
export default ColWrap;
