module.exports = function(db, callback) {
  db.define("CommentModel", {
    id: { type: 'serial', key: true},
    name: String,
    content: String,
    msg_id: Number,
    user_id: Number,
    likes: Number,
    comment_id: Number,
    type: Number,
    create_time: String,
    update_time: String
  }, {
    table: "comment"
  })
  return callback()
}
