const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Peter Parker',
        username: 'peter',
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

    test('succeeds with correct credentials', async ({ page }) => {
    
    loginWith(page, 'jdoe', '123');
    await expect(page.getByRole('paragraph').first()).toContainText('John Doe is logged in');
    await expect(page.getByRole('heading', {name: 'blogs'})).toBeVisible();

    })

    test('fails with wrong credentials', async ({ page }) => {
    loginWith(page, 'jdoe', '456');
    await page.getByRole('button', {name: 'login'}).click();
    
    const errorDiv = await page.locator('.error')
    await expect(errorDiv).toContainText('Wrong credentials')
    })
  })

describe('When logged in', () => {

    beforeEach(async ({ page }) => {
      loginWith(page, 'jdoe', '123');
    })
  
    test('a new blog can be created', async ({ page }) => {
    
    createBlog(page, 'Blog title 50', 'Blog author', 'https://www.google.es');
    
    const createdBlog = await page.locator('.blog-style').last();

    await expect(page.locator('.success')).toBeVisible();
    await expect(createdBlog).toContainText('Blog title 50');
    })

    test('a new blog can be liked', async ({ page }) => {
      createBlog(page, 'Blog title 50', 'Blog author', 'https://www.google.es');
      const createdBlog = page.locator('.blog-style').last();

      await createdBlog.getByRole('button', {name: 'view'}).click();
      await createdBlog.getByRole('button', {name: 'like'}).click();

      await expect(createdBlog.getByTestId('likes')).toContainText('likes 1');
    })
    
    test('a new blog can be deleted by his user', async ({page}) => { 
      createBlog(page, 'Blog title 50', 'Blog author', 'https://www.google.es');

      const createdBlog = page.locator('.blog-style').last();
      await createdBlog.getByRole('button', {name: 'view'}).click();
      page.once('dialog', async (dialog) => {
        expect(dialog.message()).toEqual('Remove blog Blog title 50 by Blog author');
        await dialog.accept();
      });      
      await createdBlog.getByRole('button', { name: 'remove' }).click();

      await expect(createdBlog).not.toBeVisible();

     })

     test('only the creator user can see the remove button', async ({page}) => { 

      await page.getByRole('button', {name: 'new blog'}).click();
      const input = await page.getByRole('textbox').all();
      await input[0].fill('Blog title 50');
      await input[1].fill('Blog author');
      await input[2].fill('https://www.google.es');
      await page.getByRole('button', {name: 'create'}).click();

      await page.getByRole('button', {name: 'logout'}).click();

      await page.getByTestId('username').fill('peter');
      await page.getByTestId('password').fill('123');
      await page.getByRole('button', {name: 'login'}).click();

      await page.getByRole('button', {name: 'view'}).click();
    
     expect(page.getByRole('button', { name: 'remove' })).toBeHidden();


     })     


  })

})