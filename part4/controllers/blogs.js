const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)

  })
  
  blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if(!request.body.title){
      response.status(400).send("Bad request")
    }

    if(!request.body.url){
      response.status(400).send("Bad request")
    }
  
    const result = await blog.save()
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