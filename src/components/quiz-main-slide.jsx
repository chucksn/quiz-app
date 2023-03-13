import { useSelector, useDispatch } from "react-redux";
import Timer from "./timer";
import { useState, useMemo } from "react";
import AnswerBar from "./answer-bar";
import { quizData } from "../question_data";
import { setQuizScoreStarted } from "../redux/slices/quizScore-slice";
import { resetQuizMainStarted } from "../redux/slices/startQuizMain-slice";
import { setQuizNextDataIndex } from "../redux/slices/quizDataIndex-slice";
import { setAnswerClicked } from "../redux/slices/answerClicked-slice";
import { resetAnswerClicked } from "../redux/slices/answerClicked-slice";

function QuizMainSlide() {
  const dispatch = useDispatch();
  const quizMainHasStarted = useSelector((state) => state.quizMainHasStarted);
  const answerClicked = useSelector((state) => state.answerClicked);
  const quizDataIndex = useSelector((state) => state.quizDataIndex);
  const [key, setKey] = useState(0); //key for resetting timer
  const [timedOut, setTimedOut] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  const quiz_data_list = quizData.results;
  const quiz_data = quiz_data_list[quizDataIndex];
  const correctAnswer = quiz_data.correct_answer;
  const incorrectAnswers = quiz_data.incorrect_answers;
  const answers = incorrectAnswers.concat(correctAnswer);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffled_answers = useMemo(() => {
    return shuffleArray(answers);
  }, [quizDataIndex]);

  const handleNextBtn = () => {
    if (quizDataIndex < quiz_data_list.length - 1) {
      dispatch(setQuizNextDataIndex());
      dispatch(resetAnswerClicked());
      setTimedOut(false);
      setKey(key + 1);
    } else {
      setTimedOut(false);
      dispatch(resetQuizMainStarted());
      dispatch(setQuizScoreStarted());
    }
    setSelectedAnswerIndex(null);
  };

  const handleTimerComplete = () => {
    dispatch(setAnswerClicked());
    setTimedOut(true);
  };

  return (
    <>
      {quizMainHasStarted && (
        <div className="quiz-select-category w-10/12 md:w-3/5 lg:w-1/2 bg-gray-300 p-2 sm:p-4 rounded-lg flex flex-col justify-between ">
          <div className="header border-b-2 border-zinc-400/20 my-4 mx-2 pb-2 flex justify-between items-center">
            <span className="block font-robotoMono md:text-lg lg:text-xl text-yellow-600 font-semibold">
              {answerClicked && quizDataIndex === quiz_data_list.length - 1 ? (
                <span className="text-lime-600">Quiz Completed</span>
              ) : (
                "Quiz In Progress..."
              )}
            </span>
            {timedOut && (
              <span className="block text-red-500 font-medium sm:p-1 md:text-lg text-sm sm:text-base shadow-s2-red rounded-md text-center animate-pulse">
                TIMED OUT
              </span>
            )}
            <div className="timer-ctn flex justify-center items-center text-right">
              <span className="block mr-1 text-orange-600 text-sm md:text-base lg:text-lg font-robotoMono font-medium">
                Time Left
              </span>
              <Timer
                isPlaying={answerClicked ? false : true}
                duration={15}
                key={key}
                onComplete={handleTimerComplete}
              />
            </div>
          </div>
          <div className="body border-b-2 border-zinc-400/20 px-4 mx-2 flex flex-col pb-2">
            <span
              className="question block text-lg md:text-xl  font-bold text-zinc-700 mb-2"
              dangerouslySetInnerHTML={{ __html: quiz_data.question }}
            ></span>
            {shuffled_answers.map((answer, index) => (
              <AnswerBar
                key={index}
                answer={answer}
                timedOut={timedOut}
                correctAnswer={correctAnswer}
                index={index}
                selectedAnswerIndex={selectedAnswerIndex}
                setSelectedAnswerIndex={setSelectedAnswerIndex}
              />
            ))}
          </div>
          <div className="footer mx-2 py-2 flex justify-between items-center">
            <span className="block text-zinc-900/70 md:text-lg font-robotoMono font-medium">
              Question {quizDataIndex + 1} of {quiz_data_list.length}
            </span>
            {answerClicked && (
              <button
                className="p-2 sm:p-3 text-sm md:text-base bg-sky-700 text-white rounded-lg lg:hover:bg-sky-600 m-2 font-medium"
                onClick={handleNextBtn}
              >
                {quizDataIndex < quiz_data_list.length - 1
                  ? "NEXT QUESTION"
                  : "GET SCORE"}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default QuizMainSlide;
