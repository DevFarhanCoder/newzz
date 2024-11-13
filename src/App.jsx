import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import LoadingBar from "react-top-loading-bar";

export default function App() {
  const [category, setCategory] = useState("business");
  const [country, setCountry] = useState("us");
  const [mode, setMode] = useState("light");
  const [progress, setProgress] = useState(10);
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  function handleCategoryChange(category) {
    setCategory(category);
  }

  function handleCountryChange(country) {
    setCountry(country);
  }
  function switchMode() {
    if (mode == "light") {
      setMode("dark");
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      setMode("light");
      document.documentElement.setAttribute("data-bs-theme", "light");
    }
  }
  function changeProgress(num) {
    setProgress(num);
  }

  useEffect;
  return (
    <>
      <div>
        <LoadingBar
          color="#f11946"
          progress={progress}
          height={3}
          onLoaderFinished={() => setProgress(0)}
        />
      </div>
      <Navbar
        setCategory={handleCategoryChange}
        setCountry={handleCountryChange}
        country={country}
        toggleMode={switchMode}
        mode={mode}
      ></Navbar>
      <News
        pageSize={15}
        country={country}
        category={category}
        mode={mode}
        changeProgress={changeProgress}
        apiKey={apiKey}
      ></News>
    </>
  );
}
