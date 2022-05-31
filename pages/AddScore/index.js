import Navbar from "../components/Navbar";
import ScoreInput from "../components/ScoreInput";
import AuthContext from "../../store/auth-context";
import { useContext, useState } from "react";
import Hamburger from "../components/Hamburger";
import InputSelection from "../components/InputSelection";

function AddScore() {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <div>
      <Hamburger
        pageWrapId={"page-wrap"}
        outerContainerId={"outer-container"}
      />
      <Navbar />

      {isLoggedIn && <InputSelection />}
    </div>
  );
}

export default AddScore;
