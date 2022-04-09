import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Hamburger from "./components/Hamburger";


export default function Home() {
  return (
    <div id="outer-container">
      <div id="page-wrap">
        <Hamburger pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <Navbar />
        <Dashboard />
      </div>
    </div>
  )
}
