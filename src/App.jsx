import { Route, Switch, Link } from "wouter";
import { useEffect } from "react";
import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
import Lobby from "./pages/Lobby/Lobby";
import Info from "./pages/Info/Info";
import useTheme from "./hooks/useTheme";
import useDb from "./hooks/useDb";
import count_items from "./utilities/count_items";
import SCApp from "./App.styled";
import "./style.css";

function App() {
  const db = useDb();
  const theme = useTheme();

  useEffect(() => {
    function load_theme() {
      let value;

      value = localStorage.getItem(theme.key);

      if (!value) {
        value = theme.themes.dark;

        localStorage.setItem(theme.key, value);
      }

      theme.set_theme(value);
    }

    load_theme();
  }, []);

  useEffect(() => {
    const openRequest = indexedDB.open(db.name, 1);

    openRequest.addEventListener("upgradeneeded", () => {
      const instance = openRequest.result;
      const store = instance.createObjectStore(db.store, { keyPath: "id" });

      store.createIndex(db.index, "timestamp");
    });

    openRequest.addEventListener("success", async () => {
      const instance = openRequest.result;
      const totalItems = await count_items(instance, db.store);

      db.update_db({ key: "instance", value: instance });
      db.update_db({ key: "totalItems", value: totalItems });
    });

    openRequest.addEventListener("error", () => {
      console.log("couldn't open db!");
    });
  }, []);

  return (
    <SCApp className={`${theme.value}`}>
      <Switch>
        <Route path="/slide_puzzle/">
          <Home />
        </Route>
        <Route path="/slide_puzzle/lobby/:id">
          <Lobby />
        </Route>
        <Route path="/slide_puzzle/game/:id">
          <Game />
        </Route>
        <Route path="/slide_puzzle/info">
          <Info />
        </Route>
        <Route>
          <div className="not-found">
            <div className="content">
              <h1 className="fs-hl ft-s">404</h1>
              <Link className="fs-hs ft-s underlined" to="/slide_puzzle/">Home</Link>
            </div>
          </div>
        </Route>
      </Switch>
    </SCApp>
  );
}

export default App;
