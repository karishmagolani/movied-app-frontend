import { Button } from "@material-ui/core";
import React, { useState } from "react";
import Logo from "../../assets/logo.svg";
import LoginModal from "../Authentication/LoginModal";
import { API_URL } from "../../constants";

const Header = ({ showBookShowButton = false, isLoggedIn, id }) => {
  //states
  const [isModalOpen, setIsModalOpen] = useState(false); //to handle login modal

  //handlers
  const handleOnCloseModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  const handleLogoutClick = () => {
    const token = window.localStorage["access-token"];
    fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        Accept: "application/json;charset=UTF-8",
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          window.localStorage.removeItem("access-token");
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };
  const handleOnBookShowClick = () => {
    if (isLoggedIn) {
      window.location.href = `/bookshow/${id}`;
    } else {
      openModal();
    }
  };

  return (
    <div className="header">
      <div className="logo">
        <img src={Logo} alt={"logo"} height="35px" />
      </div>

      <div className="header-button-group">
        {showBookShowButton && (
          <Button
            style={{ marginRight: "5px" }}
            variant="contained"
            color="primary"
            onClick={handleOnBookShowClick}
          >
            Book Show
          </Button>
        )}
        {isLoggedIn ? (
          <Button variant="contained" onClick={handleLogoutClick}>
            Logout
          </Button>
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
