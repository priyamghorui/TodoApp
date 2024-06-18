import {db} from './connect';

export const deletedata =async ({user_id}) => {
  await db.transaction(tx => {
    tx.executeSql(`DELETE FROM table_user where user_id=${user_id}`, [], (tx, results) => {
      console.log(results);
      if (results.rowsAffected!=0){

        return true
      }else{
        return false
      }
    });
  });
};

// export const deletedata =async () => {
//   await db.transaction(tx => {
//     tx.executeSql('DROP TABLE IF EXISTS table_user', [],(tx, results) => {
//       console.log(results);
//     });
//   });
// };