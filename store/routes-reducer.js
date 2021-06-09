import { ADD_ROUTE, SET_ROUTES } from "./routes-actions";
import Route from '../models/route';

const initialState={
    routes:[]
};

export default(state=initialState,action)=>{
    switch (action.type){
        case SET_ROUTES:
            return {
                routes: action.routes.map(rou=>new Route(rou.id.toString(),rou.title,rou.imageUri,rou.distance,rou.time,rou.dateOfRoute))
            };
        case ADD_ROUTE:
             const newRoute=new Route(action.routeData.id.toString(),action.routeData.title,action.routeData.image,action.routeData.distance,action.routeData.time,action.routeData.dateOfRoute)
        return {
            routes:state.routes.concat(newRoute)
        };
        default:
            return state;
    }
};