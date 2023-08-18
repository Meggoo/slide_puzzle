import { useState, useEffect } from "react";
import { Link } from "wouter";
import {
  IconChevronsLeft,
  IconChevronLeft,
  IconChevronsRight,
  IconChevronRight,
} from "@tabler/icons-react";
import Dialog from "../../components/Dialog/Dialog.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Form from "../../components/Form/Form.jsx";
import useDb from "../../hooks/useDb.js";
import useTheme from "../../hooks/useTheme.js";
import useGameState from "../../hooks/useGameState.js";
import get_indices from "../../utilities/get_indices.js";
import load_items from "../../utilities/load_items.js";
import save_document from "../../utilities/save_document.js";
import revoke from "../../utilities/revoke.js";
import umu from "../../assets/umu.png";
import SCHome from "./Home.styled.jsx";

export default function Home() {
  const [page, setPage] = useState(1);
  const [indices, setIndices] = useState([]);
  const [items, setItems] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const db = useDb();
  const gameState = useGameState();
  const theme = useTheme();
  const itemsPerPage = 5;
  const maxPages = 5;
  const firstPage = 1;
  const lastPage = Math.ceil(db.totalItems / itemsPerPage);

  function open_dialog() {
    setIsUploading(true);
  }

  async function save_image(file) {
    const id = crypto.randomUUID();
    const timestamp = new Date().valueOf();

    await save_document(db.instance, db.store, { id, timestamp, file });

    const newTotal = db.totalItems + 1;
    const totalPages = Math.ceil(newTotal / itemsPerPage);
    const newItems = await load_items(
      db.instance,
      db.store,
      db.index,
      page,
      itemsPerPage
    );
    const indices = get_indices(page, totalPages, maxPages);

    setItems(newItems);
    setIndices(indices);
    setIsUploading(false);
    db.update_db({ key: "totalItems", value: db.totalItems + 1 });
  }

  async function go_to(event) {
    const page = Number(event.target.dataset.page);
    const newItems = await load_items(
      db.instance,
      db.store,
      db.index,
      page,
      itemsPerPage
    );
    const totalPages = Math.ceil(db.totalItems / itemsPerPage);
    const indices = get_indices(page, totalPages, maxPages);

    setIndices(indices);
    setItems(newItems);
    setPage(page);
  }

  useEffect(() => {
    function init_indices() {
      const totalPages = Math.ceil(db.totalItems / itemsPerPage);
      const indices = get_indices(1, totalPages, maxPages);

      setIndices(indices);
    }

    async function init_items() {
      const items = await load_items(
        db.instance,
        db.store,
        db.index,
        1,
        itemsPerPage
      );

      setItems(items);
    }

    async function init() {
      init_indices();

      try {
        await init_items();
      } catch (error) {
        console.log("error initializing items!");
      }
    }

    if (db.instance) init();
  }, [db.instance]);

  useEffect(() => {
    gameState.reset(3);
  }, []);

  useEffect(() => () => revoke(items), [items]);

  return (
    <SCHome className={`${theme.value}`}>
      {indices.length ? (
        <div className="images">
          {items.map((item) => (
            <Link key={item.id} to={`/slide_puzzle/lobby/${item.id}`}>
              <img src={item.file} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="get-started">
          <img src={umu} alt="UmU" />
          <p className="fs-bl ft-d">
            There doens't seem to be anything here, you can get started by
            loading an image.
          </p>
          <button className="fs-hs ft-s" onClick={open_dialog}>
            Open File Picker
          </button>
        </div>
      )}
      {indices.length && (
        <div className="indices">
          <button
            disabled={page === firstPage}
            data-page={firstPage}
            onClick={go_to}
          >
            <IconChevronsLeft />
          </button>
          <button
            disabled={page === firstPage}
            data-page={page - 1}
            onClick={go_to}
          >
            <IconChevronLeft />
          </button>
          {indices.map((index) => (
            <button
              className="fs-bm ft-d"
              key={index}
              onClick={go_to}
              data-page={index}
              disabled={index === page}
            >
              {index}
            </button>
          ))}
          <button
            disabled={page === lastPage}
            data-page={page + 1}
            onClick={go_to}
          >
            <IconChevronRight />
          </button>
          <button
            disabled={page === lastPage}
            data-page={lastPage}
            onClick={go_to}
          >
            <IconChevronsRight />
          </button>
        </div>
      )}
      <Sidebar open_dialog={open_dialog} />
      <Dialog shown={isUploading} close={() => setIsUploading(false)}>
        <Form save_image={save_image} />
      </Dialog>
    </SCHome>
  );
}
