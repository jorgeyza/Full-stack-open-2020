import React from "react";

const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Total = ({ course }) => {
  const total = course.parts.reduce((sum, part) => (sum += part.exercises), 0);
  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  const parts = course.parts.map((part) => {
    return <Part key={part.id} part={part} />;
  });
  return <div>{parts}</div>;
};

const Course = (props) => {
  return (
    <div>
      <Header course={props.course} />
      <Content course={props.course} />
      <Total course={props.course} />
    </div>
  );
};

export { Course as default };
