import {db} from './connect';
export const create = async () => {
  await db.transaction(txn => {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
      [],
      (tx, res) => {
        console.log('item:', res.rows.length);
        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS table_user', []);
          txn.executeSql(
            `CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(100), subject VARCHAR(250), date VARCHAR(100))`,
            [],
          );
        }
      },
      error => {
        console.log(error);
      },
    );
  });
};


