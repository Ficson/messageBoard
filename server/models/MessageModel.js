module.exports = function(db, callback) {
  db.define("MessageModel", {
   id: { type: 'serial', key: true},
   title: String,
   content: String,
   category_id: Number,
   content: String,
   user_id: Number,
  create_time: String,
  update_time: String,
  likes: Number
  }, {
    table: "message"
  })
  return callback()
}