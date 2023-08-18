import { useState, useEffect } from "react";
import SCDialog from "./Dialog.styled";
import useTheme from "../../hooks/useTheme";

export default function Dialog({
  children,
  shown,
  close,
  duration = 0.33,
  classes = [],
}) {
  const [hasContent, setHasContent] = useState(shown);
  const theme = useTheme();

  useEffect(() => {
    if (shown) return setHasContent(true);

    const timerId = setTimeout(() => setHasContent(false), 1000 * duration);

    return () => clearTimeout(timerId);
  }, [shown]);

  return (
    <SCDialog
      className={` ${classes.join(" ")} ${shown ? "shown" : "hidden"} ${
        theme.value
      }`}
      style={{ "--duration": `${duration}s` }}
    >
      <div className="dialog-backdrop" onClick={close ? close : null}></div>
      <div className="dialog-container">{hasContent ? children : null}</div>
    </SCDialog>
  );
}
