import React from 'react';
import '../../style/pageStyle/searchStyle/RatingsCardContainer.scss';

const HeaderWithDivider = () => {
  return (
    <div className="header-with-divider">
      <h2>Top Rated Companies</h2>
      <div className="divider"></div>
    </div>
  );
};

const RatingsCard = ({ logoSrc, companyName, country, stars, rating, overallText }) => {
  return (
    <div className="ratings-card">
      <img src={logoSrc} alt={`${companyName} logo`} className="logo" />
      <div className="card-details">
        <div className="info">
          <span className="company-name">{companyName}</span>
          <span className="country">{country}</span>
        </div>
        <div className="ratings">
          <span className="stars">{stars}</span>
          <span className="rating">{rating}</span>
          <span className="overall">{overallText}</span>
        </div>
      </div>
    </div>
  );
};

const RatingsCardContainer = () => {
  const cardsData = [
    {
      logoSrc: "logo1.png",
      companyName: "Andropple lab",
      country: "Pakistan",
      stars: "★★★★★",
      rating: "4.5",
      overallText: "Overall ratings"
    },
    {
      logoSrc: "logo2.png",
      companyName: "Tech Corp",
      country: "USA",
      stars: "★★★★☆",
      rating: "4.0",
      overallText: "Overall ratings"
    }
  ];

  return (
    <div>
      <HeaderWithDivider />
      <div className="ratings-container">
        {cardsData.map((card, index) => (
          <RatingsCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default RatingsCardContainer;
