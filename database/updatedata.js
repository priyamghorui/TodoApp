import {db} from './connect';
export const updatedata =(element) => {
  console.log(element.element.user_id, element.newtitle, element.newsubject);
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE table_user set title=?, subject=? where user_id=?',
      [element.newtitle, element.newsubject, element.element.user_id],
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
