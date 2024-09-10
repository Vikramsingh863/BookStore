import {BrowserRouter, Routes, Route} from "react-router-dom"
import Header from "./Component/Header"
import History from "./Component/History.jsx";
import Home from "./Component/Home";

function App(){


    return(
       
        <BrowserRouter>
         <Header/> 
            <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/history' element={<History/>}/>
            </Routes>
        </BrowserRouter>
        
        
    )
}
export default App;
