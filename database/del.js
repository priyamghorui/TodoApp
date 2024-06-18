import {db} from './connect';

// export const del =async ({user_id}) => {
//   await db.transaction(tx => {
//     tx.executeSql(`DELETE FROM table_user where user_id=${user_id}`, [], (tx, results) => {
//       console.log(results);
//       if (results.rowsAffected!=0){

//         return true
//       }else{
//         return false
//       }
//     });
//   });
// };

export const del =async () => {
  await db.transaction(tx => {
    tx.executeSql('DROP TABLE IF EXISTS table_user_details', [],(tx, results) => {
      console.log(results);
    });
  });
};