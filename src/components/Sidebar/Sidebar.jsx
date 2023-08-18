import { useState } from "react";
import { Link, useLocation } from "wouter";
import { IconMenu2, IconX, IconBulb, IconBulbOff } from "@tabler/icons-react";
import useGameState from "../../hooks/useGameState.js";
import Toggle from "../Toggle/Toggle.jsx";
import useTheme from "../../hooks/useTheme.js";
import SCSidebar from "./Sidebar.styled.jsx";

export default function Sidebar({ open_dialog, pause, resume, classes = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const gameState = useGameState();
  const theme = useTheme();
  const homeReg = /^\/slide_puzzle\/?$/;
  const lobbyReg = /\/lobby\//;
  const gameReg = /\/game\//;
  const infoReg = /\/info$/;
  const isHome = homeReg.test(location);
  const isLobby = lobbyReg.test(location);
  const isGame = gameReg.test(location);
  const isInfo = infoReg.test(location);

  function toggle_theme(newTheme) {
    theme.set_theme(newTheme);
    localStorage.setItem(theme.key, newTheme);
  }

  function open() {
    if (isGame) pause();
    setIsOpen(true);
  }

  function close() {
    if (isGame) resume();
    setIsOpen(false);
  }

  return (
    <SCSidebar
      className={` ${classes.join(" ")} ${isOpen ? "open" : ""} ${theme.value}`}
    >
      <div className="sidebar-backdrop" onClick={close}></div>
      <div className="sidebar-content">
        <button
          className="sidebar-toggle control"
          onClick={isOpen ? close : open}
        >
          {isOpen ? <IconX /> : <IconMenu2 />}
        </button>
        <div className="top">
          {isHome && (
            <button className="fs-bl ft-s" onClick={open_dialog}>
              Add Image
            </button>
          )}
          {isGame && gameState.isTracking && (
            <button className="fs-bl ft-s" onClick={close}>
              Resume Game
            </button>
          )}
          {isInfo && gameState.tiles.length ? (
            <Link
              className="fs-bl ft-s"
              to={`/slide_puzzle/game/${gameState.id}`}
            >
              Back to Game
            </Link>
          ) : null}
        </div>
        <div className="bottom">
          {isHome && (
            <div className="links">
              <Link className="fs-hs ft-d underlined" to="/slide_puzzle/info">
                Info
              </Link>
            </div>
          )}
          {isLobby && (
            <div className="links">
              <Link className="fs-hs ft-d underlined" to="/slide_puzzle/">
                Home
              </Link>
              <Link className="fs-hs ft-d underlined" to="/slide_puzzle/info">
                Info
              </Link>
            </div>
          )}
          {isGame && (
            <div className="links">
              <Link className="fs-hs ft-d underlined" to="/slide_puzzle/">
                Home
              </Link>
              <Link className="fs-hs ft-d underlined" to="/slide_puzzle/info">
                Info
              </Link>
            </div>
          )}
          {isInfo && (
            <div className="links">
              <Link className="fs-hs ft-d underlined" to="/slide_puzzle/">
                Home
              </Link>
            </div>
          )}
          <Toggle
            icons={[<IconBulb />, <IconBulbOff />]}
            choice={theme.value}
            options={[theme.themes.light, theme.themes.dark]}
            toggle={toggle_theme}
          />
        </div>
      </div>
    </SCSidebar>
  );
}
