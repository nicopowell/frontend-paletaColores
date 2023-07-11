import { Button, Container, Row, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./bloqueColor.css";
import GrillaColores from "./GrillaColores";

const FormularioColor = () => {
    let coloresLocalStorage = JSON.parse(localStorage.getItem("ListaColores")) || [];
    const [color, setColor] = useState("");
    const [colores, setColores] = useState(coloresLocalStorage);

    useEffect(() => {
        localStorage.setItem("listaColores", JSON.stringify(colores));
    }, [colores]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setColores([...colores, color]);
        setColor("");
    };

    const borrarColor = (nombreColor) => {
        let copiaColores = colores.filter((itemColor) => itemColor !== nombreColor);
        setColores(copiaColores);
    };

    return (
        <>
            <Container className="d-flex align-items-center mb-5">
                <div
                    className="rounded border colorDisplay"
                    style={{ backgroundColor: color }}
                ></div>
                <Form onSubmit={handleSubmit} className="flex-grow-1 ms-3">
                    <Form.Group
                        className="mb-3 d-flex flex-column align-items-end gap-4"
                        controlId="color"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Ingrese un color"
                            onChange={(e) => setColor(e.target.value)}
                            value={color}
                            required
                            maxLength={30}
                        />
                        <Button className="w-25" variant="primary" type="submit">
                            Guardar
                        </Button>
                    </Form.Group>
                </Form>
            </Container>
            <hr className="text-light my-4" />
            <Container>
                <GrillaColores colores={colores} borrarColor={borrarColor}></GrillaColores>
            </Container>
        </>
    );
};

export default FormularioColor;
