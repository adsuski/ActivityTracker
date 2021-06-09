import React,{useState, useEffect, useRef,useCallback} from 'react';
import MapView, {Polyline} from 'react-native-maps';
import {StyleSheet,View,Text,Dimensions, Button ,Alert,TouchableOpacity} from 'react-native';
import * as Location from 'expo-location';
import * as geolib from 'geolib';

import Colors from '../constants/Colors';


const MapScreen=props=>{
  const beginning=props.navigation.getParam('initial');
 const initialLocation={
      latitude:beginning?beginning.latitude: 51.7639,
      longitude:beginning?beginning.longitude:19.4678,
      latitudeDelta:0.0052,
      longitudeDelta:0.0051,
  };

const[currentlyDiplayedMap,setCurrentlyDisplayedMap]=useState(initialLocation)
const [coordinates,setCoordinates] = useState([]);
const [isPressed,setIsPressed]=useState(false);
const [distance,setDistance]=useState(0);
const[seconds,setSeconds]=useState(0);


const secondsRef=useRef('');
const prevPressed=useRef('');
const coordinatesRef=useRef('');
const distanceRef=useRef('');

const saveDistanceHandler=useCallback(()=>{
  props.navigation.navigate('NewRoute',{routeDistance:distanceRef.current,routeTime:secondsRef.current,routeCoords:coordinatesRef.current})

},[distanceRef.current,secondsRef.current,coordinatesRef.current])



useEffect(() => {
 props.navigation.setParams({saveDistance:saveDistanceHandler})

  distanceRef.current=distance;
  coordinatesRef.current=coordinates;
  prevPressed.current=isPressed;
  const secondsToFormattedTime=(d)=>{
    d = Number(d);
    let hours = Math.floor(d / 3600);
    let minutes = Math.floor(d % 3600 / 60);
    let seconds = Math.floor(d % 3600 % 60);
    
  
    let formatted=hours.toString().padStart(2, '0')+":"+minutes.toString().padStart(2, '0')+":"+seconds.toString().padStart(2, '0');
    return (formatted); 
  }
  secondsRef.current=secondsToFormattedTime(seconds);
  
  if(coordinates.length>1){  
      
  
      setCurrentlyDisplayedMap({
        ...currentlyDiplayedMap,
        latitude: coordinates[coordinates.length-1].latitude,
        longitude: coordinates[coordinates.length-1].longitude,
        });
        
  }

},[coordinates,isPressed,distance,seconds,saveDistanceHandler,beginning]);



const startTracking=async()=>{
  setIsPressed(prev=>!prev);
  
  async function boo(){
    await Location.getCurrentPositionAsync({timeout:5000});
    setSeconds(prevTime=>prevTime+1);
       if(prevPressed.current===true){
         setTimeout(boo,1000);
        }
    };

    boo();

  async function foo() {
      const location = await Location.getCurrentPositionAsync({
        timeout:8000,
        accuracy:6
      });
      setCoordinates((prevCords)=>{
        return prevCords.concat({
          latitude:location.coords.latitude,
          longitude: location.coords.longitude
          });
      });

    if(coordinatesRef.current.length>1){
      let distanceBetween=geolib.getDistance(
      coordinatesRef.current[coordinatesRef.current.length-2],
      coordinatesRef.current[coordinatesRef.current.length-1]
      );  
      
      setDistance((prevDistance)=>{
        return prevDistance+distanceBetween;
      });

    }
    
    if(prevPressed.current===true){
    setTimeout(foo,10000);
    }
  };
  foo();
  
};
 
return (
  <View style={{flex:1}}>
    <View style={styles.result}>
      
      
      <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={startTracking}
            style={styles.button}>
            <Text style={styles.start}>
              {!isPressed?'Start':'Stop'}</Text>
          </TouchableOpacity>
          
      </View>
      <View style={styles.info}>
          <Text style={styles.routesResults}>Distance: {(distanceRef.current/1000).toFixed(2)} km</Text>
          <Text style={styles.routesResults}>Duration: {secondsRef.current}</Text>
       
          
          
          
      </View>
    </View>

    <MapView style={styles.map} region={currentlyDiplayedMap} >
        <Polyline
          coordinates={coordinates}
          strokeColor="#cc8400"
          strokeWidth={4}
          lineCap="round"
          lineJoin="round"
        />
    </MapView>
  </View>
);
};

MapScreen.navigationOptions = navData=>{
  const saveFn = navData.navigation.getParam('saveDistance');
  return{headerRight:()=>(<TouchableOpacity style={styles.headerButton} onPress={saveFn}><Text style={styles.headerButtonText}>Save</Text></TouchableOpacity>)};
}
 
const styles=StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: (Dimensions.get('window').height)*3/4,
      },
      result:{
        width: Dimensions.get('window').width,
        height: (Dimensions.get('window').height)/4,
        backgroundColor: '#FFF6E5',
      },
      info:{
        justifyContent:'space-around',
        alignItems:'center',
        flexDirection:'column'
        
      },
      routesResults:{
        fontSize:22,
        marginVertical:5,
        fontFamily:'serif',
        color:Colors.primary
      },
      buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        
      },
      button:{
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        elevation:100,
        backgroundColor: Colors.primary,
        borderRadius: 40,
        marginVertical:10
      },
      start:{
        color:'white',
        fontSize:25,
        fontFamily:'sans-serif-light'
      },
      headerButtonText:{
        fontSize:18,
        color:'white',
      },
      headerButton:{
        marginHorizontal:20
      },
});
 
export default MapScreen;
 