import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasePlusDesc extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartBasePlusDesc {
  name: 'Fundamentals';
}

interface CoursePartTwo extends CoursePartBase {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBasePlusDesc {
  name: 'Deeper type usage';
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBasePlusDesc {
  name: 'Exercise 9.15';
  fieldNotUsedBefore: string;
}

export type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;

ReactDOM.render(<App />, document.getElementById('root'));
