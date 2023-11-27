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

// Home component
export const Home = (props) => {
  // extract user information from UserProvider component
  const { user } = UserSession();

  const { TextArea } = Input;

  // state to manage the list of questions
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

  // handle user logout
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {})
      .catch(function (error) {});
  };

  // handle form submission
  const handleSubmit = (e) => {
    // store poll options in array
    let options = [];

    // flag for error
    let flag = 0;

    // iterate each question
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];

      // check if the question text is empty
      if (question.questionText === "") {
        toast.error("Please fill the Question!");
        // set the flag to indicate an error
        flag = 1;
        break;
      }

      //  // iterate each option for the question
      for (let j = 0; j < question.options.length; j++) {
        const option = question.options[j];

        // check if the option text is empty
        if (option.optionText === "") {
          toast.error("Please fill all the options!");
          // set the flag to indicate an error
          flag = 1;
          break;
        }

        // push option details to array
        options.push({ title: option.optionText, count: 0 });
      }

      // if there is an error, break the loop
      if (flag === 1) {
        break;
      }
    }

    // check if number of options is less than 2
    if (options.length < 2) {
      toast.error("Minimum 2 options required!");
    } else if (flag === 0) {
      // if there is no errors, generate a unique pollId and get poll creator name
      const pollId = shortid.generate();
      const pollCreator = user.displayName;

      // create poll object to store in firestore
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

      // store the poll in firestore
      createPoll(poll);
      toast.success("Poll Generated Successfully 🎉");

      // redirection to the created poll
      setTimeout(() => {
        props.history.push(`/${poll.id}`);
      }, 2000);
    }
  };

  // add a new question
  function addQuestion() {
    // set questions state with previous questions and a new question
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

  // add a new option to specific question
  function addOption(i) {
    var addOptionQuestions = [...questions];
    const currentOptionsCount = addOptionQuestions[i].options.length;

    // check if number of options is less than 5
    if (currentOptionsCount < 5) {
      addOptionQuestions[i].options.push({
        index: currentOptionsCount + 1,
        optionText: "",
        count: 0,
      });
    } else {
      alert("You can add a maximum of 5 options");
    }
    setQuestions(addOptionQuestions);
  }

  // handle changes to question text
  function handleQuestion(text, i) {
    var newQuestion = [...questions];
    newQuestion[i].questionText = text;
    setQuestions(newQuestion);
  }

  // handle changes to option text
  function handleOption(text, i, j) {
    var optionsQuestions = [...questions];
    optionsQuestions[i].options[j].optionText = text;
    setQuestions(optionsQuestions);
  }

  //delete an option from a spesific question
  function deleteOption(i, j) {
    var deleteOptionQuestions = [...questions];
    deleteOptionQuestions[i].options.splice(j, 1);

    deleteOptionQuestions[i].options.forEach((option, index) => {
      option.index = index + 1;
    });

    setQuestions(deleteOptionQuestions);
  }

  // delete a question
  function deleteQuestion(i) {
    let qs = [...questions];
    if (questions.length > 1) {
      qs.splice(i, 1);
    }
    setQuestions(qs);
  }

  // render and manage questions and options
  function questionsUI() {
    return questions.map((ques, i) => (
      <div
        key={ques.questionId}
        style={{ flexGrow: "1", border: "1px solid #ccc", padding: "10px" }}
        className="min_wide"
      >
        {/* question number */}
        <Typography className="head_title text-base font-medium">
          {i + 1}. Question
        </Typography>
        <br />
        <div>
          {/* textarea for question text */}
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
        {/* display options for the question */}
        {ques.options.map((option, j) => (
          <div key={j}>
            {/* animation when the option entry and deletion */}
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
                {/* input for type the option text */}
                <input
                  type="text"
                  placeholder={`Option`}
                  className="option"
                  onChange={(e) => {
                    handleOption(e.target.value, i, j);
                  }}
                />
                {/* button for delete the spesific option */}
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
        {/* display "Add Option" button if the number of options is less than 5 */}
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
        {/* display "Delete Question" button */}
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

  // render Home component UI
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
