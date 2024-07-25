import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.locator('div:nth-child(2) > .butButton').click();
    await page.getByLabel('Close').click();
    await page.getByRole('link', { name: 'Корзина' }).click();
    await page.getByRole('button', { name: 'Оплатить' }).click();
    await page.getByPlaceholder('name@example.com').click();
    await page.getByPlaceholder('name@example.com').fill('1@s');
    await page.getByPlaceholder('name@example.com').press('Tab');
    await page.getByPlaceholder('ФИО').fill('fio');
    await page.getByPlaceholder('ФИО').press('Tab');
    await page.getByPlaceholder('г. Москва,').fill('moscow');
    await page.getByPlaceholder('г. Москва,').press('Tab');
    await page.getByPlaceholder('xxxx-xxxx-xxxx-xxxx').fill('123454345676543');
    await page.getByPlaceholder('xxxx-xxxx-xxxx-xxxx').press('Tab');
    await page.getByPlaceholder('xx.xx.xxxx').fill('2000-01-01');
    await page.getByPlaceholder('xx.xx.xxxx').press('Tab');
    await page.getByLabel('Согласие').check();
    await page.getByLabel('Согласие').press('Tab');
    await page.getByRole('button', { name: 'Оформить' }).click();
    await page.getByLabel('Close').click();
});