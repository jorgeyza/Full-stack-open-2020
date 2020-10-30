import React from 'react';
import { CoursePart } from '../index';

interface PartProps {
  parts: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<PartProps> = (props) => {
  switch (props.parts.name) {
    case 'Fundamentals':
      return (
        <p>
          {props.parts.name} {props.parts.exerciseCount}{' '}
          {props.parts.description}
        </p>
      );
    case 'Using props to pass data':
      return (
        <p>
          {props.parts.name} {props.parts.exerciseCount}{' '}
          {props.parts.groupProjectCount}
        </p>
      );
    case 'Deeper type usage':
      return (
        <p>
          {props.parts.name} {props.parts.exerciseCount}{' '}
          {props.parts.description} {props.parts.exerciseSubmissionLink}
        </p>
      );
    case 'Exercise 9.15':
      return (
        <p>
          {props.parts.name} {props.parts.exerciseCount}{' '}
          {props.parts.description} {props.parts.fieldNotUsedBefore}
        </p>
      );
    default:
      return assertNever(props.parts);
  }
};

export default Part;
