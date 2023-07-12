const URLColores = import.meta.env.VITE_API_COLORES;

export const consultaColores = async () => {
    try {
        const respuesta = await fetch(URLColores);
        const colores = await respuesta.json();
        return colores;
    } catch (error) {
        console.log(error);
    }
};

export const consultaAgregarColor = async (color) => {
    try {
        const respuesta = await fetch(URLColores, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(color),
        });
        return respuesta;
    } catch (error) {
        console.log(error);
    }
};

export const consultaBorrarColor = async (id) => {
    try {
        const respuesta = await fetch(`${URLColores}/${id}`, {
            method: "DELETE",
        });
        return respuesta;
    } catch (error) {
        console.log(error);
    }
};

export const consultaEditarColor = async (color, id) => {
    try {
        const respuesta = await fetch(URLColores + "/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(color),
        });
        return respuesta;
    } catch (error) {
        console.log(error);
    }
};