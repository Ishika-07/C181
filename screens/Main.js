import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from "expo-permissions";
import * as FaceDetector from 'expo-face-detector';


export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasCameraPermission: null,
            faces: []
        }
    }

    componentDidMount(){
        Permissions.askAsync(Permissions.CAMERA).then(
            (status)=>{
                this.setState({
                    hasCameraPermissions: status.status === "granted"
                })
            }
        )
    }
 
    onFacesDetected=({faces})=>{
 
     this.setState({
         faces: faces
     });
    };
    
    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />
        }
        if (hasCameraPermission === false) {
            return (
                <View style={styles.container}>
                    <Text>No access to camera</Text>
                </View>
            )
        }
        return (
            <View style={styles.container}>
            <SafeAreaView style={styles.droidSafeArea} />
            <View style={styles.headingContainer}>
                <Text style={styles.titleText}>LOOK ME</Text>
            </View>
            <View style={styles.cameraStyle}>
                <Camera 
                    type = {Camera.Constants.Type.front}
                    faceDetectorSettings = {{
                        mode: FaceDetector.FaceDetectorMode.fast, 
                        detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                        runClassifications: FaceDetector.FaceDetectorClassifications.all,
                    }}
                    onFacesDetected = {this.onFacesDetected}
                    onFacesDetectionError = {(error)=>{
                        console.log("Given below is the error in the code");
                        console.log(error);
                    }}
                />
            </View>
            <View style={styles.actionContainer}>

            </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    headingContainer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 30,
        color: "black"
    },
    cameraStyle: {
        flex: 0.65
    },
    actionContainer:{

    },
});