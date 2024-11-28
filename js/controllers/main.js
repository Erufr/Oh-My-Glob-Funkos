import { serviceProducts } from "../services/products-controllers.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard ({name, price, image, id}) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <div class="card">
            <img class="img-card" src="${image}" alt="Funko Pop de BMO">
                <article class="card-container--info">
                    <p class="card-titulo">${name}</p>
                        <div class="card-container--value">
                        <p>$${price}</p>
                    <button class="delete-button" data-id="${id}" type="button">Eliminar</button>

                    </div>
                </article>
            </div>
    ` ;
    return card; 
}

const renderProducts = async () => {
    try {
        const listProducts = await serviceProducts.productList();
        listProducts.forEach((product) => {
            const productCard = createCard(product);
            productContainer.appendChild(productCard);
            });
        }catch (error) {
        console.error(error);
    }
};

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const image = document.querySelector("[data-image]").value;
    const price = document.querySelector("[data-price]").value;

    try {
        const newProduct = await serviceProducts.createProduct(name, price, image);
        const productCard = createCard(newProduct);
        productContainer.appendChild(productCard); 
        form.reset();
    } catch (error) {
        console.error("Error al crear el producto:", error);
    }
});

productContainer.addEventListener("click", async (event) => {
    if (event.target.classList.contains("delete-button")) {
        const button = event.target;
        const productId = button.dataset.id;

        try {
            await serviceProducts.deleteProduct(productId);
            const productCard = button.closest(".card");
            productCard.remove(); 
            console.log(`Producto con ID ${productId} eliminado correctamente`);
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    }

});

renderProducts();
createProduct();
deleteProduct();