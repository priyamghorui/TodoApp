import {db} from './connect';
export const savetableuserdetails = async({name,career}) => {
  await db.transaction(function (tx) {
    tx.executeSql(
      'INSERT INTO table_user_details (name, career,edit) VALUES (?,?,?)',
      [name, career,"NO"],
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