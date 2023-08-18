import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import {
  IconEyeClosed,
  IconEye,
  IconPlayerPlay,
  IconPlayerPause,
} from "@tabler/icons-react";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Dialog from "../../components/Dialog/Dialog.jsx";
import Stars from "../../components/Stars/Stars.jsx";
import PartyCard from "../../components/PartyCard/PartyCard.jsx";
import useGameState from "../../hooks/useGameState.js";
import useTheme from "../../hooks/useTheme.js";
import useDb from "../../hooks/useDb.js";
import load_document from "../../utilities/load_document.js";
import revoke from "../../utilities/revoke.js";
import shuffle from "../../utilities/shuffle.js";
import count_inversions from "../../utilities/count_inversions.js";
import format_time from "../../utilities/format_time.js";
import SCGame from "./Game.styled.jsx";
import Cube from "../../components/Cube/Cube.jsx";

export default function Game() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOver, setIsOver] = useState(false);
  const [tiles, setTiles] = useState([]);
  const [hole, setHole] = useState({ x: 0, y: 0 });
  const [tileWidth, setTileWidth] = useState(0);
  const [backgroundSize, setBackgroundSize] = useState(0);
  const [document, setDocument] = useState(null);
  const [isRunning, setIsRunning] = useState(true);
  const [time, setTime] = useState(0);
  const [moves, setMoves] = useState(0);
  const [seeing, setSeeing] = useState(true);
  const intervalRef = useRef(null);
  const boardRef = useRef(null);
  const [location] = useLocation();
  const gameState = useGameState();
  const db = useDb();
  const theme = useTheme();
  const id = location.split("/")[3];
  const formValue = format_time(time);
  const formTime = `${
    formValue.hours ? String(formValue.hours).padStart(2, "0") : ""
  }${formValue.hours ? ":" : ""}${String(formValue.minutes).padStart(
    2,
    "0"
  )}:${String(formValue.seconds).padStart(2, "0")}`;

  function handle_click(event) {
    const data = event.target.dataset;
    const { x, y, index } = data;
    const dist = (x - hole.x) * (x - hole.x) + (y - hole.y) * (y - hole.y);

    if (dist === 1) {
      const positions = tiles.map((tile) =>
        tile.index === Number(index)
          ? { ...tile, corner: { x: Number(hole.x), y: Number(hole.y) } }
          : tile
      );

      if (
        positions.every(
          (position) =>
            position.corner.x === position.origin.x &&
            position.corner.y === position.origin.y
        )
      ) {
        setIsOver(true);
        clearInterval(intervalRef.current);
      }
      setTiles(positions);
      setHole({ x, y });
      setMoves((prev) => prev + 1);
    }
  }

  function swap_tiles(i, j, tiles) {
    const tempCorner = { x: tiles[i].corner.x, y: tiles[i].corner.y };

    tiles[i].corner = { x: tiles[j].corner.x, y: tiles[j].corner.y };
    tiles[j].corner = tempCorner;
  }

  function init_board(size) {
    let tiles;

    tiles = [];

    for (let x = 0; x < size; x++)
      for (let y = 0; y < size; y++) {
        const index = x + y * size;
        const origin = { x, y };
        const corner = { x, y };

        tiles[index] = { index, corner, origin };
      }

    tiles = shuffle(tiles.slice(0, tiles.length - 1), swap_tiles);

    const inversions = count_inversions(
      tiles.map((tile) => tile.corner.x + size * tile.corner.y)
    );

    if (inversions % 2) swap_tiles(0, 1, tiles);

    return { tiles, hole: { x: size - 1, y: size - 1 } };
  }

  function handle_resize() {
    const board = boardRef.current;

    const boardBox = board.getBoundingClientRect();
    const tileWidth = boardBox.width / gameState.size;

    setBackgroundSize(boardBox.width);
    setTileWidth(tileWidth);
  }

  function pause() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  }

  function resume() {
    intervalRef.current = setInterval(() => setTime((prev) => prev + 1), 1000);
    setIsRunning(true);
  }

  function play_again() {
    const { tiles, hole } = init_board(gameState.size);

    resume();

    setTiles(tiles);
    setHole(hole);
    setTime(0);
    setMoves(0);
    setIsRunning(true);
    setIsOver(false);
    gameState.reset(gameState.size);
  }

  function unsee(event) {
    setSeeing(event.target.checked);
  }

  useEffect(() => {
    if (gameState.tiles.length) {
      setTiles(gameState.tiles);
      setHole(gameState.hole);
      setTime(gameState.time);
      setMoves(gameState.moves);
    } else {
      const { tiles, hole } = init_board(gameState.size);

      setHole(hole);
      setTiles(tiles);
    }

    resume();

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (!document) return;

    handle_resize();
    gameState.update_state({ key: "id", value: document.id });
  }, [document]);

  useEffect(() => {
    window.addEventListener("resize", handle_resize);

    return () => window.removeEventListener("resize", handle_resize);
  }, []);

  useEffect(() => {
    async function get_document() {
      const document = await load_document(db.instance, db.store, id);

      setIsLoading(false);
      setDocument(document);
    }

    get_document();
  }, []);

  useEffect(() => {
    gameState.update_state({ key: "time", value: time });
    gameState.update_state({ key: "moves", value: moves });
    gameState.update_state({ key: "tiles", value: tiles });
    gameState.update_state({ key: "hole", value: hole });
  }, [time, moves, tiles, hole]);

  useEffect(() => () => revoke(document ? [document] : []), [document]);

  return (
    <SCGame className={theme.value}>
      {gameState.isTracking && (
        <div className={`tracking ${seeing ? "" : "not-seeing"}`}>
          <div className={`timer fs-bl ft-s ${seeing ? "" : "hidden"}`}>
            <button onClick={pause}>
              {isRunning ? <IconPlayerPause /> : <IconPlayerPlay />}
            </button>
            time: {formTime}
          </div>
          <label className={`eye ${theme.value} ${seeing ? "" : "closed"}`}>
            <input type="checkbox" checked={seeing} onChange={unsee} />
            {seeing ? <IconEye /> : <IconEyeClosed />}
          </label>
          <div className={`moves fs-bl ft-s ${seeing ? "" : "hidden"}`}>
            moves: {moves}
          </div>
        </div>
      )}
      {document && (
        <div className="board" ref={boardRef}>
          {tiles.map((tile) => (
            <span
              key={tile.index}
              className="tile"
              style={{
                backgroundImage: `url(${document.file})`,
                backgroundSize: `${backgroundSize}px ${backgroundSize}px`,
                backgroundPosition: `${-1 * tile.origin.x * tileWidth}px ${
                  -1 * tile.origin.y * tileWidth
                }px`,
                width: `${tileWidth}px`,
                height: `${tileWidth}px`,
                top: `${(100 * tile.corner.y) / gameState.size}%`,
                left: `${(100 * tile.corner.x) / gameState.size}%`,
              }}
              onClick={handle_click}
              data-x={tile.corner.x}
              data-y={tile.corner.y}
              data-index={tile.index}
            ></span>
          ))}
        </div>
      )}
      <Dialog shown={isLoading} classes={["top-dialog"]}>
        <div className="loading">
          <Cube />
          <h2 className="fs-hm ft-d">Loading...</h2>
          <p className="fs-bl ft-d">Go back home if this takes too long.</p>
          <Link className="fs-hs ft-s" to="/slide_puzzle/">
            Home
          </Link>
        </div>
      </Dialog>
      <Dialog shown={!isRunning} close={resume} classes={["bottom-dialog"]}>
        <div className="pause-screen">
          <h2 className="fs-hl ft-d">Paused</h2>
          <button className="fs-hs ft-s" onClick={resume}>
            RESUME
          </button>
        </div>
      </Dialog>
      <Dialog shown={isOver} classes={["top-dialog"]}>
        <Stars totalStars={5}>
          <PartyCard>
            <h1 className="fs-hm ft-d">
              Congratulations, you've completed the puzzle!
            </h1>
            {gameState.isTracking && (
              <p className="fs-bm ft-s">
                you finished in {formTime} with {moves} moves
              </p>
            )}
            <div className="is-over-buttons">
              <button className="fs-bl ft-s" onClick={play_again}>
                Play again!
              </button>
              <Link className="fs-bl ft-s" to="/slide_puzzle/">
                Home
              </Link>
            </div>
          </PartyCard>
        </Stars>
      </Dialog>
      <Sidebar
        pause={pause}
        resume={resume}
        style={{ zIndex: 2 }}
        classes={["sidebar"]}
      />
    </SCGame>
  );
}
