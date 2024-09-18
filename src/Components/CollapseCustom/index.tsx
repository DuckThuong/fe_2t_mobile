import { Collapse } from 'antd';
import './collapseCustom.scss';
import { CollapseProps } from 'antd/es/collapse/Collapse';
import { SvgSelectHaft } from '../@svg/SvgSelectHaft';
import * as React from 'react';

export interface IRowWrapProps {
  collapseProps?: CollapseProps;
  iconCollapse?: React.ReactNode;
  isRemoveRotate?: boolean;
}

function CollapseCustom(props: IRowWrapProps) {
  const { collapseProps, iconCollapse, isRemoveRotate } = props;
  return (
    <Collapse
      {...collapseProps}
      className={`collapse-custom__container ${isRemoveRotate ? 'collapse-custom__remove-rotate' : ''} ${collapseProps?.className ?? ''}`}
      expandIcon={() => iconCollapse ?? <SvgSelectHaft />}
      expandIconPosition={'end'}
    />
  );
}

export default CollapseCustom;
