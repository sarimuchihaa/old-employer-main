import React from 'react';

const FlagEmoji = ({ countryCode }) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt());
  return <span>{String.fromCodePoint(...codePoints)}</span>;
};

export default FlagEmoji;