import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";

function Navbar() {
  const router = useRouter();

  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logOutHandler = () => {
    router.replace("/");
    authCtx.logout();
  };

  return (
    <div className="navbar">
      <div>
        <Link href="/">
          <a className="navLink logo">Golf Score App</a>
        </Link>
      </div>

      {isLoggedIn && (
        <div>
          <Link href="/AddScore">
            <a className="navLink">Add Score</a>
          </Link>
          <Link href="/ViewScores">
            <a className="navLink">View My Scores</a>
          </Link>
          <Link href="/ViewStats">
            <a className="navLink">View My Stats</a>
          </Link>
          <Link href="/ViewPublishedRounds">
            <a className="navLink">View Published Scores</a>
          </Link>

          <Button variant="primary" onClick={logOutHandler} className="logout">
            Logout
          </Button>
        </div>
      )}

      {!isLoggedIn && (
        <div>
          <Link href="./">
            <a className="navLink">Login</a>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
