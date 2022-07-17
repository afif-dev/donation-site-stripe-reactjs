import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.scss";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Pages from "./pages/Pages";
import Error404 from "./pages/Error404";
import Payment from "./pages/Payment";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/credits" element={<Pages mdpath="./md/credits.md" />} />
          <Route path="/terms" element={<Pages mdpath="./md/terms.md" />} />
          <Route path="/payment/:status" element={<Payment />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
