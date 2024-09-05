const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

beforeEach(async () => {  
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash("abc", 10)
    const user = new User({
       username: "pollo",
       name: "Leonidas",
       blogs: [],
       passwordHash
    })
  
    await user.save()
}, 100000)

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

describe('Tests for creating a new blog', () => { 
    test ('should POST a new blog', async () => { 

      const user = {
        username: "pollo",
        password: "abc",
      }

      const login = await api
        .post('/api/login')
        .send(user)

      await api
      .post('/api/blogs')
      .send(listHelper.postBlog)
      .set('Authorization', `Bearer ${login.body.token}`)
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
      const user = {
        username: "pollo",
        password: "abc",
      }

      const login = await api
        .post('/api/login')
        .send(user)
      
      await api
      .post('/api/blogs')
      .send(listHelper.postBlogWithNoLikes)
      .set('Authorization', `Bearer ${login.body.token}`)
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

      const user = {
        username: "pollo",
        password: "abc",
      }

      const login = await api
        .post('/api/login')
        .send(user)

      await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send(listHelper.postBlogWithoutTitle)
      .expect(400)
    
      })
    
    test('posting without URL should get status 400', async () => { 
      const user = {
        username: "pollo",
        password: "abc",
      }

      const login = await api
        .post('/api/login')
        .send(user)

        await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${login.body.token}`) 
        .send(listHelper.postBlogWithoutURL)
        .expect(400)
        
        })

    test.only('posting without token should get status 401 unauthorized', async () => { 

          const user = {
            username: "pollo",
            password: "abc",
          }
    
          const login = await api
            .post('/api/login')
            .send(user)
    
          await api
          .post('/api/blogs')
          .set('Authorization', `Bearer`)
          .send(listHelper.postBlogPost)
          .expect(401)
        
          })
 })



test('should delete the blog with a valid id and get 204 status', async () => { 

  const blogsAtStart = await listHelper.blogsInDb()
  const blogsToDelete = blogsAtStart[12]

  const user = {
    username: "pollo",
    password: "abc",
  }

  const login = await api
    .post('/api/login')
    .send(user)


  await api.delete(`/api/blogs/${blogsToDelete.id}`)
  .expect(204)
  .set('Authorization', `Bearer ${login.body.token}`) 

  const blogsAtEnd = await listHelper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length -1);
  const contents = blogsAtEnd.map(blog => blog.id)
  assert(!contents.includes(blogsToDelete.id))
 })

 test('should update the likes', async () => { 
  const blogsAtStart = await listHelper.blogsInDb()
  const blogsToUpdate = blogsAtStart[0]

  await api.put(`/api/blogs/${blogsToUpdate.id}`)
  .send(listHelper.postUpdate)
  .expect(200)

  const blogsAtEnd = await listHelper.blogsInDb()
  assert.strictEqual(blogsAtEnd[0].likes, listHelper.postUpdate.likes)

  })

after(async () => {
  await mongoose.connection.close()
})
