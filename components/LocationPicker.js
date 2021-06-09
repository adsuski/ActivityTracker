import React,{useState,useEffect,useRef} from 'react';
import {View,Button,Text,ActivityIndicator,Alert,StyleSheet} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Colors from '../constants/Colors';
import MapPreview from './MapPreview';


const LocationPicker=props=>{
    const [isFetching,setIsFetching]=useState(false);
    const[initial,setInitial]=useState('');
   


    const[distance,setDistance]=useState(0);
    const[time,setTime]=useState('00:00');
    const [coords,setCoords]=useState([]);
    const distanceFromMap=props.navigation.getParam('routeDistance');
    const timeFromMap=props.navigation.getParam('routeTime'); 
    const coordsFromMap=props.navigation.getParam('routeCoords');

  

    const initialRef=useRef('');
  

    

    
    useEffect(()=>{
    initialRef.current=initial;
    
    
    if(distanceFromMap){
        setDistance(distanceFromMap);
        props.onGetDistance(distanceFromMap);
       
    }
    if(timeFromMap){
        setTime(timeFromMap);
        props.onGetTime(timeFromMap);
        // onTimeRecorded(timeFromMap);
    }
    if(coordsFromMap){
        setCoords(coordsFromMap);
        props.onGetCoords(coordsFromMap);
    }

    

    },[distanceFromMap,timeFromMap,coordsFromMap]);




    const verifyPermission=async ()=>{
        const result= await Permissions.askAsync(Permissions.LOCATION);
        if(result.status!=='granted'){
            Alert.alert('Insufficiant permissions!','You need to grant location permission to use this app',[{text:'Okay'}] );
            return false;
        }
        return true;
        
    };

    const getInitialLocation=async ()=>{
        const hasPermission= await verifyPermission();
        if(!hasPermission){
            return false;
        }
        try{
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({timeout: 5000});
            setInitial({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });

        }catch(err){
            console.log(err);
            Alert.alert('Sorry','Please give us a permission to location.',[{text:'Okay'}]);
        }
        setIsFetching(false);
        return true;
        
        
    };


    const goToMapScreen = async () => {
       
        const hasInitialLocation = await getInitialLocation()
        /
        setTimeout(()=>{
            if(!hasInitialLocation){
                return false;
            }
            try{
                props.navigation.navigate('Map',{initial:initial});

            }catch(err){
                console.log(err);
                Alert.alert('Sorry','Something went wrong with getting the location.',[{text:'Okay'}]);
            }
        },100);  
      };


    return (
        <View style={styles.locationPicker}>
            <MapPreview style={styles.mapPreview} location={initial} onPress={goToMapScreen} >
            {isFetching?
                (<ActivityIndicator size="large" color={Colors.primary} />
                ) : (
                <Text>No location chosen yet</Text>
                )}
            </MapPreview>
            <View style={styles.actions}>
            <Text>Distance:{(distance/1000).toFixed(2)}km</Text>
            <Text>Time:{time}</Text>
            </View>
            
           <View style={styles.actions}>
        <View style={styles.button}>
        <Button title="Track your route" color={Colors.primary} onPress={goToMapScreen} />
        </View>
        </View>
        </View>
        );
};

const styles =StyleSheet.create({
    locationPicker:{
        marginBottom:15,
    },
    mapPreview:{
        marginBottom:10,
        width:'100%',
        height:150,
        borderColor:'#ccc',
        borderWidth:1,
        
    },
    actions:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:'100%'
    },
    button:{
        margin:10
    }
});

export default LocationPicker;