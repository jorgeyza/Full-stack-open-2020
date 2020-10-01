import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

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

interface exercisePlan {
  daily_exercises: Array<number>;
  target: number;
}

app.post('/exercises', (req, res) => {
  let allNumbers;
  const args = req.body as exercisePlan;
  for (let i = 0; i < args.daily_exercises.length; i++) {
    allNumbers = true;
    allNumbers = !isNaN(Number(args.daily_exercises[i])) && allNumbers;
  }
  allNumbers = !isNaN(Number(args.target)) && allNumbers;
  if (allNumbers) {
    const dailyExercises = args.daily_exercises;
    const target = args.target;
    return res.json(calculateExercises(target, dailyExercises));
  } else {
    throw new Error('malformatted parameters');
  }
});

const PORT = 3002;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
