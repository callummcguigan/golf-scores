import Navbar from "../components/Navbar";
import AuthContext from "../../store/auth-context";
import { useContext, useEffect, useState } from "react";
import Hamburger from "../components/Hamburger";
import Stats from "../components/Stats";

function ViewStats(props) {
  const authCtx = useContext(AuthContext);
  const [userId, setUserId] = useState();

  const isLoggedIn = authCtx.isLoggedIn;

  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAhtJKjKn1JstR6g8QT221oxblZOUv2rkQ",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const checkName = data.users[0].displayName;
        console.log(data.users[0]);

        if (checkName != undefined) {
          setUserId(data.users[0].localId);
        }
      });
  }, []);

  return (
    <div>
      <Hamburger
        pageWrapId={"page-wrap"}
        outerContainerId={"outer-container"}
      />
      <Navbar />

      {isLoggedIn && <Stats userId={userId} />}
    </div>
  );
}

export default ViewStats;
