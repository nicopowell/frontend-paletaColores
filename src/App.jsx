import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import FormularioColor from "./components/FormularioColor";

function App() {
    return (
        <Container className="my-5 mainPage">
            <h1 className="text-center text-light">Paleta de colores</h1>
            <hr className="text-light my-4"/>
            <FormularioColor></FormularioColor>
        </Container>
    );
}
export default App;
