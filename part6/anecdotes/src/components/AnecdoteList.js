import React from 'react';
import { connect } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import { setMessage } from '../reducers/notificationReducer';

const Anecdote = ({ content, votes, handleVote }) => (
  <li>
    <div>{content}</div>
    <div>
      has {votes}
      <button onClick={handleVote}>vote</button>
    </div>
  </li>
);

const AnecdoteList = (props) => {
  props.anecdotes.sort((a1, a2) => a2.votes - a1.votes);

  const handleVote = (id, anecdote) => {
    props.addVote(id);
    props.setMessage(`you voted '${anecdote}'`, 5000);
  };

  return (
    <ul>
      {props.anecdotes.map((a) => (
        <Anecdote
          key={a.id}
          content={a.content}
          votes={a.votes}
          handleVote={() => handleVote(a.id, a.content)}
        />
      ))}
    </ul>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  if (state.filter) {
    return {
      anecdotes: state.anecdote.filter((a) =>
        a.content.toLowerCase().includes(state.filter.toLowerCase())
      ),
      filter: state.filter,
    };
  }
  return {
    anecdotes: state.anecdote,
    filter: state.filter,
  };
};

const mapDispatchToProps = {
  addVote,
  setMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
