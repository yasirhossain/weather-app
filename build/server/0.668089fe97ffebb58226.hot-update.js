require("source-map-support").install();
exports.id = 0;
exports.modules = {

/***/ "./node_modules/persisted_queries.json":
/***/ (function(module, exports) {

module.exports = {
	"mutation addComment($input: AddCommentInput!) {\n  addComment(input: $input) {\n    ...CommentInfo\n    __typename\n  }\n}\n\nfragment CommentInfo on Comment {\n  id\n  content\n  __typename\n}\n": 1,
	"mutation addCount($amount: Int!) {\n  addCount(amount: $amount) {\n    amount\n    __typename\n  }\n}\n": 2,
	"mutation addPost($input: AddPostInput!) {\n  addPost(input: $input) {\n    ...PostInfo\n    __typename\n  }\n}\n\nfragment PostInfo on Post {\n  id\n  title\n  content\n  __typename\n}\n": 3,
	"mutation deleteComment($input: DeleteCommentInput!) {\n  deleteComment(input: $input) {\n    id\n    __typename\n  }\n}\n": 4,
	"mutation deletePost($id: ID!) {\n  deletePost(id: $id) {\n    id\n    __typename\n  }\n}\n": 5,
	"mutation editComment($input: EditCommentInput!) {\n  editComment(input: $input) {\n    ...CommentInfo\n    __typename\n  }\n}\n\nfragment CommentInfo on Comment {\n  id\n  content\n  __typename\n}\n": 6,
	"mutation editPost($input: EditPostInput!) {\n  editPost(input: $input) {\n    ...PostInfo\n    __typename\n  }\n}\n\nfragment PostInfo on Post {\n  id\n  title\n  content\n  __typename\n}\n": 7,
	"query getCount {\n  count {\n    amount\n    __typename\n  }\n}\n": 8,
	"query getPost($id: ID!) {\n  post(id: $id) {\n    ...PostInfo\n    comments {\n      ...CommentInfo\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment PostInfo on Post {\n  id\n  title\n  content\n  __typename\n}\n\nfragment CommentInfo on Comment {\n  id\n  content\n  __typename\n}\n": 9,
	"query getPosts($limit: Int!, $after: ID) {\n  postsQuery(limit: $limit, after: $after) {\n    totalCount\n    edges {\n      cursor\n      node {\n        ...PostInfo\n        __typename\n      }\n      __typename\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment PostInfo on Post {\n  id\n  title\n  content\n  __typename\n}\n": 10,
	"subscription onCommentUpdated($postId: ID!) {\n  commentUpdated(postId: $postId) {\n    mutation\n    id\n    postId\n    node {\n      ...CommentInfo\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment CommentInfo on Comment {\n  id\n  content\n  __typename\n}\n": 11,
	"subscription onCountUpdated {\n  countUpdated {\n    amount\n    __typename\n  }\n}\n": 12,
	"subscription onPostUpdated($id: ID!) {\n  postUpdated(id: $id) {\n    ...PostInfo\n    __typename\n  }\n}\n\nfragment PostInfo on Post {\n  id\n  title\n  content\n  __typename\n}\n": 13
};

/***/ })

};
//# sourceMappingURL=index.e91b3aedecb1161de5c5.js.map