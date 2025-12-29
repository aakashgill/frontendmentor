import { useState } from "react";

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function setDarkTheme() {
    if (document && document.body) {
      document.body.classList.toggle('dark-theme');
    }
    setIsDarkMode(!isDarkMode)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1>Where in the world?</h1>
          <button onClick={() => setDarkTheme()}>
            {isDarkMode ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      </div>
    </header>
  )
}
export default Header;