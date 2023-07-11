import {Card, Col} from "react-bootstrap"
import "./bloqueColor.css"

const CardGrilla = ({itemColor, borrarColor}) => {
    return (
        <Col>
          <Card className="bg-dark text-light">
          <div style={{background:itemColor}} className="colorDisplay w-100" ></div>
            <Card.Body className="text-center">
              <Card.Title>{itemColor}</Card.Title>
              <button className="btn btn-danger rounded" onClick={()=>borrarColor(itemColor)}>Borrar</button>
            </Card.Body>
          </Card>
        </Col>
    )
}

export default CardGrilla;