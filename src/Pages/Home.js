import React, { useState } from "react";
import { Typography, Input, Button } from "antd";
import {
  DeleteTwoTone,
  PlusCircleTwoTone,
  LogoutOutlined,
} from "@ant-design/icons";
import "../mobile.css";
import { ToastContainer, toast } from "react-toastify";
import shortid from "shortid";
import firebase from "firebase/app";
import "firebase/auth";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import "antd/dist/antd.css";
import "animate.css";
import "../App.css";
import { createPoll } from "../firebase/polls";
import { UserSession } from "../firebase/UserProvider";

export const Home = (props) => {
  const { user } = UserSession();
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {})
      .catch(function (error) {});
  };
  const { TextArea } = Input;

  const handleSubmit = (e) => {
    let options = [];
    let flag = 0;

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];

      if (question.questionText === "") {
        toast.error("Please fill the Question!");
        flag = 1;
        break;
      }

      for (let j = 0; j < question.options.length; j++) {
        const option = question.options[j];

        if (option.optionText === "") {
          toast.error("Please fill all the options!");
          flag = 1;
          break;
        }

        options.push({ title: option.optionText, count: 0 });
      }

      if (flag === 1) {
        break;
      }
    }

    if (options.length < 2) {
      toast.error("Minimum 2 options required!");
    } else if (flag === 0) {
      const pollId = shortid.generate();
      const pollCreator = user.displayName;

      const poll = {
        id: pollId,
        creator: pollCreator,
        votes: {},
        questions: questions.map((question) => ({
          title: question.questionText,
          options: question.options.map((option) => ({
            title: option.optionText,
            count: 0,
          })),
        })),
      };

      createPoll(poll);
      toast.success("Poll Generated Successfully 🎉");

      setTimeout(() => {
        props.history.push(`/${poll.id}`);
      }, 2000);
    }
  };

  const [questions, setQuestions] = useState([
    {
      questionId: shortid.generate(),
      questionText: "",
      options: [
        {
          index: 1,
          optionText: "",
          count: 0,
        },
        {
          index: 2,
          optionText: "",
          count: 0,
        },
      ],
    },
  ]);

  function handleQuestion(text, i) {
    var newQuestion = [...questions];
    newQuestion[i].questionText = text;
    setQuestions(newQuestion);
  }

  function handleOption(text, i, j) {
    var optionsQuestions = [...questions];
    optionsQuestions[i].options[j].optionText = text;
    setQuestions(optionsQuestions);
  }

  function deleteOption(i, j) {
    var deleteOptionQuestions = [...questions];
    deleteOptionQuestions[i].options.splice(j, 1);

    deleteOptionQuestions[i].options.forEach((option, index) => {
      option.index = index + 1;
    });

    setQuestions(deleteOptionQuestions);
  }

  function addOption(i) {
    var AddOptionQuestions = [...questions];
    const currentOptionsCount = AddOptionQuestions[i].options.length;

    if (currentOptionsCount < 5) {
      AddOptionQuestions[i].options.push({
        index: currentOptionsCount + 1,
        optionText: "",
        count: 0,
      });
    } else {
      alert("You can add a maximum of 5 options");
    }
    setQuestions(AddOptionQuestions);
  }

  function addQuestion() {
    setQuestions([
      ...questions,
      {
        questionId: shortid.generate(),
        questionText: "",
        options: [
          {
            index: 1,
            optionText: "",
            count: 0,
          },
          {
            index: 2,
            optionText: "",
            count: 0,
          },
        ],
      },
    ]);
    window.scrollTo(0, document.body.scrollHeight);
  }

  function deleteQuestion(i) {
    let qs = [...questions];
    if (questions.length > 1) {
      qs.splice(i, 1);
    }
    setQuestions(qs);
  }

  function questionsUI() {
    return questions.map((ques, i) => (
      <div
        key={ques.questionId}
        style={{ flexGrow: "1", border: "1px solid #ccc", padding: "10px" }}
        className="min_wide"
      >
        <Typography className="head_title text-base font-medium">
          {i + 1}. Question
        </Typography>
        <br />
        <div>
          <TextArea
            placeholder="Ask a Question..."
            className="title"
            value={ques.questionText}
            onChange={(e) => {
              handleQuestion(e.target.value, i);
            }}
            autoSize={{ minRows: 1.5 }}
          />
        </div>
        <br />
        <br />
        {ques.options.map((option, j) => (
          <div key={j}>
            <AnimatePresence>
              <motion.div
                exit={{ x: -800 }}
                initial={{ y: -30, opacity: 0 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { y: { duration: 0.5 } },
                }}
                key={ques.options[j].index}
                className="options"
              >
                <input
                  type="text"
                  placeholder={`Option`}
                  className="option"
                  onChange={(e) => {
                    handleOption(e.target.value, i, j);
                  }}
                />
                <DeleteTwoTone
                  twoToneColor="#eb2f96"
                  style={{ fontSize: "1.2rem" }}
                  onClick={() => {
                    deleteOption(i, j);
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        ))}
        {ques.options.length < 5 ? (
          <div className="add_question_body">
            <div className="flex_btns">
              <Button type="primary" onClick={() => addOption(i)}>
                Add an Option <PlusCircleTwoTone />
              </Button>
            </div>
          </div>
        ) : (
          ""
        )}
        <br />
        <div className="add_question_body">
          <div className="flex_btns">
            <Button type="primary" onClick={() => deleteQuestion(i)}>
              Delete Question
              <DeleteTwoTone
                twoToneColor="#eb2f96"
                style={{ fontSize: "1.2rem" }}
              />
            </Button>
          </div>
        </div>
        <br /> <br />
      </div>
    ));
  }

  return (
    <div>
      <div className="logout_grid">
        <div>
          <h1 className="animate__animated animate__pulse heading">
            Ask a Question
          </h1>
        </div>
        <div>
          <Button
            type="primary"
            onClick={handleLogout}
            size="large"
            className="btn_logout"
          >
            {" "}
            Logout <LogoutOutlined />
          </Button>
        </div>
      </div>
      <ToastContainer newestOnTop autoClose={2000} />

      <div className="flex_home">
        <div style={{ flexGrow: "1" }}>{questionsUI()}</div>
      </div>
      <div className="add_poll_buttons">
        <br />
        <Button
          type="primary"
          size="large"
          className="submit"
          onClick={addQuestion}
        >
          Add Poll
        </Button>
        <br />
        <Button
          type="primary"
          size="large"
          className="submit"
          onClick={handleSubmit}
        >
          Generate Poll
        </Button>
      </div>
    </div>
  );
};
