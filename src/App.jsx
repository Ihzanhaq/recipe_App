import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import About from "./pages/About";
import PNF from "./pages/PNF";
import Admin from "./pages/Admin";

function App() {
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(180deg, hsl(35 40% 98%), hsl(35 35% 95%))",
      }}
    >
      <Header />
      <div style={{ marginTop: "120px" }}>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/recipes" Component={Recipes} />
          <Route path="/about" Component={About} />
          <Route path="/admin" Component={Admin} />
          <Route path="/*" Component={PNF} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
