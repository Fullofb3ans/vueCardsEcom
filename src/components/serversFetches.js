export default function getProducts() {
    return fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .then((dat) => { return dat })
}
