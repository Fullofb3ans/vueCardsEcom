export async function getProducts() {
    return await fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .then((data) => { return data })
}

export async function getProduct(id) {
    return await fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => { return data })
}

export async function addNewProduct(newTitle, newpPrice, newDescription, newImage, newCategory) {
    return await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        body: JSON.stringify({
            title: newTitle,
            price: newpPrice,
            description: newDescription,
            image: newImage,
            category: newCategory,
        }),
    })
        .then((res) => res.json())
}