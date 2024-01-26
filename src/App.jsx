import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HelloyVite from "./components/HelloyVite/HelloyVite";
import sprite from "../src/images/svg/sprite.svg";
import HeaderLogo from "./components/HeaderLogo/HeaderLogo";

function App() {
  return (
    <>
      <HeaderLogo />
      <div>
        <HelloyVite />
        <svg width="40" height="40">
          <use href={`${sprite}#icon-wrench-screwdriver`} />
        </svg>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
    </>
  );
}

export default App;
