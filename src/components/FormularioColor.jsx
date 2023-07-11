import { Button, Container, Row, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./bloqueColor.css";
import GrillaColores from "./GrillaColores";
import Swal from "sweetalert2";
import { consultaAgregarColor, consultaColores } from "./helpers/queris";

const FormularioColor = () => {
    const [color, setColor] = useState({});
    const [colores, setColores] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        consultaColores().then((respuesta) => {
            setColores(respuesta);
        });
    }, []);

    const onSubmit = (colorNuevo) => {
        const objetoColor = {};
        let hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        let rgbRegex = /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/;

        if (hexRegex.test(colorNuevo.color)) {
            objetoColor.codigoHEX = colorNuevo.color;
        } else if (rgbRegex.test(colorNuevo.color)) {
            objetoColor.codigoRGB = colorNuevo.color;
        } else if (CSS.supports("color", colorNuevo.color.toLowerCase())) {
            objetoColor.nombreColor = colorNuevo.color;
        } else {
            return Swal.fire(
                          "Ocurrio un error",
                          `El color ${colorNuevo.color} no es un color valido, intentelo nuevamente`,
                          "error"
                      );
        }
        consultaAgregarColor(objetoColor).then((respuestaCreated) => {
            if (respuestaCreated && respuestaCreated.status === 201) {
                Swal.fire(
                    "Color creado",
                    `La tarea ${colorNuevo.color} fue creada correctamente`,
                    "success"
                );
                reset();
                consultaColores().then((respuesta) => {
                    setColores(respuesta);
                });
            } else {
                Swal.fire(
                    "Ocurrio un error",
                    `La tarea ${tareaNueva.nombreProducto} no fue creada, intentelo mas tarde`,
                    "error"
                );
            }
        });
    };

    return (
        <>
            <Container className="d-flex align-items-center mb-5">
                <div
                    className="rounded border colorDisplay"
                    style={{ backgroundColor: color.color }}
                ></div>
                <Form onSubmit={handleSubmit(onSubmit)} className="flex-grow-1 ms-3">
                    <Form.Group
                        className="mb-3 d-flex flex-column align-items-end gap-4"
                        controlId="color"
                    >
                        <Form.Text className="text-danger">{errors.nombreTarea?.message}</Form.Text>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese un color"
                            required
                            maxLength={30}
                            {...register("color", {
                                required: "Debe ingresar un color",
                                maxLength: {
                                    value: 30,
                                    message: "La cantidad máxima de caracteres es de 30 dígitos",
                                },
                            })}
                            onChange={(e) => setColor({ color: e.target.value })}
                        />
                        <Button className="w-25" variant="primary" type="submit">
                            Guardar
                        </Button>
                    </Form.Group>
                </Form>
            </Container>
            <Container>
                <GrillaColores colores={colores}></GrillaColores>
            </Container>
        </>
    );
};

export default FormularioColor;
