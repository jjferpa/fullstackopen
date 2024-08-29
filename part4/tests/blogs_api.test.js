const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of listHelper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')  
  assert.strictEqual(response.body.length, listHelper.initialBlogs.length)
})

test("blogs unique identifier should be 'id' and not '_id'", async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    assert.ok(blog.id)  
    assert.strictEqual('_id' in blog, false)
  })
})

test('should POST a new blog', async () => { 
  await api
  .post('/api/blogs')
  .send(listHelper.postBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const response = await(api.get('/api/blogs'))

  assert.strictEqual(response.body.length, listHelper.initialBlogs.length+1)

  const addedBlog = response.body[response.body.length - 1]

  assert.deepStrictEqual({
    title: addedBlog.title,
    author: addedBlog.author,
    url: addedBlog.url,
    likes: addedBlog.likes
  }, listHelper.postBlog)

 })

 test('should POST a new blog with 0 likes', async () => { 
  await api
  .post('/api/blogs')
  .send(listHelper.postBlogWithNoLikes)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const response = await(api.get('/api/blogs'))
  const addedBlog = response.body[response.body.length - 1]

  assert.deepStrictEqual({
    title: addedBlog.title,
    author: addedBlog.author,
    url: addedBlog.url,
    likes: addedBlog.likes
  }, listHelper.postBlog)

 })


 test('posting without title should get status 400', async () => { 
  await api
  .post('/api/blogs')
  .send(listHelper.postBlogWithoutTitle)
  .expect(400)

  })

  test('posting without URL should get status 400', async () => { 
    await api
    .post('/api/blogs')
    .send(listHelper.postBlogWithoutURL)
    .expect(400)
    
    })


after(async () => {
  await mongoose.connection.close()
})