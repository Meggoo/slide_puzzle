import { useEffect, useState } from "react";
import { IconCheck, IconChevronRight } from "@tabler/icons-react";
import useTheme from "../../hooks/useTheme";
import SCListbox from "./Listbox.styled";

export default function Listbox({ current, label, options, change }) {
  const [open, setOpen] = useState(false);
  const [initted, setInitted] = useState(false);
  const [candidate, setCandidate] = useState(current);
  const theme = useTheme();

  function select(event) {
    const optionEl = event.target.closest(".option");
    const id = optionEl.dataset.id;

    change(id);
    setOpen(false);
  }

  function toggle_list() {
    setOpen((prev) => !prev);
    setCandidate(current);
    setInitted(true);
  }

  function handle_mouse_enter(event) {
    const optionEl = event.target.closest(".option");
    const id = optionEl.dataset.id;

    setCandidate(options.find((option) => option.id === id));
  }

  function walk(dir, options, cond, set) {
    const currentIndex = options.findIndex((option) => cond(option));
    const candidateIndex = currentIndex + dir;
    let nextIndex;

    if (candidateIndex < 0) {
      nextIndex = options.length - 1;
    } else if (candidateIndex >= options.length) {
      nextIndex = 0;
    } else nextIndex = candidateIndex;
    set(options[nextIndex]);
  }

  function handle_key_press(event) {
    event.preventDefault();

    if (event.key === "Enter" || event.key === " ") {
      if (open) {
        change(candidate.id);
        setOpen(false);
      } else {
        setOpen(true);
        setCandidate(current);
        setInitted(true);
      }
    } else if (event.key === "ArrowUp") {
      if (open) {
        walk(
          -1,
          options,
          (option) => option.id === candidate.id,
          (option) => setCandidate(option)
        );
      } else {
        walk(
          -1,
          options,
          (option) => option.id === current.id,
          (option) => change(option.id)
        );
      }
    } else if (event.key === "ArrowDown") {
      if (open) {
        walk(
          1,
          options,
          (option) => option.id === candidate.id,
          (option) => setCandidate(option)
        );
      } else {
        walk(
          1,
          options,
          (option) => option.id === current.id,
          (option) => change(option.id)
        );
      }
    }
  }

  useEffect(() => {
    function handle_click(event) {
      if (!event.target.closest(".listbox")) setOpen(false);
    }

    window.addEventListener("click", handle_click);

    return () => window.removeEventListener("click", handle_click);
  }, []);

  return (
    <SCListbox className={`listbox ${theme.value}`}>
      <div
        className="current"
        tabIndex="0"
        onKeyDown={handle_key_press}
        onClick={toggle_list}
      >
        <p className="fs-bm ft-s">{label}</p>
        <p className="fs-bm ft-s">{current.label}</p>
        <span className={`chevron ${open && "open"}`}>
          <IconChevronRight />
        </span>
      </div>
      <div
        className={`options ${
          initted ? (open ? "open" : "closed") : "uninitted"
        }`}
      >
        {options.map((option) => (
          <div
            key={option.id}
            className={`option fs-bm ft-s ${
              candidate.id === option.id ? "candidate" : ""
            }`}
            data-id={option.id}
            onClick={select}
            onMouseEnter={handle_mouse_enter}
          >
            <span className={option.id === current.id ? "current-option" : ""}>
              <IconCheck />
            </span>
            <p>{option.label}</p>
          </div>
        ))}
      </div>
    </SCListbox>
  );
}
