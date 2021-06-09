import React ,{useState} from 'react';
import {View,Button,Text,StyleSheet,Image,Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Colors from '../constants/Colors';

const ImgPicker=props=>{
    const [pickedImage,setPickedImage]=useState();

    const verifyPermission=async ()=>{
        const result= await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        if(result.status!=='granted'){
            Alert.alert('Insufficiant permissions!','You need to grant gallery permission to use this app',[{text:'Okay'}] );
            return false;
        }
        return true;
    };


    const takeImageHandler=async()=>{
        const hasPermission=await verifyPermission()
        if(!hasPermission){
            return;
        }
        const image= await ImagePicker.launchImageLibraryAsync({
            allowsEditing:true,
            aspect:[16,9],
            quality:0.5
,        });
            setPickedImage(image.uri);
            props.onImageTaken(image.uri);
    };

    return <View style={styles.imagePicker}>
        <View style={styles.imagePreview}>
            {!pickedImage ? (<Text>No image picker yet.</Text>):
           ( <Image style={styles.image} source ={{uri:pickedImage}}/>)}
        </View>
        <Button title="Take Image" color={Colors.primary} onPress={takeImageHandler} />

    </View>
};

const styles=StyleSheet.create({
    imagePicker:{
        alignItems:'center',
        marginBottom:15,
    },
    imagePreview:{
        width:'100%',
        height:200,
        marginBottom:10,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#ccc',
        borderWidth:1,
    },
    image:{
        width:'100%',
        height:'100%'
    }
});

export default ImgPicker;
