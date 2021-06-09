import {ADD_COORDS, SET_COORDS} from './coords-actions';
import Coords  from '../models/coords';

const initialState={
    coords:[]
};

export default (state=initialState,action)=>{
    switch(action.type){
        case SET_COORDS:
            return{
                coords: action.coords.map(coo=>new Coords(coo.id.toString(),coo.latitude,coo.longitude,coo.dateOfCoords))
            };
        case ADD_COORDS:
            // const newCoords=new Coords(new Date().toString(),action.coordsData.id,action.coordsData.idOfRoute,action.coordsData.longitude,action.coordsData.latitude);
            const newCoords=new Coords(action.coordsData.id.toString(),action.coordsData.latitude,action.coordsData.longitude,action.coordsData.dateOfCoords);
            return {
                coords: state.coords.concat(newCoords)
            };
            default:
                return state;
    }
};