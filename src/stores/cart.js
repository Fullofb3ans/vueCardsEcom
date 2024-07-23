import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { useCatalogStore } from "@/stores/catalog";

export const useCartStore = defineStore('cart', () => {
    const cart = reactive(JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : []);

    const cleanCart = () => {
        cart.length = 0;
        localStorage.removeItem('cart');
        console.log(localStorage);
    }

    function addToCart(id, title, price) {
        if (cart.some((item) => item.id == id)) {
            cart.map((item) => {
                item.id == id ? (item.numberOf += 1) : "";
            });
        } else {
            cart.push({
                id: id,
                numberOf: 1,
                title: title,
                price: price,
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(localStorage);
    }

    const summaryPrice = computed(() =>
        cart.length == 0 ? 0 : cart.reduce((accum, item) => accum + item.price * item.numberOf, 0)
    )


    return { cart, cleanCart, addToCart, summaryPrice }
})