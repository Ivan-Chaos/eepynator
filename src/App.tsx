import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import classes from "./styles.module.scss";
import axios from "axios";
import { click } from "@testing-library/user-event/dist/click";

function App() {
  const [kittyUrl, setKittyUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [clickCount, setClickCount] = useState<number>(0);

  function delay(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const catFetcher = async () => {
    setIsLoading(true);
    if (clickCount * 1000 < 2000) await delay(2000 - clickCount * 100);
    const response = await axios.get("https://cataas.com/cat?json=true");
    setIsLoading(false);
    setKittyUrl("https://cataas.com/" + response.data.url);
  };

  useEffect(() => {
    catFetcher();
  }, []);

  return (
    <div className="App">
      <div className={classes.mainBody}>
        <div className={classes.content}>
          <header>
            <img src="https://static.vecteezy.com/system/resources/thumbnails/009/665/315/small/group-of-cute-kitty-cat-family-greeting-cartoon-png.png" />
            <h1>Welcome to a kitty helper</h1>
            <p>
              A lil website designed to help you by throwing random kitties at  ˓˓ก₍⸍⸌̣ʷ̣̫⸍̣⸌₎ค˒˒
            </p>
          </header>
          <body>
            <div className={classes.kittyImageWrapper}>
              {!isLoading && (
                <img src={kittyUrl} className={classes.kittyImage} />
              )}
              {isLoading && (
                <img
                  src={
                    "https://media1.giphy.com/media/mFTRCmlZgMEr5CHmOV/giphy.gif?cid=790b7611d2a0f9633d7959716ea99e9b5eaaf30dfbbe8dec&rid=giphy.gif&ct=s"
                  }
                  className={classes.loader}
                />
              )}
            </div>

            <button onClick={catFetcher} className={classes.kittyButton}>
              Another one!!!
            </button>
          </body>
        </div>
      </div>
    </div>
  );
}

export default App;
