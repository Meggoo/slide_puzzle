import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import SCInfo from "./Info.styled.jsx";

export default function Info() {
  return (
    <SCInfo>
      <a
        className="underlined fs-hs ft-s"
        href="https://github.com/Meggoo/slide_puzzle"
        target="_blank"
      >
        By @Meggoo
      </a>
      <Sidebar />
    </SCInfo>
  );
}
