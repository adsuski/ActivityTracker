export const ADD_COORDS = 'ADD_COORDS';
export const SET_COORDS= 'SET_COORDS';

import {insertCoords,fetchCoords} from '../helpers/db'; 

export const addCoords=(latitude,longitude,dateOfCoords)=>{
    return async disp=>{
        try{
            // console.log(latitude,longitude,dateOfCoords);
            const dbResult =await insertCoords(latitude,longitude,dateOfCoords);
            console.log(dbResult);
            disp({type:ADD_COORDS,coordsData:{id:dbResult.insertId,latitude:latitude,longitude:longitude,dateOfCoords:dateOfCoords}});
            
        } catch(err){
            throw err;
        }
    };
}

export const loadCoords =()=>{
    return async disp=>{
        try{
            const dbResult = await fetchCoords();
            // console.log(dbResult);
            disp({type:SET_COORDS,coords:dbResult.rows._array});
        } catch(err){
            throw err;   
        }
    };
};