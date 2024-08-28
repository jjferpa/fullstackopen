const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('The author with most blogs', () => { 

    
   
    test('should return the author with most blogs', () => { 
        const result = listHelper.mostBlogs(listHelper.initialBlogs)
        assert.deepStrictEqual(result,
            {
            author: "Robert C. Martin",
            blogs: 3
          })
    })
 })