module.exports = function (db, callback) {
  db.define(
    'MessageModel',
    {
      id: {type: 'serial', key: true},
      content: String,
      category_id: Number,
      content: String,
      user_id: Number,
      likes: Number,
      type: Number, // 类型（0： 留言 1：回复）
      pid: Number, // 父亲id（默认-1）
      isAuthor: Boolean,
      create_time: String,
      update_time: String,
      replyPeople: String,
    },
    {
      table: 'message',
    }
  )
  return callback()
}
