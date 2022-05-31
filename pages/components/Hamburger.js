import React from "react";
import { slide as Menu } from "react-burger-menu";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";

function Hamburger() {
  const router = useRouter();

  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logOutHandler = () => {
    router.replace("/");
    authCtx.logout();
  };

  return (
    <div className="hideUnlessMobile">
      {isLoggedIn && (
        <Menu>
          <Link href="/">
            <a className="bm-item menu-item">Home</a>
          </Link>
          <Link href="/AddScore">
            <a className="bm-item menu-item">Add Score</a>
          </Link>

          <Link href="/ViewStats">
            <a className="bm-item menu-item">View Stats</a>
          </Link>
          <Link href="/ViewPublishedRounds">
            <a className="bm-item menu-item">View Published Scores</a>
          </Link>
          <Button variant="primary" onClick={logOutHandler} className="logout">
            Logout
          </Button>
        </Menu>
      )}
    </div>
  );
}

export default Hamburger;
