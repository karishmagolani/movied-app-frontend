import React, { useEffect, useState } from "react";
import Home from "../screens/home/Home";
import Details from "../screens/details/Details";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BookShow from "../screens/bookshow/BookShow";
import Confirmation from "../screens/confirmation/Confirmation";

const Controller = () => {
  const baseUrl = "/api/v1/";

  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    if (window.localStorage["access-token"]) setisLoggedIn(true);
  }, [window.localStorage["access-token"]]);

  return (
    <Router>
      <div className="main-container">
        <Route
          exact
          path="/"
          render={(props) => (
            <Home {...props} baseUrl={baseUrl} isLoggedIn={isLoggedIn} />
          )}
        />
        <Route
          path="/movie/:id"
          render={(props) => (
            <Details {...props} baseUrl={baseUrl} isLoggedIn={isLoggedIn} />
          )}
        />
        <Route
          path="/bookshow/:id"
          render={(props) => (
            <BookShow {...props} baseUrl={baseUrl} isLoggedIn={isLoggedIn} />
          )}
        />
        <Route
          path="/confirm/:id"
          render={(props) => (
            <Confirmation
              {...props}
              baseUrl={baseUrl}
              isLoggedIn={isLoggedIn}
            />
          )}
        />
      </div>
    </Router>
  );
};

export default Controller;
