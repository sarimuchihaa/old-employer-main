import React from "react";
import "../../style/pageStyle/packages/Card.scss";
import { TickIcon } from "../../icon"; // Import TickIcon

const Card = ({
  icon,
  name,
  price,
  discount,
  period,
  description,
  features,
}) => {
  return (
    <div className="card">
      <div className="icon">{icon}</div>
      <h2>{name}</h2>
      <div className="price">
        <span className="amount">{price}</span>
        <span className="discount">{discount}</span>
      </div>
      <span>{period}</span>
      <button className="upgrade-btn">Upgrade to {name}</button>
      <h3>{description}</h3>
      <ul className="feature-list">
        {features.map((feature, index) => (
          <li key={index}>
            <TickIcon /> {feature} {/* Replace tick icon with TickIcon */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Card;