import {db} from './connect';
export const createtableuserdetails = async () => {
  await db.transaction(txn => {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user_details'",
      [],
      (tx, res) => {
        console.log('item:', res.rows.length);
        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS table_user_details', []);
          txn.executeSql(
            `CREATE TABLE IF NOT EXISTS table_user_details(user_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), career VARCHAR(250), edit VARCHAR(100))`,
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


