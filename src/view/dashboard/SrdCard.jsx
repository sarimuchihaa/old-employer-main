import React from 'react';
import '../../style/pageStyle/dashboard/SrdCard.scss';

const SrdCard = () => {
  return (
    <div className="srd-card">
      <h3>Update your Profile</h3>
      <div className="content">
        <h3>Get Access Millions of CV's</h3>
        <button className="update-button">Update</button>
      </div>
      <p>Defend your company!</p>
    </div>
  );
};

export default SrdCard;