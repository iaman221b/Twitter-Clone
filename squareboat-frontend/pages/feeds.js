import Feeds from "../components/Feeds";
import Header from "../components/common/Header";
import HigherOrderComponent from "../components/common/Auth";

const feeds = () => {
  const _Feed = () => {
    return (
      <div>
        <Header />
        <Feeds />
      </div>
    );
  };

  const HOCWRAP = HigherOrderComponent(_Feed);

  return (
    <div>
      <HOCWRAP />
    </div>
  );
};

export default feeds;
