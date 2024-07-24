import { useState, useEffect } from "react";
import Username from "./components/Username";
import "./App.css";
import { PropTypes } from "prop-types";

Username.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

function App() {
  const [cardData, setcardData] = useState([
    {
      name: "Person 1",
      content:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero animi, quisquam eaque, vitae sequi cumque dolor saepe totam blanditiis delectus reprehenderit voluptatem, iure dicta perferendis officiis hic? Tempore, commodi enim?",
    },
    {
      name: "Person 2",
      content:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero animi, quisquam eaque, vitae sequi cumque dolor saepe totam blanditiis delectus reprehenderit voluptatem, iure dicta perferendis officiis hic? Tempore, commodi enim?",
    },
    {
      name: "Person 3",
      content:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero animi, quisquam eaque, vitae sequi cumque dolor saepe totam blanditiis delectus reprehenderit voluptatem, iure dicta perferendis officiis hic? Tempore, commodi enim?",
    },
  ]);

  useEffect(
    () => {
      setTimeout(
        setcardData([
          ...cardData,
          { name: "Card Title 4", content: "This is the fourth card." },
        ])
      );
    },
    200,
    []
  );

  return (
    <>
      <div className="App">
        <div className="card-container">
          {cardData.map((username, index) => (
            <Username
              key={index}
              name={username.name}
              content={username.content}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
