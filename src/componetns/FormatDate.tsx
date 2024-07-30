import React from 'react';

interface FormatDateProps {
  date: Date;
}

const FormatDate: React.FC<FormatDateProps> = ({ date }) => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return <p>Invalid date</p>;
  }

  return (
    <p>
      {date.toLocaleString('en', { month: 'long' })} {date.getDate()}, {date.getFullYear()}
    </p>
  );
};

export default FormatDate;