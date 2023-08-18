import { useEffect, useRef } from "react";
import useVisibility from "../../hooks/useVisibility";
import add_star from "./utilities/add_star";
import SCStars from "./Stars.styled";

export default function Stars({ children, totalStars }) {
  const containerRef = useRef(null);
  const intervalIdRef = useRef(null);
  const visible = useVisibility();

  useEffect(() => {
    if (!visible) clearInterval(intervalIdRef.current);
    else
      intervalIdRef.current = setInterval(() => {
        for (let i = 0; i < totalStars; i++) add_star(containerRef.current);
      }, 1000);

    return () => clearInterval(intervalIdRef.current);
  }, [visible]);

  return <SCStars ref={containerRef}>{children}</SCStars>;
}
