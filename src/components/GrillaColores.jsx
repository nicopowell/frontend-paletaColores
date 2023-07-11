import { Row } from "react-bootstrap";
import CardGrilla from "./CardGrilla";

const GrillaColores = ({ colores, borrarColor }) => {
  return (
    <Row xs={2} md={4} className="g-4 mb-3">
      {colores.map((item, indice) => (
        <CardGrilla
          key={indice}
          className="col-4"
          itemColor={item}
          borrarColor={borrarColor}
        ></CardGrilla>
      ))}
    </Row>
  );
};

export default GrillaColores;