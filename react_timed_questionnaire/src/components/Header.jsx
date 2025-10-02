import imgLogo from "../assets/quiz-logo.png";

function Header() {
  return (
    <header>
      <img src={imgLogo} alt="a simple quiz logo image"></img>
      <h1>React Timed Quiz</h1>
    </header>
  );
}

export default Header;
