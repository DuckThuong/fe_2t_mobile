import Navbar from "../HeaderWeb";
import { HomeHeader } from "./HomeHeader";

export const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <HomeHeader />
    </div>
  );
};
