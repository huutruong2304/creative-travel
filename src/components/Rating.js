import { StarFilled } from '@ant-design/icons';
import React from 'react';

function Rating({ rate }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div>
      {stars.map((val) => (
        <StarFilled key={val} style={{ color: val <= rate ? '#F9E400' : 'white' }} />
      ))}
    </div>
  );
}

export default Rating;
