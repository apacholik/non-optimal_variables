import "./styles_HomeView.css";
import NonOptimalVariables from "./NonOptimalVariables";
import LogerBox from "./LogerBox";

const HomeView = () => {
  return (
    <div className="homeView">
      <NonOptimalVariables />
      <br />
      <LogerBox />
    </div>
  );
};

export default HomeView;
