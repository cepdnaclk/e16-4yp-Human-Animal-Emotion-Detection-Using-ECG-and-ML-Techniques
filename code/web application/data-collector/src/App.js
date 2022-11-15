import './App.css';
import Register from "./components/registrationComponent";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HeaderBar from "./components/headerComponent";
import SelectVideo from "./components/selectVideoComponent";
import PlayVideo from "./components/playWindowComponent";
import FeedbackForm from "./components/feedbackComponent";


function App() {
    return (
        <div >
            <HeaderBar/>
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<Register/>}></Route>
                    <Route exact path='/videos' element={<SelectVideo/>}/>
                    <Route exact path={'/play/:id'} element={<PlayVideo/>}/>
                    <Route exact path={'/feedback'} element={<FeedbackForm/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
