import React from 'react';
import {StyleSheet,View,Text, Button,FlatList} from 'react-native';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import {useSelector,useDispatch} from 'react-redux';


import HeaderButton from '../components/HeaderButton';
import RouteItem from '../components/RouteItem';
import * as routesActions from '../store/routes-actions';
import * as coordsActions from '../store/coords-actions';
import Colors from '../constants/Colors';
import { useEffect } from 'react';



const RoutesListScreen=props =>{
    const routes=useSelector(state=>state.routes.routes);
    const coords=useSelector(state=>state.coords.coords);
    const dispatch=useDispatch();
    const disp=useDispatch();

    useEffect(()=>{
        dispatch(routesActions.loadRoutes());
        disp(coordsActions.loadCoords());

    },[dispatch,disp]);

    return (<View>
        <FlatList 
            data={routes} 
            keyExtractor={item=>item.id} 
            renderItem={itemData=>(
                <RouteItem  
                    image={itemData.item.imageUri} 
                    title={itemData.item.title} 
                    distance={itemData.item.distance}
                    time={itemData.item.time}
                    onSelect={()=>{
                        props.navigation.navigate('RouteDetail',{
                            routeTitle:itemData.item.title,
                            routeId:itemData.item.id,
                            routeDistance:itemData.item.distance,
                            routeTime:itemData.item.time,
                            allcoords:coords
                           

                        });
                    }}
                />
            )}
                 />
                 
                 
                
</View>
                 
    );
};

RoutesListScreen.navigationOptions=navData=>{
    return{
        headerTitle:'All Routes',
        headerRight:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Add Route' iconName='md-add' onPress={()=>{ 
                navData.navigation.navigate('NewRoute')}
            }/>
        </HeaderButtons>
};
}

const styles=StyleSheet.create({
    text:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column'
    }
});

export default RoutesListScreen;