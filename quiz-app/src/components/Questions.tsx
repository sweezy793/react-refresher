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
    navigate("/result", {
      state: { finalScore, totalScore: allQuestions.length },
    });
  };

  const SingleQuestionComponent = () => {
    const ques = allQuestions[page];
    const options = [...ques.incorrectAnswers, ques?.correctAnswer];
    return (
      <div className="flex flex-col gap-6">
        <p className="font-medium text-4xl">{ques?.question?.text}</p>
        <div className="grid grid-cols-2">
          {options.map((item) => {
            return (
              <div className="p-2">
                <label className="text-xl">
                  <input
                    type="radio"
                    value={item}
                    checked={selectedOption == item}
                    onChange={(e) => answerValidateHandler(e)}
                    className="mr-2"
                  />
                  {item}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-center bg-stone-300 h-screen">
      <div className="flex flex-col justify-center w-[50rem]">
        <div className="flex flex-col bg-slate-50 rounded-xl text-center p-4 h-max drop-shadow-xl justify-between gap-10">
          {allQuestions[page] && <SingleQuestionComponent />}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <button
                className="p-2 bg-black text-white rounded-lg w-32 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-70"
                onClick={prevBtnHandler}
                disabled={page === 0}
              >
                Previous
              </button>
              <button
                className="p-2 bg-black text-white rounded-lg w-32 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-70"
                onClick={nextBtnHandler}
                disabled={page === allQuestions.length - 1}
              >
                Next
              </button>
            </div>
            <button
              className="p-2 bg-black text-white rounded-lg w-full hover:opacity-70"
              onClick={submitBtnHandler}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
