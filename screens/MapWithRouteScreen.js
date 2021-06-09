import React,{useEffect,useState} from 'react';
import {StyleSheet,View,Dimensions, Button} from 'react-native';
import MapView, {Polyline} from 'react-native-maps';







const MapWithRouteScreen=props =>{
    const coords=props.navigation.getParam('coordsOfRoute');
    const center=props.navigation.getParam('center');


    const [initialLocation,setInitialLocation]=useState({
        latitude: center?center.latitude:51.7639,
        longitude:center?center.longitude:19.4678,
        latitudeDelta:0.0552,
        longitudeDelta:0.0551,
    });

    useEffect(()=>{

    },
    [])
   

    return (<View style={styles.screen}>
        
        <MapView
            style={styles.map} 
            region={initialLocation}  
            >
            <Polyline coordinates={coords} strokeColor="#cc8400"
          strokeWidth={4}
          lineCap="round"
          lineJoin="round"
          />
        </MapView>
</View>
                 
    );
};

MapWithRouteScreen.navigationOptions=navData=>{
    return{
        headerTitle: navData.navigation.getParam('routeTitle')
        
};
}

const styles=StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column'
    },
    map: {
        width: Dimensions.get('window').width,
        height: (Dimensions.get('window').height),
      },
});

export default MapWithRouteScreen;