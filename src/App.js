// App.js

import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
  const letter_count = useRef(0);
  const el = useRef(null);
  const word = useRef("");
  const finished = useRef(false);
  const incrementer = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

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
    }, 2000);

    return () => {
      clearTimeout(incrementer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function write() {
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
      setTimeout(() => write(), 75);
    } else {
      setTimeout(() => setIsLoading(true), 3000); // Increase the delay to make it last for 3 seconds
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
        setTimeout(() => reset(), 1500);
      } else {
        setTimeout(() => inc(), 1000);
      }
    }
  }

  function reset() {
    letter_count.current = 0;
    finished.current = false;
    setTimeout(() => {
      setIsLoading(true); // Show "Loading" section before resetting
      inc();
    }, 100);
    setTimeout(() => write(), 75);
    el.current.childNodes.forEach((span) => span.classList.remove("glow"));
  }

  return (
    <>
      <div id="loading" style={{ visibility: isLoading ? "visible" : "hidden" }}>
        LOADING
      </div>
      <div className="App" style={{ visibility: isLoading ? "hidden" : "visible" }}>
        Club name
      </div>
    </>
  );
}

export default App;
