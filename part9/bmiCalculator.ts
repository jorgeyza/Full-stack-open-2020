export {};

interface bmiValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): bmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, mass: number): string => {
  const bmi = (mass / height / height) * 10000;
  console.log('calculateBmi -> bmi', bmi);
  switch (true) {
    case bmi < 15:
      return 'Very severely underweight';
    case bmi <= 16:
      return 'Severely underweight';
    case bmi <= 18.5:
      return 'Underweight';
    case bmi <= 25:
      return 'Normal (healthy weight)';
    case bmi <= 30:
      return 'Overweight';
    case bmi <= 35:
      return 'Obese Class I (Moderately obese)';
    case bmi <= 40:
      return 'Obese Class II (Severely obese)';
    case bmi > 40:
      return 'Obese Class III (Very severely obese)';
    default:
      break;
  }
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error) {
  console.log('Error, something bad happened, message: ', error.message);
}
