import {db} from './connect';
export const saveData = async({title,subject}) => {
  await db.transaction(function (tx) {
    tx.executeSql(
      'INSERT INTO table_user (title, subject,date) VALUES (?,?,?)',
      [title, subject,new Date().toDateString()],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            'Success',
            'You are Registered Successfully',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('Home'),
              },
            ],
            {cancelable: false},
          );
        } else alert('Registration Failed');
      },
      error => {
        console.log(error);
      },
    );
  });
};