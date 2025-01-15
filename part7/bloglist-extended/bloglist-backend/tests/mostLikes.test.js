const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("The author with most likes", () => {
  test("should return the author with most likes", () => {
    const result = listHelper.mostLikes(listHelper.initialBlogs);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
