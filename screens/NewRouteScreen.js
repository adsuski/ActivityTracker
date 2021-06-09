import React, {useState,useCallback} from 'react';
import {ScrollView,StyleSheet,View,Text,TextInput,Button} from 'react-native';
import {useDispatch} from 'react-redux'

import Colors from '../constants/Colors';
import * as routesActions from '../store/routes-actions';
import * as coordsActions from '../store/coords-actions';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';



const NewRouteScreen=props =>{

    const [titleValue,setTitleValue]=useState('');
    const [selectedImage,setSelectedImage]=useState();
    const [traveledDistance,setTraveledDistance]=useState();
    const [traveledTime,setTraveledTime]=useState();
    const [coordsOfTravel,setCoordsOfTravel]=useState([]);

    const dispatch=useDispatch();
    const disp=useDispatch();

    const titleChangeHandler=text=>{
        setTitleValue(text);
    };

    const imageTakenHandler=imagePath=>{
        setSelectedImage(imagePath);
    }

    const distanceHandler=useCallback(distance=>{
        setTraveledDistance(distance);
    },[setTraveledDistance])
    
    const timeHandler=useCallback(time=>{
        setTraveledTime(time);

        

    },[setTraveledTime])

    const coordsHandler=useCallback(coords=>{
        setCoordsOfTravel(coords);
    },[setCoordsOfTravel])



    const saveRouteHandler= async()=>{
        const dateOfRoute = new Date().toString();
       
        dispatch(routesActions.addRoute(titleValue,selectedImage,traveledDistance,traveledTime,dateOfRoute));

        for (const id in coordsOfTravel){
            disp(coordsActions.addCoords(coordsOfTravel[id].latitude,coordsOfTravel[id].longitude,dateOfRoute));;
        }
        props.navigation.goBack();
    };



    return (
    <ScrollView>
    <View style={styles.form}>
        <Text style={styles.label}>Title:</Text>
        <TextInput style={styles.textInput} onChangeText={titleChangeHandler} value={titleValue} /> 
        <ImagePicker onImageTaken={imageTakenHandler}/>
        <LocationPicker navigation={props.navigation} onGetDistance={distanceHandler} onGetTime={timeHandler} onGetCoords={coordsHandler}/>
        <Button title="Save Route" color={Colors.primary} onPress={saveRouteHandler} />
      
        
</View>

</ScrollView>);
};

NewRouteScreen.navigationOptions={
    headerTitle:'Add Route'
}

const styles=StyleSheet.create({
    form:{
        margin:30,
    },
    label:{
        fontSize:18,
        marginBottom:15,
        
    },
    textInput:{
        borderBottomColor: '#ccc',
        borderBottomWidth:1,
        marginBottom:15,
        paddingHorizontal:2,
        paddingVertical:4,
    }
});

export default NewRouteScreen;