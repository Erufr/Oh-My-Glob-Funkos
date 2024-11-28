const BASE_URL="https://67476ce738c8741641d6aa73.mockapi.io/products" ;

const productList = async () => {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        return data; 
    } catch (error) {
        console.log("Error al listar productos:", error);
    }
};

const createProduct = async (name, price, image) => {
    try {
        const response = await fetch (BASE_URL,{
            method: "POST",
            headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name, price, image})
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error al crear productos", error)
    }
}

const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Error al eliminar el producto");
        }
    } catch (error) {
        console.error("Error al eliminar producto:", error);
    }
};


export const serviceProducts = {
    productList,
    createProduct,
    deleteProduct,
};