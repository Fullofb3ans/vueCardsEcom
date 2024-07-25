import { describe, test, expect, beforeEach, vi } from 'vitest'
import { getProducts, getProduct, addNewProduct, checkout } from '../serverFetches'

vi.stubGlobal('fetch', vi.fn())

beforeEach(() => {
    vi.resetAllMocks()
})

describe('serverFetches', () => {
    test('getProducts fetches data successfully', async () => {
        const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }]
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(mockProducts)
        })

        const result = await getProducts()
        expect(result).toEqual(mockProducts)
        expect(global.fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products')
    })

    test('getProduct fetches a single product successfully', async () => {
        const mockProduct = { id: 1, name: 'Product 1' }
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(mockProduct)
        })

        const result = await getProduct(1)
        expect(result).toEqual(mockProduct)
        expect(global.fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products/1')
    })

    test('addNewProduct sends correct data', async () => {
        const mockResponse = { id: 3, name: 'New Product' }
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(mockResponse)
        })

        const result = await addNewProduct('New Product', 10.99, 'Description', 'image.jpg', 'Category')
        expect(result).toEqual(mockResponse)
        expect(global.fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products', {
            method: 'POST',
            body: JSON.stringify({
                title: 'New Product',
                price: 10.99,
                description: 'Description',
                image: 'image.jpg',
                category: 'Category',
            }),
        })
    })

    test('checkout sends user info correctly', async () => {
        const mockUserInfo = { name: 'John Doe', address: '123 Main St' }
        const mockResponse = { success: true }
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(mockResponse)
        })

        const result = await checkout(mockUserInfo)
        expect(result).toEqual(mockResponse)
        expect(global.fetch).toHaveBeenCalledWith('https://httpbin.org/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mockUserInfo),
        })
    })
})
