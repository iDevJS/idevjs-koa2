const USER_SELECT = '-password -email'
const AUTHOR_POPULATE_OPTION = {
  path: 'author', select: USER_SELECT
}
const POST_POPULATE_OPTION = [
  AUTHOR_POPULATE_OPTION, {
    path: 'last_comment_user', select: USER_SELECT
  }, {
    path: 'node'
  }
]

const TOKEN_POPULATE_OPTION = [
  {
    path: 'user', select: USER_SELECT
  }, {
    path: 'client_id'
  }
]

export {
  AUTHOR_POPULATE_OPTION,
  POST_POPULATE_OPTION,
  TOKEN_POPULATE_OPTION
}
