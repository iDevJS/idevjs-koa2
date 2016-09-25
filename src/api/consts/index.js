const USER_SELECT = 'name gravatar meta'
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

export {
AUTHOR_POPULATE_OPTION,
POST_POPULATE_OPTION
}
