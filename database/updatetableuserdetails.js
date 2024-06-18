import {db} from './connect';
export const updatetableuserdetails =({name,career,user_id}) => {
  console.log(name,career,user_id);
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE table_user_details set name=?, career=? where user_id=?',
      [name,career,user_id],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          console.log('ok');
        } else {
          console.log('Updation Failed');
        }
      },
    );
  });
};
