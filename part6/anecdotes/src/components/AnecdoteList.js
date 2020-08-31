import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';

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
  const anecdotes = useSelector((state) => state);
  anecdotes.sort((a, b) => b.votes - a.votes);
  const dispatch = useDispatch();
  return (
    <ul>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          content={anecdote.content}
          votes={anecdote.votes}
          handleVote={() => dispatch(addVote(anecdote.id))}
        />
      ))}
    </ul>
  );
};

export default AnecdoteList;
