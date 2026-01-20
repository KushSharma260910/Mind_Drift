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

const easyQuestions: Question[] = [
  { id: 'e1', question: 'What planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], correctAnswer: 1, difficulty: 'easy', category: 'Science' },
  { id: 'e2', question: 'How many continents are there on Earth?', options: ['5', '6', '7', '8'], correctAnswer: 2, difficulty: 'easy', category: 'Geography' },
  { id: 'e3', question: 'What is the largest mammal in the world?', options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'], correctAnswer: 1, difficulty: 'easy', category: 'Animals' },
  { id: 'e4', question: 'How many days are in a leap year?', options: ['364', '365', '366', '367'], correctAnswer: 2, difficulty: 'easy', category: 'General' },
  { id: 'e5', question: 'What is the chemical symbol for water?', options: ['O2', 'CO2', 'H2O', 'NaCl'], correctAnswer: 2, difficulty: 'easy', category: 'Science' },
  { id: 'e6', question: 'Which country is famous for the Eiffel Tower?', options: ['Italy', 'Germany', 'France', 'Spain'], correctAnswer: 2, difficulty: 'easy', category: 'Geography' },
  { id: 'e7', question: 'What is 15 × 8?', options: ['100', '120', '130', '140'], correctAnswer: 1, difficulty: 'easy', category: 'Math' },
  { id: 'e8', question: 'Which animal is known as the King of the Jungle?', options: ['Tiger', 'Elephant', 'Lion', 'Bear'], correctAnswer: 2, difficulty: 'easy', category: 'Animals' },
  { id: 'e9', question: 'What is the capital of Japan?', options: ['Beijing', 'Seoul', 'Tokyo', 'Bangkok'], correctAnswer: 2, difficulty: 'easy', category: 'Geography' },
  { id: 'e10', question: 'How many colors are in a rainbow?', options: ['5', '6', '7', '8'], correctAnswer: 2, difficulty: 'easy', category: 'Science' },
  { id: 'e11', question: 'What is the largest ocean on Earth?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], correctAnswer: 3, difficulty: 'easy', category: 'Geography' },
  { id: 'e12', question: 'Who wrote Harry Potter?', options: ['J.R.R. Tolkien', 'J.K. Rowling', 'Stephen King', 'Roald Dahl'], correctAnswer: 1, difficulty: 'easy', category: 'Literature' },
  { id: 'e13', question: 'What gas do plants absorb from the atmosphere?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], correctAnswer: 2, difficulty: 'easy', category: 'Science' },
  { id: 'e14', question: 'How many legs does a spider have?', options: ['6', '8', '10', '12'], correctAnswer: 1, difficulty: 'easy', category: 'Animals' },
  { id: 'e15', question: 'What is the freezing point of water in Celsius?', options: ['-10°C', '0°C', '10°C', '32°C'], correctAnswer: 1, difficulty: 'easy', category: 'Science' },
  { id: 'e16', question: 'What is the largest planet in our solar system?', options: ['Saturn', 'Neptune', 'Jupiter', 'Uranus'], correctAnswer: 2, difficulty: 'easy', category: 'Science' },
  { id: 'e17', question: 'How many sides does a hexagon have?', options: ['5', '6', '7', '8'], correctAnswer: 1, difficulty: 'easy', category: 'Math' },
  { id: 'e18', question: 'What is the capital of the United States?', options: ['New York', 'Los Angeles', 'Washington D.C.', 'Chicago'], correctAnswer: 2, difficulty: 'easy', category: 'Geography' },
  { id: 'e19', question: 'Which planet is closest to the Sun?', options: ['Venus', 'Mercury', 'Earth', 'Mars'], correctAnswer: 1, difficulty: 'easy', category: 'Science' },
  { id: 'e20', question: 'What do bees produce?', options: ['Milk', 'Honey', 'Silk', 'Wax only'], correctAnswer: 1, difficulty: 'easy', category: 'Animals' },
  { id: 'e21', question: 'What is 144 ÷ 12?', options: ['10', '11', '12', '13'], correctAnswer: 2, difficulty: 'easy', category: 'Math' },
  { id: 'e22', question: 'Which animal is the tallest in the world?', options: ['Elephant', 'Giraffe', 'Camel', 'Horse'], correctAnswer: 1, difficulty: 'easy', category: 'Animals' },
  { id: 'e23', question: 'What is the main language spoken in Brazil?', options: ['Spanish', 'English', 'Portuguese', 'French'], correctAnswer: 2, difficulty: 'easy', category: 'Geography' },
  { id: 'e24', question: 'How many minutes are in one hour?', options: ['30', '45', '60', '100'], correctAnswer: 2, difficulty: 'easy', category: 'General' },
  { id: 'e25', question: 'What color do you get when you mix red and blue?', options: ['Green', 'Orange', 'Purple', 'Brown'], correctAnswer: 2, difficulty: 'easy', category: 'Art' },
  { id: 'e26', question: 'Which fruit is known for keeping doctors away?', options: ['Banana', 'Orange', 'Apple', 'Grape'], correctAnswer: 2, difficulty: 'easy', category: 'General' },
  { id: 'e27', question: 'How many weeks are in a year?', options: ['48', '50', '52', '54'], correctAnswer: 2, difficulty: 'easy', category: 'General' },
  { id: 'e28', question: 'What animal says moo?', options: ['Dog', 'Cat', 'Cow', 'Pig'], correctAnswer: 2, difficulty: 'easy', category: 'Animals' },
  { id: 'e29', question: 'What is the capital of Italy?', options: ['Milan', 'Venice', 'Rome', 'Florence'], correctAnswer: 2, difficulty: 'easy', category: 'Geography' },
  { id: 'e30', question: 'Which season comes after winter?', options: ['Summer', 'Fall', 'Spring', 'Autumn'], correctAnswer: 2, difficulty: 'easy', category: 'General' },
  { id: 'e31', question: 'What is 7 × 9?', options: ['56', '63', '72', '81'], correctAnswer: 1, difficulty: 'easy', category: 'Math' },
  { id: 'e32', question: 'What do caterpillars turn into?', options: ['Moths only', 'Butterflies', 'Beetles', 'Flies'], correctAnswer: 1, difficulty: 'easy', category: 'Animals' },
  { id: 'e33', question: 'How many players are on a soccer team on the field?', options: ['9', '10', '11', '12'], correctAnswer: 2, difficulty: 'easy', category: 'Sports' },
  { id: 'e34', question: 'What is the boiling point of water in Celsius?', options: ['90°C', '100°C', '110°C', '212°C'], correctAnswer: 1, difficulty: 'easy', category: 'Science' },
  { id: 'e35', question: 'Which instrument has 88 keys?', options: ['Guitar', 'Violin', 'Piano', 'Flute'], correctAnswer: 2, difficulty: 'easy', category: 'Music' },
  { id: 'e36', question: 'What is the currency of the United Kingdom?', options: ['Euro', 'Dollar', 'Pound', 'Franc'], correctAnswer: 2, difficulty: 'easy', category: 'General' },
  { id: 'e37', question: 'How many teeth does an adult human have?', options: ['28', '30', '32', '34'], correctAnswer: 2, difficulty: 'easy', category: 'Science' },
  { id: 'e38', question: 'What shape is a stop sign?', options: ['Circle', 'Square', 'Octagon', 'Triangle'], correctAnswer: 2, difficulty: 'easy', category: 'General' },
  { id: 'e39', question: 'Which bird cannot fly?', options: ['Eagle', 'Penguin', 'Sparrow', 'Owl'], correctAnswer: 1, difficulty: 'easy', category: 'Animals' },
  { id: 'e40', question: 'What is the smallest prime number?', options: ['0', '1', '2', '3'], correctAnswer: 2, difficulty: 'easy', category: 'Math' },
  { id: 'e41', question: 'Which organ pumps blood through your body?', options: ['Brain', 'Lungs', 'Heart', 'Liver'], correctAnswer: 2, difficulty: 'easy', category: 'Science' },
  { id: 'e42', question: 'What is the national animal of Australia?', options: ['Koala', 'Kangaroo', 'Platypus', 'Wombat'], correctAnswer: 1, difficulty: 'easy', category: 'Animals' },
  { id: 'e43', question: 'How many hours are in a day?', options: ['12', '20', '24', '48'], correctAnswer: 2, difficulty: 'easy', category: 'General' },
  { id: 'e44', question: 'What is the main ingredient in bread?', options: ['Rice', 'Flour', 'Sugar', 'Salt'], correctAnswer: 1, difficulty: 'easy', category: 'Food' },
  { id: 'e45', question: 'Which planet has rings around it?', options: ['Mars', 'Venus', 'Saturn', 'Mercury'], correctAnswer: 2, difficulty: 'easy', category: 'Science' },
  { id: 'e46', question: 'What is 25% of 100?', options: ['15', '20', '25', '30'], correctAnswer: 2, difficulty: 'easy', category: 'Math' },
  { id: 'e47', question: 'Which continent is Egypt in?', options: ['Asia', 'Europe', 'Africa', 'Australia'], correctAnswer: 2, difficulty: 'easy', category: 'Geography' },
  { id: 'e48', question: 'What is a baby dog called?', options: ['Kitten', 'Puppy', 'Cub', 'Calf'], correctAnswer: 1, difficulty: 'easy', category: 'Animals' },
  { id: 'e49', question: 'How many zeroes are in one thousand?', options: ['2', '3', '4', '5'], correctAnswer: 1, difficulty: 'easy', category: 'Math' },
  { id: 'e50', question: 'What is the opposite of hot?', options: ['Warm', 'Cold', 'Cool', 'Frozen'], correctAnswer: 1, difficulty: 'easy', category: 'Language' },
];

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
  { id: 'm13', question: 'How many bones are in the adult human body?', options: ['186', '206', '226', '246'], correctAnswer: 1, difficulty: 'medium', category: 'Science' },
  { id: 'm14', question: 'What year was the first iPhone released?', options: ['2005', '2006', '2007', '2008'], correctAnswer: 2, difficulty: 'medium', category: 'Technology' },
  { id: 'm15', question: 'What is the chemical symbol for sodium?', options: ['So', 'Sd', 'Na', 'No'], correctAnswer: 2, difficulty: 'medium', category: 'Science' },
  { id: 'm16', question: 'Which country invented paper?', options: ['Japan', 'India', 'China', 'Egypt'], correctAnswer: 2, difficulty: 'medium', category: 'History' },
  { id: 'm17', question: 'What is the largest desert in the world?', options: ['Sahara', 'Arabian', 'Gobi', 'Antarctica'], correctAnswer: 3, difficulty: 'medium', category: 'Geography' },
  { id: 'm18', question: 'Who wrote 1984?', options: ['Aldous Huxley', 'George Orwell', 'Ray Bradbury', 'H.G. Wells'], correctAnswer: 1, difficulty: 'medium', category: 'Literature' },
  { id: 'm19', question: 'What is the speed of sound in air approximately?', options: ['243 m/s', '343 m/s', '443 m/s', '543 m/s'], correctAnswer: 1, difficulty: 'medium', category: 'Science' },
  { id: 'm20', question: 'Which vitamin is produced when skin is exposed to sunlight?', options: ['Vitamin A', 'Vitamin C', 'Vitamin D', 'Vitamin E'], correctAnswer: 2, difficulty: 'medium', category: 'Science' },
  { id: 'm21', question: 'What is the capital of Canada?', options: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa'], correctAnswer: 3, difficulty: 'medium', category: 'Geography' },
  { id: 'm22', question: 'Who invented the telephone?', options: ['Thomas Edison', 'Alexander Graham Bell', 'Nikola Tesla', 'Guglielmo Marconi'], correctAnswer: 1, difficulty: 'medium', category: 'History' },
  { id: 'm23', question: 'What is the hardest natural substance on Earth?', options: ['Gold', 'Iron', 'Diamond', 'Platinum'], correctAnswer: 2, difficulty: 'medium', category: 'Science' },
  { id: 'm24', question: 'In what year did the Titanic sink?', options: ['1910', '1912', '1914', '1916'], correctAnswer: 1, difficulty: 'medium', category: 'History' },
  { id: 'm25', question: 'What is the largest organ in the human body?', options: ['Liver', 'Brain', 'Skin', 'Heart'], correctAnswer: 2, difficulty: 'medium', category: 'Science' },
  { id: 'm26', question: 'Which country has the most time zones?', options: ['Russia', 'USA', 'China', 'France'], correctAnswer: 3, difficulty: 'medium', category: 'Geography' },
  { id: 'm27', question: 'What gas makes up most of Earths atmosphere?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Argon'], correctAnswer: 2, difficulty: 'medium', category: 'Science' },
  { id: 'm28', question: 'Who painted The Starry Night?', options: ['Claude Monet', 'Vincent van Gogh', 'Pablo Picasso', 'Salvador Dalí'], correctAnswer: 1, difficulty: 'medium', category: 'Art' },
  { id: 'm29', question: 'What is the capital of South Korea?', options: ['Busan', 'Incheon', 'Seoul', 'Daegu'], correctAnswer: 2, difficulty: 'medium', category: 'Geography' },
  { id: 'm30', question: 'How many chromosomes do humans have?', options: ['23', '46', '48', '52'], correctAnswer: 1, difficulty: 'medium', category: 'Science' },
  { id: 'm31', question: 'Which ocean is the Mariana Trench in?', options: ['Atlantic', 'Indian', 'Pacific', 'Arctic'], correctAnswer: 2, difficulty: 'medium', category: 'Geography' },
  { id: 'm32', question: 'What is the formula for calculating area of a circle?', options: ['2πr', 'πr²', 'πd', '2πr²'], correctAnswer: 1, difficulty: 'medium', category: 'Math' },
  { id: 'm33', question: 'Who was the first person to walk on the moon?', options: ['Buzz Aldrin', 'Neil Armstrong', 'Yuri Gagarin', 'John Glenn'], correctAnswer: 1, difficulty: 'medium', category: 'History' },
  { id: 'm34', question: 'Which country is the largest by area?', options: ['Canada', 'USA', 'China', 'Russia'], correctAnswer: 3, difficulty: 'medium', category: 'Geography' },
  { id: 'm35', question: 'What is the pH of pure water?', options: ['5', '6', '7', '8'], correctAnswer: 2, difficulty: 'medium', category: 'Science' },
  { id: 'm36', question: 'Who developed the theory of relativity?', options: ['Isaac Newton', 'Albert Einstein', 'Stephen Hawking', 'Niels Bohr'], correctAnswer: 1, difficulty: 'medium', category: 'Science' },
  { id: 'm37', question: 'What is the national flower of Japan?', options: ['Rose', 'Lotus', 'Cherry Blossom', 'Tulip'], correctAnswer: 2, difficulty: 'medium', category: 'General' },
  { id: 'm38', question: 'Which blood type is the universal donor?', options: ['A', 'B', 'AB', 'O'], correctAnswer: 3, difficulty: 'medium', category: 'Science' },
  { id: 'm39', question: 'What is the capital of Brazil?', options: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Salvador'], correctAnswer: 2, difficulty: 'medium', category: 'Geography' },
  { id: 'm40', question: 'How many planets in our solar system have rings?', options: ['1', '2', '3', '4'], correctAnswer: 3, difficulty: 'medium', category: 'Science' },
  { id: 'm41', question: 'Who wrote Pride and Prejudice?', options: ['Charlotte Brontë', 'Jane Austen', 'Emily Brontë', 'Virginia Woolf'], correctAnswer: 1, difficulty: 'medium', category: 'Literature' },
  { id: 'm42', question: 'What is the hottest planet in our solar system?', options: ['Mercury', 'Venus', 'Mars', 'Jupiter'], correctAnswer: 1, difficulty: 'medium', category: 'Science' },
  { id: 'm43', question: 'In which year was the United Nations founded?', options: ['1943', '1945', '1947', '1950'], correctAnswer: 1, difficulty: 'medium', category: 'History' },
  { id: 'm44', question: 'What is the largest lake in Africa?', options: ['Lake Tanganyika', 'Lake Victoria', 'Lake Malawi', 'Lake Chad'], correctAnswer: 1, difficulty: 'medium', category: 'Geography' },
  { id: 'm45', question: 'Which element is the most abundant in the universe?', options: ['Oxygen', 'Carbon', 'Hydrogen', 'Helium'], correctAnswer: 2, difficulty: 'medium', category: 'Science' },
  { id: 'm46', question: 'What is the currency of Japan?', options: ['Yuan', 'Won', 'Yen', 'Ringgit'], correctAnswer: 2, difficulty: 'medium', category: 'General' },
  { id: 'm47', question: 'Who invented the World Wide Web?', options: ['Bill Gates', 'Steve Jobs', 'Tim Berners-Lee', 'Mark Zuckerberg'], correctAnswer: 2, difficulty: 'medium', category: 'Technology' },
  { id: 'm48', question: 'What is the Great Barrier Reef made of?', options: ['Rocks', 'Coral', 'Sand', 'Volcanic rock'], correctAnswer: 1, difficulty: 'medium', category: 'Science' },
  { id: 'm49', question: 'What is the smallest bone in the human body?', options: ['Stapes', 'Femur', 'Tibia', 'Radius'], correctAnswer: 0, difficulty: 'medium', category: 'Science' },
  { id: 'm50', question: 'Which Shakespeare play features Romeo and Juliet?', options: ['Hamlet', 'Othello', 'Romeo and Juliet', 'Macbeth'], correctAnswer: 2, difficulty: 'medium', category: 'Literature' },
];

const hardQuestions: Question[] = [
  { id: 'h1', question: 'What is the Schrödinger equation primarily used to describe?', options: ['Electromagnetic waves', 'Quantum systems', 'Thermodynamics', 'Relativity'], correctAnswer: 1, difficulty: 'hard', category: 'Science' },
  { id: 'h2', question: 'Which treaty established the European Economic Community in 1957?', options: ['Treaty of Versailles', 'Treaty of Rome', 'Treaty of Paris', 'Treaty of Lisbon'], correctAnswer: 1, difficulty: 'hard', category: 'History' },
  { id: 'h3', question: 'What programming language was created by Guido van Rossum?', options: ['Java', 'C++', 'Python', 'Ruby'], correctAnswer: 2, difficulty: 'hard', category: 'Technology' },
  { id: 'h4', question: 'In economics, what does GDP stand for?', options: ['General Domestic Product', 'Gross Domestic Product', 'Global Development Protocol', 'General Development Plan'], correctAnswer: 1, difficulty: 'hard', category: 'Economics' },
  { id: 'h5', question: 'Who wrote The Art of War?', options: ['Confucius', 'Sun Tzu', 'Lao Tzu', 'Mencius'], correctAnswer: 1, difficulty: 'hard', category: 'History' },
  { id: 'h6', question: 'What is the chemical formula for sulfuric acid?', options: ['HCl', 'H2SO4', 'HNO3', 'H3PO4'], correctAnswer: 1, difficulty: 'hard', category: 'Science' },
  { id: 'h7', question: 'Which philosopher wrote Thus Spoke Zarathustra?', options: ['Immanuel Kant', 'Friedrich Nietzsche', 'Karl Marx', 'Jean-Paul Sartre'], correctAnswer: 1, difficulty: 'hard', category: 'Philosophy' },
  { id: 'h8', question: 'What is the derivative of e^x?', options: ['xe^(x-1)', 'e^x', 'e^(x+1)', 'ln(x)'], correctAnswer: 1, difficulty: 'hard', category: 'Math' },
  { id: 'h9', question: 'Which company developed the first commercially successful graphical user interface?', options: ['Microsoft', 'Apple', 'Xerox', 'IBM'], correctAnswer: 2, difficulty: 'hard', category: 'Technology' },
  { id: 'h10', question: 'What is the capital of Kazakhstan?', options: ['Almaty', 'Astana', 'Bishkek', 'Tashkent'], correctAnswer: 1, difficulty: 'hard', category: 'Geography' },
  { id: 'h11', question: 'Who discovered the structure of DNA?', options: ['Watson and Crick', 'Darwin and Wallace', 'Mendel and Morgan', 'Pasteur and Koch'], correctAnswer: 0, difficulty: 'hard', category: 'Science' },
  { id: 'h12', question: 'What is the speed of light in a vacuum approximately?', options: ['3×10⁶ m/s', '3×10⁷ m/s', '3×10⁸ m/s', '3×10⁹ m/s'], correctAnswer: 2, difficulty: 'hard', category: 'Science' },
  { id: 'h13', question: 'Which algorithm is commonly used for public-key cryptography?', options: ['AES', 'DES', 'RSA', 'SHA-256'], correctAnswer: 2, difficulty: 'hard', category: 'Technology' },
  { id: 'h14', question: 'What is the Pythagorean theorem used for?', options: ['Calculating circle area', 'Finding right triangle sides', 'Solving cubic equations', 'Computing logarithms'], correctAnswer: 1, difficulty: 'hard', category: 'Math' },
  { id: 'h15', question: 'In which year did the Berlin Wall fall?', options: ['1987', '1988', '1989', '1990'], correctAnswer: 2, difficulty: 'hard', category: 'History' },
  { id: 'h16', question: 'What is the Heisenberg Uncertainty Principle about?', options: ['Energy conservation', 'Position and momentum', 'Wave-particle duality', 'Quantum entanglement'], correctAnswer: 1, difficulty: 'hard', category: 'Science' },
  { id: 'h17', question: 'Which ancient civilization built Machu Picchu?', options: ['Maya', 'Aztec', 'Inca', 'Olmec'], correctAnswer: 2, difficulty: 'hard', category: 'History' },
  { id: 'h18', question: 'What is the Big O notation for binary search?', options: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'], correctAnswer: 2, difficulty: 'hard', category: 'Technology' },
  { id: 'h19', question: 'Who composed The Four Seasons?', options: ['Bach', 'Mozart', 'Vivaldi', 'Beethoven'], correctAnswer: 2, difficulty: 'hard', category: 'Music' },
  { id: 'h20', question: 'What is the value of Avogadros number?', options: ['6.022×10²¹', '6.022×10²²', '6.022×10²³', '6.022×10²⁴'], correctAnswer: 2, difficulty: 'hard', category: 'Science' },
  { id: 'h21', question: 'Which country was formerly known as Persia?', options: ['Iraq', 'Iran', 'Turkey', 'Afghanistan'], correctAnswer: 1, difficulty: 'hard', category: 'History' },
  { id: 'h22', question: 'What is the integral of 1/x?', options: ['x', '1/x²', 'ln|x| + C', 'e^x'], correctAnswer: 2, difficulty: 'hard', category: 'Math' },
  { id: 'h23', question: 'Who painted Guernica?', options: ['Salvador Dalí', 'Pablo Picasso', 'Joan Miró', 'Francisco Goya'], correctAnswer: 1, difficulty: 'hard', category: 'Art' },
  { id: 'h24', question: 'What is the half-life of Carbon-14?', options: ['1,730 years', '5,730 years', '10,730 years', '15,730 years'], correctAnswer: 1, difficulty: 'hard', category: 'Science' },
  { id: 'h25', question: 'Which programming paradigm does Haskell primarily use?', options: ['Object-oriented', 'Procedural', 'Functional', 'Logic'], correctAnswer: 2, difficulty: 'hard', category: 'Technology' },
  { id: 'h26', question: 'What is the Doppler effect?', options: ['Light bending', 'Frequency change due to motion', 'Sound absorption', 'Wave interference'], correctAnswer: 1, difficulty: 'hard', category: 'Science' },
  { id: 'h27', question: 'Who wrote War and Peace?', options: ['Fyodor Dostoevsky', 'Leo Tolstoy', 'Anton Chekhov', 'Ivan Turgenev'], correctAnswer: 1, difficulty: 'hard', category: 'Literature' },
  { id: 'h28', question: 'What is the chemical symbol for tungsten?', options: ['Tu', 'Tg', 'W', 'Wg'], correctAnswer: 2, difficulty: 'hard', category: 'Science' },
  { id: 'h29', question: 'Which economist wrote The Wealth of Nations?', options: ['John Maynard Keynes', 'Adam Smith', 'Karl Marx', 'Milton Friedman'], correctAnswer: 1, difficulty: 'hard', category: 'Economics' },
  { id: 'h30', question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi apparatus'], correctAnswer: 2, difficulty: 'hard', category: 'Science' },
  { id: 'h31', question: 'In what year was the Magna Carta signed?', options: ['1066', '1215', '1415', '1515'], correctAnswer: 1, difficulty: 'hard', category: 'History' },
  { id: 'h32', question: 'What is the SI unit of electric current?', options: ['Volt', 'Ohm', 'Ampere', 'Watt'], correctAnswer: 2, difficulty: 'hard', category: 'Science' },
  { id: 'h33', question: 'Who developed the first successful polio vaccine?', options: ['Louis Pasteur', 'Jonas Salk', 'Edward Jenner', 'Robert Koch'], correctAnswer: 1, difficulty: 'hard', category: 'Science' },
  { id: 'h34', question: 'What is the longest bone in the human body?', options: ['Humerus', 'Tibia', 'Femur', 'Fibula'], correctAnswer: 2, difficulty: 'hard', category: 'Science' },
  { id: 'h35', question: 'Which element has the highest electronegativity?', options: ['Oxygen', 'Chlorine', 'Nitrogen', 'Fluorine'], correctAnswer: 3, difficulty: 'hard', category: 'Science' },
  { id: 'h36', question: 'Who directed Citizen Kane?', options: ['Alfred Hitchcock', 'Orson Welles', 'John Ford', 'Billy Wilder'], correctAnswer: 1, difficulty: 'hard', category: 'Film' },
  { id: 'h37', question: 'What is the SQL command to retrieve data from a database?', options: ['GET', 'FETCH', 'SELECT', 'RETRIEVE'], correctAnswer: 2, difficulty: 'hard', category: 'Technology' },
  { id: 'h38', question: 'Which planet has a day longer than its year?', options: ['Mercury', 'Venus', 'Mars', 'Pluto'], correctAnswer: 1, difficulty: 'hard', category: 'Science' },
  { id: 'h39', question: 'What is the Krebs cycle also known as?', options: ['Glycolysis', 'Citric acid cycle', 'Calvin cycle', 'Electron transport'], correctAnswer: 1, difficulty: 'hard', category: 'Science' },
  { id: 'h40', question: 'Who formulated the laws of motion?', options: ['Galileo Galilei', 'Isaac Newton', 'Albert Einstein', 'Johannes Kepler'], correctAnswer: 1, difficulty: 'hard', category: 'Science' },
  { id: 'h41', question: 'What is the capital of Mongolia?', options: ['Ulaanbaatar', 'Darkhan', 'Erdenet', 'Choibalsan'], correctAnswer: 0, difficulty: 'hard', category: 'Geography' },
  { id: 'h42', question: 'Which philosopher is known for Cogito ergo sum?', options: ['Plato', 'Aristotle', 'René Descartes', 'John Locke'], correctAnswer: 2, difficulty: 'hard', category: 'Philosophy' },
  { id: 'h43', question: 'What type of bond involves the sharing of electrons?', options: ['Ionic', 'Covalent', 'Metallic', 'Hydrogen'], correctAnswer: 1, difficulty: 'hard', category: 'Science' },
  { id: 'h44', question: 'Who wrote The Divine Comedy?', options: ['Dante Alighieri', 'Giovanni Boccaccio', 'Francesco Petrarch', 'Niccolò Machiavelli'], correctAnswer: 0, difficulty: 'hard', category: 'Literature' },
  { id: 'h45', question: 'What is the HTTP status code for Not Found?', options: ['200', '301', '404', '500'], correctAnswer: 2, difficulty: 'hard', category: 'Technology' },
  { id: 'h46', question: 'Which gland is known as the master gland?', options: ['Thyroid', 'Adrenal', 'Pituitary', 'Pancreas'], correctAnswer: 2, difficulty: 'hard', category: 'Science' },
  { id: 'h47', question: 'What is the Fibonacci sequence starting numbers?', options: ['0, 1', '1, 1', '1, 2', '0, 2'], correctAnswer: 0, difficulty: 'hard', category: 'Math' },
  { id: 'h48', question: 'Who discovered radioactivity?', options: ['Marie Curie', 'Henri Becquerel', 'Ernest Rutherford', 'Wilhelm Röntgen'], correctAnswer: 1, difficulty: 'hard', category: 'Science' },
  { id: 'h49', question: 'What is the most abundant gas in Earths atmosphere?', options: ['Oxygen', 'Nitrogen', 'Argon', 'Carbon dioxide'], correctAnswer: 1, difficulty: 'hard', category: 'Science' },
  { id: 'h50', question: 'Which data structure uses LIFO?', options: ['Queue', 'Stack', 'Linked List', 'Tree'], correctAnswer: 1, difficulty: 'hard', category: 'Technology' },
];

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const pickRandom = <T extends { id: string }>(array: T[], count: number, excludeIds: Set<string> = new Set()): T[] => {
  const available = array.filter(item => !excludeIds.has(item.id));
  return shuffleArray(available).slice(0, Math.min(count, available.length));
};

export const generateGameQuestions = (ageGroup: AgeGroup, totalQuestions: number = 30): Question[] => {
  const usedIds = new Set<string>();
  const questions: Question[] = [];

  if (ageGroup === 'young') {
    const s1Easy = pickRandom(easyQuestions, 7, usedIds);
    s1Easy.forEach(q => usedIds.add(q.id));
    const s1Med = pickRandom(mediumQuestions, 3, usedIds);
    s1Med.forEach(q => usedIds.add(q.id));
    questions.push(...shuffleArray([...s1Easy, ...s1Med]));
    
    const s2Easy = pickRandom(easyQuestions, 5, usedIds);
    s2Easy.forEach(q => usedIds.add(q.id));
    const s2Med = pickRandom(mediumQuestions, 5, usedIds);
    s2Med.forEach(q => usedIds.add(q.id));
    questions.push(...shuffleArray([...s2Easy, ...s2Med]));
    
    const s3Easy = pickRandom(easyQuestions, 3, usedIds);
    s3Easy.forEach(q => usedIds.add(q.id));
    const s3Med = pickRandom(mediumQuestions, 7, usedIds);
    s3Med.forEach(q => usedIds.add(q.id));
    questions.push(...shuffleArray([...s3Easy, ...s3Med]));
  } else {
    const s1Med = pickRandom(mediumQuestions, 7, usedIds);
    s1Med.forEach(q => usedIds.add(q.id));
    const s1Hard = pickRandom(hardQuestions, 3, usedIds);
    s1Hard.forEach(q => usedIds.add(q.id));
    questions.push(...shuffleArray([...s1Med, ...s1Hard]));
    
    const s2Med = pickRandom(mediumQuestions, 5, usedIds);
    s2Med.forEach(q => usedIds.add(q.id));
    const s2Hard = pickRandom(hardQuestions, 5, usedIds);
    s2Hard.forEach(q => usedIds.add(q.id));
    questions.push(...shuffleArray([...s2Med, ...s2Hard]));
    
    const s3Med = pickRandom(mediumQuestions, 3, usedIds);
    s3Med.forEach(q => usedIds.add(q.id));
    const s3Hard = pickRandom(hardQuestions, 7, usedIds);
    s3Hard.forEach(q => usedIds.add(q.id));
    questions.push(...shuffleArray([...s3Med, ...s3Hard]));
  }

  return questions;
};

export { easyQuestions, mediumQuestions, hardQuestions };
