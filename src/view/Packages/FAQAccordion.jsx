import React, { useState } from 'react';
import styles from '../../style/pageStyle/packages/FAQAccordion.module.scss';

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'Why is the moon sometimes out during the day?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      question: 'Why is the sky blue?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      question: 'Will we ever discover aliens?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      question: 'How much does the Earth weigh?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      question: 'How do airplanes stay up?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.faqAccordion}>
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index} className={styles.faqItem}>
          <div
            className={`${styles.faqQuestion} ${activeIndex === index ? styles.active : ''}`}
            onClick={() => toggleFAQ(index)}
          >
            <span>{faq.question}</span>
            <span className={styles.faqIcon}>{activeIndex === index ? '-' : '+'}</span>
          </div>
          {activeIndex === index && <div className={styles.faqAnswer}>{faq.answer}</div>}
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;