// App.js

import React, { useEffect, useRef, useState } from "react";
import "./App.css";
// import { useNavigate } from "react-router-dom";

function App() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
  const letter_count = useRef(0);
  const el = useRef(null);
  const word = useRef("");
  const finished = useRef(false);
  const incrementer = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  // const navigate = useNavigate();

  // const submitHandler = async (event) => {
  //   event.preventDefault();

  //   try {
  //     navigate("/contact"); // Omit optional second argument
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    el.current = document.getElementById("loading");
    word.current = el.current.innerHTML.trim();

    el.current.innerHTML = "";
    for (let i = 0; i < word.current.length; i++) {
      el.current.innerHTML += word.current.charAt(i);
    }

    setTimeout(() => write(), 75);
    incrementer.current = setTimeout(() => {
      setIsLoading(false);
      inc();
    }, 1000);

    return () => {
      clearTimeout(incrementer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function write() {
    // Add a check to see if the component is still mounted
    if (!el.current) {
      return;
    }

    for (let i = letter_count.current; i < word.current.length; i++) {
      const c = Math.floor(Math.random() * alphabet.length);
      const span = document.createElement("span");
      span.innerHTML = alphabet[c];

      if (el.current.childNodes[i]) {
        el.current.replaceChild(span, el.current.childNodes[i]);
      } else {
        el.current.appendChild(span);
      }
    }

    if (!finished.current) {
      // Check if the component is still mounted before invoking write again
      if (el.current) {
        setTimeout(() => write(), 100);
      }
    } else {
      // Only set isLoading to true if the component is still mounted
      if (el.current) {
        setIsLoading(false);
        reset(); // Reset the animation after setting isLoading to true
      }
    }
  }

  function inc() {
    const currentSpan = el.current.childNodes[letter_count.current];

    if (currentSpan) {
      currentSpan.innerHTML = word.current[letter_count.current];
      currentSpan.classList.add("glow");
      letter_count.current++;

      if (letter_count.current >= word.current.length) {
        finished.current = true;
        // setTimeout(() => reset(), 1500); // Removed this line
      } else {
        setTimeout(() => inc(), 1000);
      }
    }
  }

  function reset() {
    letter_count.current = 0;
    finished.current = false;
    setTimeout(() => {
      // Check if the component is still mounted before setting the state
      if (el.current) {
        inc();
      }
    }, 100);
    setTimeout(() => write(), 75);
    el.current.childNodes.forEach((span) => span.classList.remove("glow"));
  }

  return (
    <>
      <div
        id="loading"
        style={{ visibility: isLoading ? "visible" : "hidden" }}
      >
        LOADING
      </div>
      <div
        className="App"
        style={{ visibility: isLoading ? "hidden" : "visible" }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ color: "rgb(50, 228, 50)", margin: 0 }}>
            Cicada the IT club
          </div>
          <a href="https://forms.gle/89yXS3jMxDhwLLen6">
            <button
              /* onClick={submitHandler} */
              className="contactButton"
            >
              Apply
            </button>
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
