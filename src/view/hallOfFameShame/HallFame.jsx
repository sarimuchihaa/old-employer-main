import React, { useState } from 'react';
import styles from '../../style/pageStyle/halloffame/HallFame.module.scss';

function HallFame() {
  const [isFame, setIsFame] = useState(true);

  return (
    <div className={styles.toggleContainer}>
      <div className={styles.toggle}>
        <div
          className={`${styles.toggleOption} ${isFame ? styles.active : ''}`}
          onClick={() => setIsFame(true)}
        >
          Hall of Fame
        </div>
        <div
          className={`${styles.toggleOption} ${!isFame ? styles.active : ''}`}
          onClick={() => setIsFame(false)}
        >
          Hall of Shame
        </div>
      </div>
    </div>
  );
}

export default HallFame;