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