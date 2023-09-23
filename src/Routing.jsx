import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Empresas from "./views/Empresas";
import Historia from "./views/Historia";
import Acciones from "./views/Acciones";

export default function Routing(){
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<App/>}/>
          <Route path={'/empresas'} element={<Empresas/>}/>
          <Route path={'/historia'} element={<Historia/>}/>
          <Route path={'/acciones'} element={<Acciones/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}