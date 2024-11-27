import React from 'react';
import styles from '../../style/pageStyle/halloffame/CompanyTable.module.scss';
import { LikeIcon, DislikeIcon, EyeIcon } from '../../icon'; // Import the new icons

const CompanyRow = ({ company }) => {
  const { id, name, rating, goodReviews, badReviews, recommendedBy, notRecommendedBy } = company;

  const stars = '★'.repeat(Math.floor(rating));

  return (
    <tr className={styles.companyRow}>
      <td>{id}</td>
      <td>
        <div className={styles.companyInfo}>
          <img src="logo.png" alt={name} className={styles.companyLogo} />
          {name}
        </div>
      </td>
      <td>
        <div className={styles.rating}>
          <span className={styles.stars}>{stars}</span>
          <span className={styles.ratingScore}>{rating}</span>
        </div>
      </td>
      <td>
        <div className={styles.goodReviews}>
          <LikeIcon /> {goodReviews}
        </div>
      </td>
      <td>
        <div className={styles.badReviews}>
          <DislikeIcon /> {badReviews}
        </div>
      </td>
      <td>{recommendedBy}</td>
      <td>{notRecommendedBy}</td>
      <td>
        <button className={styles.viewButton}><EyeIcon/></button>
      </td>
    </tr>
  );
};

const CompanyTable = () => {
  const companies = [
    { id: '#01', name: 'Andropple lab', rating: 4.5, goodReviews: 350, badReviews: 54, recommendedBy: 150, notRecommendedBy: 30 },
    { id: '#02', name: 'Tech Solutions', rating: 4.5, goodReviews: 350, badReviews: 54, recommendedBy: 150, notRecommendedBy: 30 },
    { id: '#03', name: 'Innovatech', rating: 4.5, goodReviews: 350, badReviews: 54, recommendedBy: 150, notRecommendedBy: 30 },
    { id: '#04', name: 'DevWorks', rating: 4.5, goodReviews: 350, badReviews: 54, recommendedBy: 150, notRecommendedBy: 30 },
    { id: '#05', name: 'CodeCrafters', rating: 4.5, goodReviews: 350, badReviews: 54, recommendedBy: 150, notRecommendedBy: 30 },
    { id: '#06', name: 'SoftServe', rating: 4.5, goodReviews: 350, badReviews: 54, recommendedBy: 150, notRecommendedBy: 30 },
    { id: '#07', name: 'WebWizards', rating: 4.5, goodReviews: 350, badReviews: 54, recommendedBy: 150, notRecommendedBy: 30 },
  ];

  return (
    <div className={styles.tableContainer}>
      <table className={styles.companyTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Company</th>
            <th>Overall Rating</th>
            <th>Good reviews</th>
            <th>Bad reviews</th>
            <th>Recommended by</th>
            <th>Not Recommended by</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => (
            <CompanyRow key={index} company={company} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyTable;