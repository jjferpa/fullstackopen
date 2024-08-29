const Blog = require('../models/blog')

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const postBlog=  {
  title: "Blog title",
  author: "Blog Author",
  url: "https://www.url.com",
  likes: 0,
}

const postBlogWithNoLikes=  {
  title: "Blog title",
  author: "Blog Author",
  url: "https://www.url.com"
}

const postBlogWithoutTitle=  {
  author: "Blog Author",
  url: "https://www.url.com",
  likes: 0
}

const postBlogWithoutURL=  {
  title: "Blog title",
  author: "Blog Author",
  likes: 0
}

const dummy = (blogs) => {
    
    return 1
  }

  const totalLikes = (blogs)=> {
 
    return blogs.reduce((acc, blog) => acc + blog.likes, 0)

  }

  const favoriteBlog = ( blogs ) =>{

    return blogs.sort((a, b) => b.likes - a.likes)[0]

  }

  const mostBlogs = ( blogs ) => {

    const bloggers = blogs.reduce((acc, blog) => {
      const { author } = blog;
    
      const authorExists = acc.find(autor => autor.author === author);
    
      if (authorExists) {
        authorExists.blogs++;
      } else {
        acc.push({ author, blogs: 1 });
      }
    
      return acc;
    }, []);

    return bloggers.sort((a, b) => b.blogs - a.blogs)[0]


  }

  const mostLikes = ( blogs ) => {

    const counLikes = blogs.reduce((acc, blog) => {
      const { author, likes } = blog;
    
      const authorExists = acc.find(autor => autor.author === author);
    
      if (authorExists) {
        authorExists.likes += likes
      } else {
        acc.push({ author, likes});
      }
    
      return acc;
    }, []);

    return counLikes.sort((a, b) => b.likes - a.likes)[0]



  }


  
  module.exports = {
    dummy,
    favoriteBlog,
    initialBlogs,
    mostBlogs,
    mostLikes,
    postBlog,
    totalLikes,
    postBlogWithNoLikes,
    postBlogWithoutTitle,
    postBlogWithoutURL,
    blogsInDb,
  }