import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdote }) => {
    if (filter) {
      return anecdote.filter((a) =>
        a.content.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return anecdote;
  });
  anecdotes.sort((a1, a2) => a2.votes - a1.votes);
  const dispatch = useDispatch();

  const handleVote = (id, anecdote) => {
    dispatch(addVote(id));
    dispatch(setMessage(`you voted '${anecdote}'`, 5000));
  };

  return (
    <ul>
      {anecdotes.map((a) => (
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

export default AnecdoteList;
