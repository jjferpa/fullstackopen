

const dummy = (blogs) => {
    
    return 1
  }

  const totalLikes = (blogs)=> {
 
    return blogs.reduce((acc, blog) => acc + blog.likes, 0)

  }

  const favoriteBlog = ( blogs ) =>{

    return blogs.sort((a, b) => b.likes - a.likes)[0]

  }
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }