import { useEffect, useState } from "react";
import { IconCheck } from "@tabler/icons-react";
import { useLocation, Link } from "wouter";
import Dialog from "../../components/Dialog/Dialog.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Listbox from "../../components/Listbox/Listbox.jsx";
import Cube from "../../components/Cube/Cube.jsx";
import useGameState from "../../hooks/useGameState.js";
import useTheme from "../../hooks/useTheme.js";
import useDb from "../../hooks/useDb.js";
import revoke from "../../utilities/revoke.js";
import delete_document from "../../utilities/delete_document.js";
import load_document from "../../utilities/load_document.js";
import SCLobby from "./Lobby.styled.jsx";

export default function Lobby() {
  const sizes = [
    { value: 3, label: "3x3 - 9 pieces", id: "3x3" },
    { value: 4, label: "4x4 - 16 pieces", id: "4x4" },
    { value: 5, label: "5x5 - 25 pieces", id: "5x5" },
    { value: 6, label: "6x6 - 36 pieces", id: "6x6" },
    { value: 7, label: "7x7 - 49 pieces", id: "7x7" },
    { value: 8, label: "8x8 - 64 pieces", id: "8x8" },
    { value: 9, label: "9x9 - 81 pieces", id: "9x9" },
    { value: 10, label: "10x10 - 100 pieces", id: "10x10" },
  ];
  const [size, setSize] = useState(sizes[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTracking, setIsTracking] = useState(true);
  const [wantsToDelete, setWantsToDelete] = useState(false);
  const [document, setDocument] = useState(null);
  const [location, setLocation] = useLocation();
  const db = useDb();
  const gameState = useGameState();
  const theme = useTheme();
  const id = location.split("/")[3];
  const lines = new Array(size.value).fill(true);

  function set_size(id) {
    const size = sizes.find((size) => size.id === id);

    setSize(size);
    gameState.update_state({ key: "size", value: size.value });
  }

  function toggle_tracking(event) {
    const tracking = event.target.checked;

    setIsTracking(tracking);
    gameState.update_state({ key: "isTracking", value: tracking });
  }

  function open_deletion_dialog() {
    setWantsToDelete(true);
  }

  function close_deletion_dialog() {
    setWantsToDelete(false);
  }
  async function delete_image() {
    db.update_db({ key: "totalItems", value: db.totalItems - 1 });

    await delete_document(db.instance, db.store, document.id);

    setLocation("/slide_puzzle/");
  }

  useEffect(() => {
    async function get_document() {
      const document = await load_document(db.instance, db.store, id);

      setIsLoading(false);
      setDocument(document);
    }

    get_document();
  }, []);

  useEffect(() => () => revoke(document ? [document] : []), [document]);

  useEffect(() => {
    gameState.reset(3);
  }, []);

  return (
    <SCLobby className={theme.value}>
      {document && (
        <div className="document">
          <div className="set-up">
            <Listbox
              current={size}
              label="size:"
              options={sizes}
              change={set_size}
              tabIndex="0"
            />
            <label className="fs-bl ft-s">
              <span>track moves and time:</span>
              <span className="check">
                <input
                  type="checkbox"
                  checked={isTracking}
                  onChange={toggle_tracking}
                />
                <IconCheck />
              </span>
            </label>
          </div>
          <div className="controls">
            <Link
              className="fs-bl ft-d"
              to={`/slide_puzzle/game/${document.id}`}
            >
              Start Game!
            </Link>
            <button className="fs-bl ft-d" onClick={open_deletion_dialog}>
              Delete image
            </button>
          </div>
          <div className="preview">
            <img src={document.file} alt="document image" />
            <div className="verticals lines">
              {lines.map((_, index) => (
                <span
                  key={index}
                  className="line"
                  style={{ left: `${(100 * index) / lines.length}%` }}
                ></span>
              ))}
            </div>
            <div className="horizontals lines">
              {lines.map((_, index) => (
                <span
                  key={index}
                  className="line"
                  style={{ top: `${(100 * index) / lines.length}%` }}
                ></span>
              ))}
            </div>
          </div>
        </div>
      )}
      <Sidebar />
      <Dialog shown={isLoading}>
        <div className="loading">
          <Cube />
          <h2 className="fs-hm ft-d">Loading...</h2>
          <p className="fs-bl ft-d">Go back home if this takes too long.</p>
          <Link className="fs-hs ft-s" to="/slide_puzzle/">
            Home
          </Link>
        </div>
      </Dialog>
      <Dialog shown={wantsToDelete} close={close_deletion_dialog}>
        <div className="warning-screen">
          <h3 className="fs-hs ft-d">
            Do you really want to delete this image?
          </h3>
          <div className="buttons">
            <button className="fs-hs ft-s yes" onClick={delete_image}>
              Yes
            </button>
            <button className="fs-hs ft-s no" onClick={close_deletion_dialog}>
              No
            </button>
          </div>
        </div>
      </Dialog>
    </SCLobby>
  );
}
