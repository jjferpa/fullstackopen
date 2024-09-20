const loginWith = async (page, username, password)  => {
    await page.getByTestId('username').fill(username);
    await page.getByTestId('password').fill(password);
    await page.getByRole('button', {name: 'login'}).click();
}

const createBlog = async(page, title, author, url) => {
    await page.getByRole('button', {name: 'new blog'}).click();
    const input = await page.getByRole('textbox').all();
    await input[0].fill(title);
    await input[1].fill(author);
    await input[2].fill(url);
    await page.getByRole('button', {name: 'create'}).click();
}
  
  export { loginWith, createBlog }