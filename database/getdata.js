import {db} from './connect';

export const getData = () => {
  let datas=[]
   db.transaction(tx => {
    tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
      // console.log(results.rows.item());
      // var temp = [];
      for (let i = 0; i < results.rows.length; ++i) {
        // temp.push(results.rows.item(i));
        datas.push(results.rows.item(i));
      }
      // console.log(temp);
    });
  });
  return datas
};

