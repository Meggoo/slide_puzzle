import useTheme from "../../hooks/useTheme.js";
import SCPartyCard from "./PartyCard.styled.jsx";

export default function PartyCard({ children }) {
  const theme = useTheme();

  return (
    <SCPartyCard className={theme.value}>
      <span className="party-background"></span>
      <div className="party-container">{children}</div>
    </SCPartyCard>
  );
}
