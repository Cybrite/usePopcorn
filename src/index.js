import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import AppV2 from "./AppV2"
// import StarRating from "./StarRating";

// function Test() {
//   const [movieRated, setMovieRated] = useState(0);

//   return (
//     <div>
//       <StarRating color="blue" maxRating={10} onSetRating={setMovieRated} />
//       <p>This movie was Rated {movieRated} </p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppV2 />
    {/* <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    />
    <StarRating
      maxRating={5}
      size={25}
      color="red"
      className="test"
      defaultRating={3}
    />

    <Test /> */}
  </React.StrictMode>
);
