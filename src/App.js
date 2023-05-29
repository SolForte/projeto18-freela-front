import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import PassagensParaCidade from "./pages/PassagensParaCidade.js";
import DetalhesPassagem from "./pages/DetalhesPassagem.js";
import HospedagensEmCidade from "./pages/HospedagensEmCidade.js";
import DetalhesDaHospedagem from "./pages/DetalheDaHospedagem.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cidades/:id/passagens" element={<PassagensParaCidade />} />
        <Route path="/passagens/:id" element={<DetalhesPassagem />} />
        <Route path="/cidades/:id/hospedagens" element={<HospedagensEmCidade />} />
        <Route path="/hospedagens/:id" element={<DetalhesDaHospedagem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
