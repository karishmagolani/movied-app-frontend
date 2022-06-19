import React from "react";
import Header from "../../common/header/Header";

const Home = ({ isLoggedIn }) => {
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default Home;
