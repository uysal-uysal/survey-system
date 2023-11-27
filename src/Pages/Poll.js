import React, { useEffect, useState } from "react";
import { firestore } from "../firebase/config";
import { HorizontalBar } from "react-chartjs-2";
import { Input, Button } from "antd";
import { Link } from "react-router-dom";
import { ShareAltOutlined, LogoutOutlined } from "@ant-design/icons";
import firebase from "firebase/app";
import "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader.gif";
import { UserSession } from "../firebase/UserProvider";

const Poll = (props) => {
  const id = props.match.params.id;
  const { user } = UserSession();
  const uid = user.uid;
  const [poll, setPoll] = useState(null);
  const [index, setIndex] = useState(-1);
  const [chartData, setChartData] = useState([]);

  const handleURL = () => {
    navigator.clipboard.writeText(
      "https://survey-system-845b2.web.app" + poll.id
    );
    toast.success("URL copied to clipboard");
  };

  useEffect(() => {
    const docRef = firestore.doc(`/polls/${id}`);

    const unsubscribe = docRef.onSnapshot((document) => {
      if (document.exists) {
        const pollData = document.data();
        setPoll(pollData);

        if (pollData.questions.length > 0) {
          const firstQuestion = pollData.questions[0];

          if (firstQuestion.votes && firstQuestion.votes[uid]) {
            setIndex(firstQuestion.votes[uid]);
          }
        }
      } else {
        props.history.push("/not_found");
      }
    });

    return unsubscribe;
  }, [id, props.history, uid]);

  const handleClick = (questionIndex, optionIndex) => {
    setIndex(optionIndex);

    const docRef = firestore.doc(`/polls/${id}`);

    docRef.get().then((doc) => {
      if (doc.exists) {
        const questions = doc.data().questions;

        if (questions && questions[questionIndex]) {
          const options = questions[questionIndex].options;

          options.forEach((option) => {
            if (option.votes && option.votes[uid]) {
              option.count -= 1;
              delete option.votes[uid];
            }
          });

          if (options && options[optionIndex]) {
            options[optionIndex].count += 1;
            options[optionIndex].votes = options[optionIndex].votes || {};
            options[optionIndex].votes[uid] = true;

            docRef.update({
              questions,
            });

            // Update the chart data for the selected question
            const x = [];
            const y = [];
            options.forEach((option) => {
              x.push(option.title);
              y.push(option.count);
            });

            const updatedChartData = [...chartData];
            updatedChartData[questionIndex] = {
              labels: x,
              datasets: [
                {
                  label: `Question ${questionIndex + 1} - Number of Votes`,
                  data: y,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            };

            setChartData(updatedChartData);
          }
        }
      }
    });
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {})
      .catch(function (error) {});
  };

  if (!poll)
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "23444898429",
        }}
      >
        <img src={Loader} alt="Loading" />
      </div>
    );

  const chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            precision: 0,
            fontFamily: "Mulish",
            fontStyle: "500",
          },
          barPercentage: "0.4",
        },
      ],
      xAxes: [
        {
          type: "linear", // Bu satır eklenmiştir
          position: "bottom", // Bu satır eklenmiştir
          ticks: {
            beginAtZero: true,
            stepSize: 1, // Bu satır eklenmiştir
            precision: 0,
            fontFamily: "Mulish",
            fontStyle: "500",
          },
        },
      ],
    },
    legend: {
      labels: {
        fontFamily: "Mulish",
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div>
      <div className="logout_grid">
        <div>
          <h1 className="head_title animate__animated animate__fadeIn">
            {poll.title}{" "}
          </h1>
        </div>
        <div>
          <Button type="primary" onClick={handleLogout} className="btn_logout">
            {" "}
            Logout <LogoutOutlined />
          </Button>
        </div>
      </div>
      <Link to="/">
        <Button type="primary" className="create_btn">
          Create a new Poll
        </Button>
      </Link>
      <br />
      <ToastContainer newestOnTop autoClose={2000} />
      <div className="flex">
        <div className="options_div animate__animated animate__fadeInLeft">
          <h2>Select an Option</h2>
          {poll.questions.map((question, qIndex) => (
            <div
              key={qIndex}
              style={{
                flexGrow: "1",
                border: "1px solid #ccc",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                marginBottom: "10px",
              }}
            >
              <h2>{question.title}</h2>
              {question.options.map((option, oIndex) => (
                <div
                  key={oIndex}
                  className={`poll_live${
                    option.index === index ? "_selected" : ""
                  }`}
                  onClick={() => handleClick(qIndex, oIndex)}
                >
                  {option.title}
                </div>
              ))}
              {chartData[qIndex] && (
                <div className="graph animate__animated animate__fadeInRight">
                  <HorizontalBar
                    data={chartData[qIndex]}
                    options={chartOptions}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="share_icons animate__animated animate__fadeIn">
        <h3>
          Share this Poll <ShareAltOutlined />
        </h3>
        <br />
        <Input
          value={`https://survey-system-845b2.web.app/${poll.id}`}
          style={{ width: "15rem" }}
          disabled
        />
        <Button type="primary" onClick={handleURL}>
          Copy URL
        </Button>
      </div>
    </div>
  );
};

export default Poll;
