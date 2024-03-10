import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Questions = () => {
  interface QuestionInterface {
    question: {
      text: string;
    };
    correctAnswer: string;
    incorrectAnswers: string[];
  }

  const [allQuestions, setAllQuestions] = useState<QuestionInterface[]>([]);
  const [page, setPage] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<null | string>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getQuestions = async () => {
      const res = await fetch("https://the-trivia-api.com/v2/questions");
      const data = await res.json();
      const questions = data as QuestionInterface[];
      setAllQuestions(questions);
    };
    getQuestions();
  }, []);

  const nextBtnHandler = () => {
    if (page < allQuestions.length - 1) {
      setPage(page + 1);
    }
  };

  const prevBtnHandler = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const answerValidateHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedOption(event.target.value);
    const qObj = allQuestions[page];
    if (qObj.correctAnswer === event.target.value) {
      setFinalScore(finalScore + 1);
    }
  };

  const submitBtnHandler = () => {
    console.log("Final Score " + finalScore + "/" + allQuestions.length);
  };

  const SingleQuestionComponent = () => {
    const ques = allQuestions[page];
    const options = [...ques.incorrectAnswers, ques?.correctAnswer];
    return (
      <div>
        <p>{ques?.question?.text}</p>
        <div>
          {options.map((item) => {
            return (
              <label>
                <input
                  type="radio"
                  value={item}
                  checked={selectedOption == item}
                  onChange={(e) => answerValidateHandler(e)}
                />
                {item}
              </label>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-center">
      <div className="flex-col">
        {allQuestions[page] && <SingleQuestionComponent />}
        <div>
          <div className="flex justify-between">
            <button
              className="p-2 bg-black text-white rounded-lg"
              onClick={nextBtnHandler}
            >
              Next
            </button>
            <button
              className="p-2 bg-black text-white rounded-lg"
              onClick={prevBtnHandler}
            >
              Previous
            </button>
          </div>
          <button
            className="p-2 bg-black text-white rounded-lg w-full"
            onClick={submitBtnHandler}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
