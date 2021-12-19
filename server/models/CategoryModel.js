module.exports = function (db, callback) {
  db.define(
    'CategoryModel',
    {
      id: {type: 'serial', key: true},
      name: String,
      create_time: String,
      update_time: String,
    },
    {
      table: 'category',
    }
  )
  return callback()
}
