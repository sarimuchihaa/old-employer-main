import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../../../style/pageStyle/reviewStyle/ReviewDetails/Company.module.scss";
import Button from "../../../dump/Button";
import 'react-toastify/dist/ReactToastify.css';
import { DislikeIcon, LikeIcon } from "../../../icon";

const CompanyCard = ({ logo, name, yesCount, noCount }) => {

  return (
    <>
      <div className={styles["tags-card"]}>
        <div className={styles["header"]}>
          <div className={styles["company-logo"]}>
            <Image
              src={logo}
              className={styles['avatar']}
              height={80}
              width={80}
            />
          </div>
          <div className={styles["header-content"]}>
            <div className={styles["sub-header"]}>
              <p className={styles["title"]}>{name}</p>
            </div>
            <div className="header-buttons">
              <Button
                text={"Go to hall of fame"}
                classes={styles["btn-join"]}
                onClick={() => { }}
              />
              <>
                <LikeIcon />
                <strong>{yesCount}</strong>
                <DislikeIcon />
                <strong>{noCount}</strong>
              </>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default CompanyCard;
