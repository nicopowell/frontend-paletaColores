import { Card, Col } from "react-bootstrap";
import "./bloqueColor.css";
import Swal from "sweetalert2";
import { consultaBorrarColor, consultaColores, consultaEditarColor } from "./helpers/queris";

const CardGrilla = ({ itemColor, setColores }) => {
    const borrarColor = () => {
        Swal.fire({
            title: `¿Esta seguro de borrar el color ${
                itemColor.nombreColor || itemColor.codigoHEX || itemColor.codigoRGB
            }?`,
            text: "No se puede revertir este paso",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Borrar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                consultaBorrarColor(itemColor.id).then((respuesta) => {
                    if (respuesta.status === 200) {
                        Swal.fire(
                            "Color eliminado",
                            `El color fue eliminado correctamente`,
                            "success"
                        );
                        //actualizar la tabla de productos
                        consultaColores().then((respuesta) => setColores(respuesta));
                    } else {
                        Swal.fire(
                            "Ocurrio un error",
                            `Intente realizar esta operación nuevamente mas tarde`,
                            "success"
                        );
                    }
                });
            }
        });
    };
    const editarColor = (id) => {
        const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        const rgbRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
        const objetoColor = {};
        Swal.fire({
            title: "Editar color",
            input: "text",
            inputValue: itemColor.nombreColor || itemColor.codigoHEX || itemColor.codigoRGB,
            showCancelButton: true,
            confirmButtonText: "Editar",
            showLoaderOnConfirm: true,
            preConfirm: (nuevoColor) => {
                if (hexRegex.test(nuevoColor)) {
                    objetoColor.codigoHEX = nuevoColor;
                } else if (rgbRegex.test(nuevoColor)) {
                    objetoColor.codigoRGB = nuevoColor;
                } else if (CSS.supports("color", nuevoColor.toLowerCase())) {
                    objetoColor.nombreColor = nuevoColor;
                } else {
                    return Swal.fire(
                        "Ocurrio un error",
                        `El color ${nuevoColor} no es un color valido, intentelo nuevamente`,
                        "error"
                    );
                }
                return consultaEditarColor(objetoColor, id);
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed && objetoColor.nombreColor || objetoColor.codigoHEX || objetoColor.codigoRGB) {
                Swal.fire("Color editado", `El color fue editado correctamente`, "success");
                consultaColores().then((respuesta) => setColores(respuesta));
            }
        });
    };

    return (
        <Col>
            <Card className="bg-dark text-light">
                <div
                    style={{
                        background:
                            itemColor.nombreColor || itemColor.codigoHEX || itemColor.codigoRGB,
                    }}
                    className="colorDisplay w-100"
                ></div>
                <Card.Body className="text-center">
                    <Card.Title>
                        {itemColor.nombreColor || itemColor.codigoHEX || itemColor.codigoRGB}
                    </Card.Title>
                    <button
                        className="btn btn-warning rounded me-2"
                        onClick={() => editarColor(itemColor.id)}
                    >
                        Editar
                    </button>
                    <button
                        className="btn btn-danger rounded"
                        onClick={() => borrarColor(itemColor)}
                    >
                        Borrar
                    </button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default CardGrilla;
