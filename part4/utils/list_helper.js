

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
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }