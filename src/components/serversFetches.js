export default function getProducts(products) {
    fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .then((dat) => { products.value = dat })
}
