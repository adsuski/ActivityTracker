import React,{useEffect} from 'react';
import {StyleSheet,View,Text,Image,ScrollView, Button,Dimensions} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';



import * as coordsActions from '../store/coords-actions';
import Colors from '../constants/Colors';
import MapPreview from '../components/MapPreview';
import * as geolib from 'geolib';

const RouteDetailScreen=props =>{
    const routeId=props.navigation.getParam('routeId');
    const routeTitle=props.navigation.getParam('routeTitle');
    const coords=props.navigation.getParam('allcoords');
    const selectedRoute=useSelector(state=>state.routes.routes.find(route=>route.id===routeId));
  
    const passedCoords =[];
    
  
    const goToRouteMap=()=>{
    for (const id in coords){
            if(selectedRoute.dateOfRoute===coords[id].dateOfCoords){
              passedCoords.push({latitude:coords[id].latitude,longitude:coords[id].longitude});
            }
      }
    
      const center =geolib.getCenterOfBounds(passedCoords);
      props.navigation.navigate('RouteMap',{routeTitle:routeTitle,coordsOfRoute:passedCoords,center:center})
  
}


    
    
    return (
      <ScrollView contentContainerStyle={{alignItems:'center'}}>
        
          <View style={styles.resultContainer}>
            <View style={styles.locationContainer}>
              <View  style={styles.addressContainer} >
                <Text style={styles.nameOfCategory}>Distance:</Text>
                <Text style={styles.numbers}>{(selectedRoute.distance/1000).toFixed(2)}km</Text>
              </View>
            </View>
            <View style={styles.locationContainer}>
              <View  style={styles.addressContainer} >
                <Text style={styles.nameOfCategory}>Time:</Text>
                <Text style={styles.numbers}>{selectedRoute.time}</Text>
              </View> 
            </View>
          </View>
          <Image source={{uri: selectedRoute.imageUri}}  style={styles.image}/>
          <View style={styles.buttonContainer}>
          <Button title='go to map with route' onPress={goToRouteMap} color={Colors.primary} style={styles.button}/>
          </View>
      </ScrollView>
    );
    };

RouteDetailScreen.navigationOptions=navData=>{
    return{
        headerTitle: navData.navigation.getParam('routeTitle')
    };
};

const styles = StyleSheet.create({
    image: {
      height: '30%',
      minHeight: 300,
      width: '100%',
      backgroundColor: '#ccc'
    },
    locationContainer: {
      marginVertical: 20,
      marginHorizontal:15,
      width: '35%',
      maxWidth: 350,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 5,
      backgroundColor: 'white',
      borderRadius: 10
    },
    addressContainer: {
      padding: 20
    },
    nameOfCategory: {
      color: Colors.primary,
      textAlign: 'center',
      fontSize:20
    },
    numbers: {
      color: Colors.primary,
      textAlign: 'center',
      fontSize:18
    },


    mapPreview: {
      width: '100%',
      maxWidth: 350,
      height: 300,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10
    },
    resultContainer:{
      flexDirection:'row',
      
      alignItems:'center',
      
    },
    buttonContainer:{
      margin:10,
      
    },
    button:{
      fontSize:18
    }
  });

export default RouteDetailScreen;