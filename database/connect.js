var SQLite = require('react-native-sqlite-storage');
export let db = SQLite.openDatabase(
  {name: 'todo-data.db', location: 'default'},
  () => {
    console.log('connect');
  },
  err => {
    console.log(err);
  },
);
