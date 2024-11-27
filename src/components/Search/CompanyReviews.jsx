import React, { useState } from 'react';
// import './CompanyReviews.scss';
import "../../style/pageStyle/searchStyle/CompanyReviews.scss";

const CompanyReviews = () => {
  const [companies, setCompanies] = useState([
    { id: 1, name: 'Andropple lab', rating: 4.5, country: 'Pakistan', likes: 150 },
    { id: 2, name: 'Andropple lab', rating: 4.5, country: 'Pakistan', likes: 150 },
    { id: 3, name: 'Andropple lab', rating: 4.5, country: 'Pakistan', likes: 150 },
    { id: 4, name: 'Andropple lab', rating: 4.5, country: 'Pakistan', likes: 150 },
    { id: 5, name: 'Andropple lab', rating: 4.5, country: 'Pakistan', likes: 150 },
  ]);

  const moveUp = () => {
    setCompanies(prevCompanies => {
      const newCompanies = [...prevCompanies];
      const first = newCompanies.shift();
      newCompanies.push(first);
      return newCompanies;
    });
  };

  const moveDown = () => {
    setCompanies(prevCompanies => {
      const newCompanies = [...prevCompanies];
      const last = newCompanies.pop();
      newCompanies.unshift(last);
      return newCompanies;
    });
  };

  return (
    <div className="company-reviews">
      <div className="navigation-arrows">
        <span className="arrow" onClick={moveUp}>▲</span>
      </div>
      {companies.map(company => (
        <div className="review-card" key={company.id}>
          <img src="logo.png" alt={`${company.name} logo`} className="logo" />
          <div className="info">
            <span className="company-name">{company.name}</span>
            <span className="stars">★★★★★</span>
          </div>
          <div className="ratings">
            <span className="country">{company.country}</span>
            <div className="rating-container">
              <div className="rating-score">{company.rating}</div>
              <span className="text">Overall ratings</span>
            </div>
          </div>
          <span className="likes">👍 {company.likes}</span>
        </div>
      ))}
      <div className="navigation-arrows">
        <span className="arrow" onClick={moveDown}>▼</span>
      </div>
    </div>
  );
};

export default CompanyReviews;
