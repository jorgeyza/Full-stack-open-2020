import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const result = {
      height,
      weight,
      bmi: calculateBmi(Number(height), Number(weight)),
    };
    res.json(result);
  } else {
    throw new Error('Malformatted parameters');
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
