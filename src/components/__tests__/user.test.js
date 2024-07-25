import { describe, test, expect, beforeEach, vi } from 'vitest'
import { useUserStore } from '@/stores/user'
import { setActivePinia, createPinia } from 'pinia'

describe('useUserStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        localStorage.clear()
        vi.spyOn(console, 'log').mockImplementation(() => { })
    })

    test('initial state', () => {
        const userStore = useUserStore()
        expect(userStore.mail).toBe('')
        expect(userStore.pass).toBe('')
        expect(userStore.admin).toBe(false)
    })

    test('logIn sets user data and localStorage', () => {
        const userStore = useUserStore()
        userStore.logIn('test@example.com', 'password123')

        expect(userStore.mail).toBe('test@example.com')
        expect(userStore.pass).toBe('password123')
        expect(userStore.admin).toBe(true)
        expect(localStorage.getItem('mail')).toBe('test@example.com')
        expect(localStorage.getItem('pass')).toBe('password123')
        expect(localStorage.getItem('admin')).toBe('true')
    })

    test('logOut clears user data and localStorage', () => {
        const userStore = useUserStore()
        userStore.logIn('test@example.com', 'password123')
        userStore.logOut()

        expect(userStore.mail).toBe('')
        expect(userStore.pass).toBe('')
        expect(userStore.admin).toBe(false)
        expect(localStorage.getItem('mail')).toBeNull()
        expect(localStorage.getItem('pass')).toBeNull()
        expect(localStorage.getItem('admin')).toBe('false')
    })

    test('initial state with existing localStorage data', () => {
        localStorage.setItem('mail', 'existing@example.com')
        localStorage.setItem('pass', 'existingpass')
        localStorage.setItem('admin', 'true')

        const userStore = useUserStore()
        expect(userStore.mail).toBe('existing@example.com')
        expect(userStore.pass).toBe('existingpass')
        expect(userStore.admin).toBe(true)
    })

    test('logIn overwrites existing data', () => {
        localStorage.setItem('mail', 'old@example.com')
        localStorage.setItem('pass', 'oldpass')
        localStorage.setItem('admin', 'false')

        const userStore = useUserStore()
        userStore.logIn('new@example.com', 'newpass')

        expect(userStore.mail).toBe('new@example.com')
        expect(userStore.pass).toBe('newpass')
        expect(userStore.admin).toBe(true)
        expect(localStorage.getItem('mail')).toBe('new@example.com')
        expect(localStorage.getItem('pass')).toBe('newpass')
        expect(localStorage.getItem('admin')).toBe('true')
    })
})
