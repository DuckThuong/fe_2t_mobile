import React from 'react';
import './InfoSection.scss';

type InfoItem = {
  label: string;
  value: React.ReactNode;
};

type InfoSectionProps = {
  title?: string;
  items: InfoItem[];
  columns?: number;
};

const InfoSection: React.FC<InfoSectionProps> = ({ title, items, columns = 2 }) => {
  return (
    <div className="info-section">
      {title && <h3 className="section-title">{title}</h3>}
      <div className={`info-grid columns-${columns}`}>
        {items.map((item, index) => (
          <div className="info-item" key={index}>
            <span className="label">{item.label}</span>
            <span className="value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoSection;
