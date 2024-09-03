const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
    response.json(blogs)

  })
  
  blogsRouter.post('/', async (request, response) => {
    const users =  await User.find({})
    const blogUser = users[0]
    const blog = new Blog({
      ...request.body,
      user: blogUser})

    if(!request.body.title){
      response.status(400).send("Bad request")
    }

    if(!request.body.url){
      response.status(400).send("Bad request")
    }

    const result = await blog.save()
    const user = await User.findById(blogUser._id)
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)

  })


  blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()

  })

  blogsRouter.put('/:id', async (request, response) =>{
    const body = request.body

    const blog = {
      likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(updatedBlog)
  })


  module.exports = blogsRouter