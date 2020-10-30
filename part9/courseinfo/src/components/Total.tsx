import React from 'react';
import { CoursePart } from '../index';

interface TotalProps {
  courseParts: CoursePart[];
}

const Total: React.FC<TotalProps> = (props) => {
  return (
    <div>
      <p>
        Number of exercises{' '}
        {props.courseParts[0].exerciseCount +
          props.courseParts[1].exerciseCount +
          props.courseParts[2].exerciseCount}
      </p>
    </div>
  );
};

export default Total;
