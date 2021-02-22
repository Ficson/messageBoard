module.exports = function(db, callback) {
  db.define("LikeModel", {
    id: { type: 'serial', key: true},
    msg_id: Number,
    user_id: Number,
    create_time: String,
    update_time: String
  }, {
    table: "category"
  })
  return callback()
}
