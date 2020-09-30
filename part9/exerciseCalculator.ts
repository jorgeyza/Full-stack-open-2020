interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface exerciseValues {
  value1: number;
  value2: Array<number>;
}

const parseArguments = (args: Array<string>): exerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  let allNumbers;
  const dailyExercisesArray = [];
  for (let i = 3; i < args.length; i++) {
    allNumbers = true;
    allNumbers = !isNaN(Number(args[i])) && allNumbers;
    dailyExercisesArray.push(Number(args[i]));
  }

  if (allNumbers) {
    return {
      value1: Number(args[2]),
      value2: dailyExercisesArray,
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateExercises = (
  target: number,
  dailyExercises: Array<number>
): Result => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter((day) => day !== 0).length;
  const average =
    dailyExercises.reduce((total, currentValue) => total + currentValue, 0) /
    periodLength;
  const success = average >= target;
  let rating;
  let ratingDescription;
  switch (true) {
    case success:
      rating = 3;
      break;
    case !success && average / target > 0.75:
      rating = 2;
      break;
    default:
      rating = 1;
      break;
  }

  switch (rating) {
    case 1:
      ratingDescription = 'You need to train harder';
      break;
    case 2:
      ratingDescription = 'Not too bad, but could be better';
      break;
    case 3:
      ratingDescription = 'You did great, keep on';
      break;
    default:
      ratingDescription = 'Something went wrong';
      break;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateExercises(value1, value2));
} catch (e) {
  console.log('Error, something bad happened, message: ', (e as Error).message);
}
