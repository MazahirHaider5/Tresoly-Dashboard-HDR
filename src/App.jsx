import "../src/assets/style/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from '../src/routes/index'
import { ToastContainer } from 'react-toastify';


function App() {
    return (
        <>
        <Routes/>
        <ToastContainer position="top-right" autoClose={3000} />
        </>

    );
}

export default App;
