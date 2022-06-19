import { Button } from "@material-ui/core";
import React, { useState } from "react";
import Logo from "../../assets/logo.svg";
import LoginModal from "../Authentication/LoginModal";

const Header = ({ showBookShowButton = false, isLoggedIn }) => {
  //states
  const [isModalOpen, setIsModalOpen] = useState(false); //to handle login modal

  //handlers
  const handleOnCloseModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  console.log("---------->", isLoggedIn);

  return (
    <div className="header">
      <div className="logo">
        <img src={Logo} alt={"logo"} height="35px" />
      </div>
      {showBookShowButton && (
        <div>
          <Button variant="contained">Book Show</Button>
        </div>
      )}
      <div className="login-btn">
        {isLoggedIn ? (
          <Button variant="contained">Logout</Button>
        ) : (
          <Button variant="contained" onClick={openModal}>
            Login
          </Button>
        )}
      </div>
      <LoginModal open={isModalOpen} handleClose={handleOnCloseModal} />
    </div>
  );
};

export default Header;
