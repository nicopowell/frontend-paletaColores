import {Card, Col} from "react-bootstrap"
import "./bloqueColor.css"
import Swal from "sweetalert2";
import { consultaBorrarColor, consultaColores } from "./helpers/queris";

const CardGrilla = ({itemColor, setColores}) => {
  const borrarColor = () => {
    Swal.fire({
        title: `¿Esta seguro de borrar el color ${itemColor.nombreColor || itemColor.codigoHEX || itemColor.codigoRGB}?`,
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

    return (
        <Col>
          <Card className="bg-dark text-light">
          <div style={{background:itemColor.nombreColor || itemColor.codigoHEX || itemColor.codigoRGB}} className="colorDisplay w-100" ></div>
            <Card.Body className="text-center">
              <Card.Title>{itemColor.nombreColor || itemColor.codigoHEX || itemColor.codigoRGB}</Card.Title>
              <button className="btn btn-danger rounded" onClick={()=>borrarColor(itemColor)}>Borrar</button>
            </Card.Body>
          </Card>
        </Col>
    )
}

export default CardGrilla;