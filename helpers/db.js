import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("hr_app.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS currentuser (id INTEGER PRIMARY KEY NOT NULL, userId INTEGER NOT NULL, userName TEXT NOT NULL, email TEXT NOT NULL);",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const getCurrentUser = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM currentuser",
        [],
        (_, resulte) => {
          resolve(resulte);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const userLogIn = (userId, userName, email) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO currentuser (userId, userName, email) VALUES (?, ?, ?);",
        [userId, userName, email],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const logOut = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM currentuser;',
        [],
        (_, result) => {
          resolve(result)
        },
        (_, err) => {
          reject(err)
        }
      )
    })
  })
  return promise;
}