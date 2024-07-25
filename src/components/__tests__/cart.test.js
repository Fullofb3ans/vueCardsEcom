import { describe, test, expect, beforeEach, vi } from 'vitest'
import { useCartStore } from '@/stores/cart'
import { setActivePinia, createPinia } from 'pinia'

describe('useCartStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        localStorage.clear()
        vi.spyOn(console, 'log').mockImplementation(() => { })
    })

    test('cleanCart removes all items from cart and localStorage', () => {
        const cartStore = useCartStore()
        cartStore.addToCart(1, 'Product 1', 10)
        cartStore.addToCart(2, 'Product 2', 20)

        cartStore.cleanCart()

        expect(cartStore.cart).toHaveLength(0)
        expect(localStorage.getItem('cart')).toBeNull()
    })

    test('addToCart adds a new item to an empty cart', () => {
        const cartStore = useCartStore()
        cartStore.addToCart(1, 'Product 1', 10)

        expect(cartStore.cart).toHaveLength(1)
        expect(cartStore.cart[0]).toEqual({
            id: 1,
            numberOf: 1,
            title: 'Product 1',
            price: 10
        })
        expect(JSON.parse(localStorage.getItem('cart'))).toEqual(cartStore.cart)
    })

    test('addToCart increments quantity for existing item', () => {
        const cartStore = useCartStore()
        cartStore.addToCart(1, 'Product 1', 10)
        cartStore.addToCart(1, 'Product 1', 10)

        expect(cartStore.cart).toHaveLength(1)
        expect(cartStore.cart[0].numberOf).toBe(2)
        expect(JSON.parse(localStorage.getItem('cart'))).toEqual(cartStore.cart)
    })

    test('addToCart adds a new item to non-empty cart', () => {
        const cartStore = useCartStore()
        cartStore.addToCart(1, 'Product 1', 10)
        cartStore.addToCart(2, 'Product 2', 20)

        expect(cartStore.cart).toHaveLength(2)
        expect(cartStore.cart[1]).toEqual({
            id: 2,
            numberOf: 1,
            title: 'Product 2',
            price: 20
        })
        expect(JSON.parse(localStorage.getItem('cart'))).toEqual(cartStore.cart)
    })

    test('summaryPrice computes total price correctly', () => {
        const cartStore = useCartStore()
        cartStore.addToCart(1, 'Product 1', 10)
        cartStore.addToCart(2, 'Product 2', 20)
        cartStore.addToCart(1, 'Product 1', 10)

        expect(cartStore.summaryPrice).toBe(40)
    })

    test('summaryPrice returns 0 for empty cart', () => {
        const cartStore = useCartStore()
        expect(cartStore.summaryPrice).toBe(0)
    })
})
