const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({  page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'John Doe',
        username: 'jdoe',
        password: '123'
      }
    })

    await page.goto('http://localhost:5174')
  })


  test('Login form is shown', async ({ page }) => {
    
    await expect(page.getByRole('heading', { name: 'Log in to application' })).toBeVisible();
    await expect(page.getByText('username')).toBeVisible();
    await expect(page.getByText('password')).toBeVisible();
    await expect(page.getByRole('button', {name: 'login'})).toBeVisible();

  })

  describe('Login', () => {
    test.only('succeeds with correct credentials', async ({ page }) => {
    
    await page.getByTestId('username').fill('jdoe');
    await page.getByTestId('password').fill('123');
    await page.getByRole('button', {name: 'login'}).click();
    await expect(page.getByText('Jonh Doe is logged inlogout')).toBeVisible();
    await expect(page.getByRole('heading', {name: 'blogs'})).toBeVisible();

    })

    test('fails with wrong credentials', async ({ page }) => {
    await page.getByTestId('username').fill('jdoe');
    await page.getByTestId('password').fill('456');
    await page.getByRole('button', {name: 'login'}).click();
    
    const errorDiv = await page.locator('.error')
    await expect(errorDiv).toContainText('Wrong credentials')
    })
  })
})