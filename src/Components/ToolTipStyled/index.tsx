import './toolTipStyled.scss';
import { Tooltip } from 'antd';
import React from 'react';

interface IProps {
  icon: React.ReactNode;
  content: React.ReactNode;
}

const ToolTipStyled = (props: IProps) => {
  const { icon, content } = props;
  return (
    <Tooltip title={content} className="tool-tip-styled__container" overlayClassName={'tool-tip-styled__popup'}>
      <div>{icon}</div>
    </Tooltip>
  );
};

export default ToolTipStyled;
