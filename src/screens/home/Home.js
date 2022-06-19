import React from "react";
import Header from "../../common/header/Header";

const Home = ({ isLoggedIn }) => {
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <div className="title">Upcoming Movies</div>
    </div>
  );
};

export default Home;
