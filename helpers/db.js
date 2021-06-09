import * as SQLite from 'expo-sqlite';

const db=SQLite.openDatabase('routes.db');


export const init=()=>{
const promise =new Promise((resolve,reject)=>{
    db.transaction((tx)=>{
        
        tx.executeSql('CREATE TABLE IF NOT EXISTS routes (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, distance REAL NOT NULL, time TEXT NOT NULL,dateOfRoute TEXT NOT NULL);', 
        [],
        ()=>{
            resolve();
        },
        (_,err)=>{
            reject(err)
        }
        );
        tx.executeSql('CREATE TABLE IF NOT EXISTS coords (id INTEGER PRIMARY KEY NOT NULL,latitude REAL NOT NULL, longitude REAL NOT NULL,dateOfCoords TEXT NOT NULL);',
        [],
        ()=>{
            resolve();
        },
        (_,err)=>{
            reject(err)
        }
        );
       
    });
});
return promise;

};

export const insertRoute=(title,imageUri,distance,time,dateOfRoute)=>{
    const promise =new Promise((resolve,reject)=>{
        db.transaction((tx)=>{
            tx.executeSql(`INSERT INTO routes (title,imageUri,distance,time,dateOfRoute) VALUES (?,?,?,?,?);`, 
            [title,imageUri,distance,time,dateOfRoute],
            (_, result)=>{
                resolve(result);
            },
            (_,err)=>{
                reject(err)
            }
            );
        });
    });
    return promise;
    
};

export const insertCoords=(latitude,longitude,dateOfCoords)=>{
    const promise =new Promise((resolve,reject)=>{
        db.transaction((tx)=>{
            tx.executeSql(`INSERT INTO coords (latitude,longitude,dateOfCoords) VALUES (?,?,?);`, 
            [latitude,longitude,dateOfCoords],
            (_, result)=>{
                resolve(result);
            },
            (_,err)=>{
                reject(err)
            }
            );
        });
    });
    return promise;
    
};


export const fetchRoutes=()=>{
    const promise =new Promise((resolve,reject)=>{
        db.transaction((tx)=>{
            tx.executeSql('SELECT * FROM routes', 
            [],
            (_, result)=>{
                resolve(result);
            },
            (_,err)=>{
                reject(err)
            }
            );
        });
    });
    return promise;
};


export const fetchCoords=()=>{
    const promise =new Promise((resolve,reject)=>{
        db.transaction((tx)=>{
            tx.executeSql('SELECT * FROM coords', 
            [],
            (_, result)=>{
                resolve(result);
            },
            (_,err)=>{
                reject(err)
            }
            );
        });
    });
    return promise;
};