import React from 'react';
import Part from './Part';
import { CoursePart } from '../index';

interface ContentProps {
  course: CoursePart[];
}

const Content: React.FC<ContentProps> = (props) => {
  return (
    <div>
      <Part parts={props.course[0]} />
      <Part parts={props.course[1]} />
      <Part parts={props.course[2]} />
      <Part parts={props.course[3]} />
    </div>
  );
};

export default Content;
