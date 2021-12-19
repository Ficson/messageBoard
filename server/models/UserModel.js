module.exports = function (db, callback) {
  db.define(
    'UserModel',
    {
      id: {type: 'serial', key: true},
      username: String,
      password: String,
      avatar: String,
      sex: String,
      tel: String,
      email: String,
      birthday: String,
      role_id: Number,
      create_time: String,
      update_time: String,
    },
    {
      table: 'user',
    }
  )
  return callback()
}
