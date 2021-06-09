import * as FileSystem from 'expo-file-system';

export const ADD_ROUTE = 'ROUTE';
export const SET_ROUTES='SET_ROUTES';
import {insertRoute,fetchRoutes} from '../helpers/db';


export const addRoute=(title,image,distance,time,dateOfRoute)=>{
    return async dispatch=>{
        const fileName=image.split('/').pop();
        const newPath=FileSystem.documentDirectory+fileName;
        try{
            await FileSystem.moveAsync({
                from:image,
                to:newPath
            });
        //    console.log(dbResult);
            const dbResult= await insertRoute(title,newPath,distance,time,dateOfRoute);
            
            
            dispatch({type:ADD_ROUTE,routeData:{id:dbResult.insertId,title:title,image:newPath,distance:distance,time:time,dateOfRoute:dateOfRoute}});
            
        } catch(err){
            console.log(err);
            throw err;
        }
    };
}


export const loadRoutes =()=>{
    return async dispatch=>{
        try{
            const dbResult = await fetchRoutes();
            // console.log(dbResult);
            dispatch({type:SET_ROUTES,routes:dbResult.rows._array});

        } catch(err){
            throw err;
        }

        
    };
};