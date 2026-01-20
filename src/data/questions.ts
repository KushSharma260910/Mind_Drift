export type Difficulty = 'easy' | 'medium' | 'hard';
export type AgeGroup = 'young' | 'adult';

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: Difficulty;
  category: string;
}

// Easy questions (Age 10-15)
const easyQuestions: Question[] = [
  { id: 'e1', question: 'What planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], correctAnswer: 1, difficulty: 'easy', category: 'Science' },
  { id: 'e2', question: 'How many continents are there on Earth?', options: ['5', '6', '7', '8'], correctAnswer: 2, difficulty: 'easy', category: 'Geography' },
  { id: 'e3', question: 'What is the largest mammal in the world?', options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'], correctAnswer: 1, difficulty: 'easy', category: 'Animals' },
  { id: 'e4', question: 'How many days are in a leap year?', options: ['364', '365', '366', '367'], correctAnswer: 2, difficulty: 'easy', category: 'General' },
  { id: 'e5', question: 'What is the chemical symbol for water?', options: ['O2', 'CO2', 'H2O', 'NaCl'], correctAnswer: 2, difficulty: 'easy', category: 'Science' },
  { id: 'e6', question: 'Which country is famous for the Eiffel Tower?', options: ['Italy', 'Germany', 'France', 'Spain'], correctAnswer: 2, difficulty: 'easy', category: 'Geography' },
  { id: 'e7', question: 'What is 15 × 8?', options: ['100', '120', '130', '140'], correctAnswer: 1, difficulty: 'easy', category: 'Math' },
  { id: 'e8', question: 'Which animal is known as the "King of the Jungle"?', options: ['Tiger', 'Elephant', 'Lion', 'Bear'], correctAnswer: 2, difficulty: 'easy', category: 'Animals' },
  { id: 'e9', question: 'What is the capital of Japan?', options: ['Beijing', 'Seoul', 'Tokyo', 'Bangkok'], correctAnswer: 2, difficulty: 'easy', category: 'Geography' },
  { id: 'e10', question: 'How many colors are in a rainbow?', options: ['5', '6', '7', '8'], correctAnswer: 2, difficulty: 'easy', category: 'Science' },
  { id: 'e11', question: 'What is the largest ocean on Earth?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], correctAnswer: 3, difficulty: 'easy', category: 'Geography' },
  { id: 'e12', question: 'Who wrote "Harry Potter"?', options: ['J.R.R. Tolkien', 'J.K. Rowling', 'Stephen King', 'Roald Dahl'], correctAnswer: 1, difficulty: 'easy', category: 'Literature' },
  { id: 'e13', question: 'What gas do plants absorb from the atmosphere?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], correctAnswer: 2, difficulty: 'easy', category: 'Science' },
  { id: 'e14', question: 'How many legs does a spider have?', options: ['6', '8', '10', '12'], correctAnswer: 1, difficulty: 'easy', category: 'Animals' },
  { id: 'e15', question: 'What is the freezing point of water in Celsius?', options: ['-10°C', '0°C', '10°C', '32°C'], correctAnswer: 1, difficulty: 'easy', category: 'Science' },
];

// Medium questions (Both age groups)
const mediumQuestions: Question[] = [
  { id: 'm1', question: 'What is the smallest country in the world by area?', options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'], correctAnswer: 1, difficulty: 'medium', category: 'Geography' },
  { id: 'm2', question: 'Which element has the atomic number 79?', options: ['Silver', 'Platinum', 'Gold', 'Copper'], correctAnswer: 2, difficulty: 'medium', category: 'Science' },
  { id: 'm3', question: 'In which year did World War II end?', options: ['1943', '1944', '1945', '1946'], correctAnswer: 2, difficulty: 'medium', category: 'History' },
  { id: 'm4', question: 'What is the capital of Australia?', options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'], correctAnswer: 2, difficulty: 'medium', category: 'Geography' },
  { id: 'm5', question: 'Who painted the Mona Lisa?', options: ['Michelangelo', 'Leonardo da Vinci', 'Raphael', 'Botticelli'], correctAnswer: 1, difficulty: 'medium', category: 'Art' },
  { id: 'm6', question: 'What is the square root of 144?', options: ['10', '11', '12', '13'], correctAnswer: 2, difficulty: 'medium', category: 'Math' },
  { id: 'm7', question: 'Which planet has the most moons?', options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'], correctAnswer: 1, difficulty: 'medium', category: 'Science' },
  { id: 'm8', question: 'What is the currency of Switzerland?', options: ['Euro', 'Swiss Franc', 'Swiss Dollar', 'Swiss Mark'], correctAnswer: 1, difficulty: 'medium', category: 'General' },
  { id: 'm9', question: 'Who discovered penicillin?', options: ['Louis Pasteur', 'Alexander Fleming', 'Marie Curie', 'Joseph Lister'], correctAnswer: 1, difficulty: 'medium', category: 'Science' },
  { id: 'm10', question: 'What is the longest river in the world?', options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'], correctAnswer: 1, difficulty: 'medium', category: 'Geography' },
  { id: 'm11', question: 'In which country would you find Machu Picchu?', options: ['Mexico', 'Peru', 'Chile', 'Bolivia'], correctAnswer: 1, difficulty: 'medium', category: 'Geography' },
  { id: 'm12', question: 'What is the main ingredient in hummus?', options: ['Lentils', 'Chickpeas', 'Black Beans', 'Kidney Beans'], correctAnswer: 1, difficulty: 'medium', category: 'Food' },
  { id: 'm13', question: 'Which Shakespeare play features the characters Romeo and Juliet?', options: ['Hamlet', 'Othello', 'Romeo and Juliet', 'Macbeth'], correctAnswer: 2, difficulty: 'medium', category: 'Literature' },
  { id: 'm14', question: 'How many bones are in the adult human body?', options: ['186', '206', '226', '246'], correctAnswer: 1, difficulty: 'medium', category: 'Science' },
  { id: 'm15', question: 'What year was the first iPhone released?', options: ['2005', '2006', '2007', '2008'], correctAnswer: 2, difficulty: 'medium', category: 'Technology' },
];

// Hard questions (Age 15+)
const hardQuestions: Question[] = [
  { id: 'h1', question: 'What is the Schrödinger equation primarily used to describe?', options: ['Electromagnetic waves', 'Quantum systems', 'Thermodynamics', 'Relativity'], correctAnswer: 1, difficulty: 'hard', category: 'Science' },
  { id: 'h2', question: 'Which treaty established the European Economic Community in 1957?', options: ['Treaty of Versailles', 'Treaty of Rome', 'Treaty of Paris', 'Treaty of Lisbon'], correctAnswer: 1, difficulty: 'hard', category: 'History' },
  { id: 'h3', question: 'What programming language was created by Guido van Rossum?', options: ['Java', 'C++', 'Python', 'Ruby'], correctAnswer: 2, difficulty: 'hard', category: 'Technology' },
  { id: 'h4', question: 'In economics, what does GDP stand for?', options: ['General Domestic Product', 'Gross Domestic Product', 'Global Development Protocol', 'General Development Plan'], correctAnswer: 1, difficulty: 'hard', category: 'Economics' },
  { id: 'h5', question: 'Who wrote "The Art of War"?', options: ['Confucius', 'Sun Tzu', 'Lao Tzu', 'Mencius'], correctAnswer: 1, difficulty: 'hard', category: 'History' },
  { id: 'h6', question: 'What is the chemical formula for sulfuric acid?', options: ['HCl', 'H2SO4', 'HNO3', 'H3PO4'], correctAnswer: 1, difficulty: 'hard', category: 'Science' },
  { id: 'h7', question: 'Which philosopher wrote "Thus Spoke Zarathustra"?', options: ['Immanuel Kant', 'Friedrich Nietzsche', 'Karl Marx', 'Jean-Paul Sartre'], correctAnswer: 1, difficulty: 'hard', category: 'Philosophy' },
  { id: 'h8', question: 'What is the derivative of e^x?', options: ['xe^(x-1)', 'e^x', 'e^(x+1)', 'ln(x)'], correctAnswer: 1, difficulty: 'hard', category: 'Math' },
  { id: 'h9', question: 'Which company developed the first commercially successful graphical user interface?', options: ['Microsoft', 'Apple', 'Xerox', 'IBM'], correctAnswer: 2, difficulty: 'hard', category: 'Technology' },
  { id: 'h10', question: 'What is the capital of Kazakhstan?', options: ['Almaty', 'Astana', 'Bishkek', 'Tashkent'], correctAnswer: 1, difficulty: 'hard', category: 'Geography' },
  { id: 'h11', question: 'Who discovered the structure of DNA?', options: ['Watson and Crick', 'Darwin and Wallace', 'Mendel and Morgan', 'Pasteur and Koch'], correctAnswer: 0, difficulty: 'hard', category: 'Science' },
  { id: 'h12', question: 'What is the speed of light in a vacuum (approximately)?', options: ['3×10⁶ m/s', '3×10⁷ m/s', '3×10⁸ m/s', '3×10⁹ m/s'], correctAnswer: 2, difficulty: 'hard', category: 'Science' },
  { id: 'h13', question: 'Which algorithm is commonly used for public-key cryptography?', options: ['AES', 'DES', 'RSA', 'SHA-256'], correctAnswer: 2, difficulty: 'hard', category: 'Technology' },
  { id: 'h14', question: 'What is the Pythagorean theorem used for?', options: ['Calculating circle area', 'Finding right triangle sides', 'Solving cubic equations', 'Computing logarithms'], correctAnswer: 1, difficulty: 'hard', category: 'Math' },
  { id: 'h15', question: 'In which year did the Berlin Wall fall?', options: ['1987', '1988', '1989', '1990'], correctAnswer: 2, difficulty: 'hard', category: 'History' },
];

// Shuffle array utility
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Generate questions for a game session
export const generateGameQuestions = (ageGroup: AgeGroup, totalQuestions: number = 30): Question[] => {
  let questions: Question[] = [];

  if (ageGroup === 'young') {
    // Ages 10-15: Easy-Medium questions
    // Progressive difficulty: Start easy, gradually add medium
    const easy = shuffleArray(easyQuestions);
    const medium = shuffleArray(mediumQuestions);
    
    // First 10: Mostly easy (8 easy, 2 medium)
    questions.push(...easy.slice(0, 8), ...medium.slice(0, 2));
    // Next 10: Mixed (5 easy, 5 medium)
    questions.push(...easy.slice(8, 13), ...medium.slice(2, 7));
    // Last 10: Mostly medium (3 easy, 7 medium)
    questions.push(...easy.slice(13, 15), ...medium.slice(7, 15));
  } else {
    // Ages 15+: Medium-Hard questions
    const medium = shuffleArray(mediumQuestions);
    const hard = shuffleArray(hardQuestions);
    
    // First 10: Mostly medium (7 medium, 3 hard)
    questions.push(...medium.slice(0, 7), ...hard.slice(0, 3));
    // Next 10: Mixed (5 medium, 5 hard)
    questions.push(...medium.slice(7, 12), ...hard.slice(3, 8));
    // Last 10: Mostly hard (3 medium, 7 hard)
    questions.push(...medium.slice(12, 15), ...hard.slice(8, 15));
  }

  // Shuffle each section but keep difficulty progression
  const section1 = shuffleArray(questions.slice(0, 10));
  const section2 = shuffleArray(questions.slice(10, 20));
  const section3 = shuffleArray(questions.slice(20, 30));

  return [...section1, ...section2, ...section3];
};

export { easyQuestions, mediumQuestions, hardQuestions };
