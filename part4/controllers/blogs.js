const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
    response.json(blogs)

  })

 
  
  blogsRouter.post('/', async (request, response) => {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (!user) {
      return response.status(400).json({ error: 'User not found' })
  }
    
    const blog = new Blog({
      ...request.body,
      user: user._id
    })


    if(!request.body.title){
      response.status(400).send("Bad request")
    }

    if(!request.body.url){
      response.status(400).send("Bad request")
    }

    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)

  })


  blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
   
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' })
  }

    if (!blog.user) {
      return response.status(400).json({ error: 'User not found in blog' })
  }

    if (blog.user.toString() !== user.id.toString() ){
      return response.status(403).json({ error: 'User incorrect' })
    }
  

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