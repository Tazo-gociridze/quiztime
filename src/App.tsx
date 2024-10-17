import { useState } from 'react';
import './App.css';
import { quiz } from './data'; 

interface QuizQuestion {
  id: number;
  score: number;
  name: string;
  variants: QuizVariant[];
}

interface QuizVariant {
  id: number;
  name: string;
  isCorrect: boolean;
}

interface QuizData {
  questions: QuizQuestion[];
}

function App() {
  const [quizData, setQuizData] = useState<QuizData>(quiz); 
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [selectedVariant, setSelectedVariant] = useState<QuizVariant | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);

  const nextQuestionHandler = () => {
    if (quizIndex < quizData.questions.length - 1) {
      setQuizIndex(quizIndex + 1);
      setSelectedVariant(null);
    } else {
      alert(
        `You got ${correctAnswers} out of ${quizData.questions.length} questions right!`
      );
    }
  };

  const handleVariantClick = (variant: QuizVariant) => {
    setSelectedVariant(variant);
    if (variant.isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const currentQuestion = quizData.questions[quizIndex];

  return (
    <>
      <div className='quiz-wrapper'>
        <h1>{currentQuestion.name}</h1>
        <div className='questions'>
          {currentQuestion.variants.map((variant) => (
            <div
              key={variant.id}
              className={`variants ${selectedVariant === variant ? 'selected' : ''}`}
              onClick={() => handleVariantClick(variant)}
            >
              {variant.name}
            </div>
          ))}
        </div>
        <button onClick={nextQuestionHandler}>Continue</button>
      </div>
    </>
  );
}

export default App;