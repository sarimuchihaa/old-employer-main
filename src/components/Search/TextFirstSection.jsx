import React from 'react';
import '../../style/pageStyle/searchStyle/SectionHeader.scss';
import '../../style/pageStyle/searchStyle/RatingsCardContainer.scss'; // Import the RatingsCardContainer styles
import { HeaderIcon } from '../../icon';

const TextFirstSection = ({ title, description, icon }) => {
  return (
    <div className="section-header">
      <div className="header-content">
        <h2>{title}</h2>
        <div className="divider"></div> {/* Use the divider class */}
        <p className="description">
          {description}
        </p>
      </div>
      <div className="header-icon">
        {icon || <HeaderIcon />}
      </div>
    </div>
  );
};

export default TextFirstSection;