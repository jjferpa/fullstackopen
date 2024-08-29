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

  module.exports = blogsRouter