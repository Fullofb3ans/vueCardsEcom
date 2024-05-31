export default function getProducts() {
    fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .then((dat) => { return dat })
}
