import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
  } from "react-native";
import {
  Canvas,
  Circle,
  useClockValue,
  useComputedValue,
} from "@shopify/react-native-skia";

export const Corrida = (
  { indicador }: { indicador: string },

  

  ) => {
    
  const bike =require('./img/bike.png') 
  const vel = require('./img/vel.png') 
  const route = require('./img/route.png') 
  var final = indicador.split("B")
  final = final[1].split("C")
  var vel_max = final[0]
  final = final[1].split("D")
  var vel_med = final[0]
  final = final[1].split("E")
  var dist = final[0]
  var temp = final[1]


  //mtransform temp to int
  var hr = Math.floor(parseInt(temp) / 3600)
  var min = Math.floor(parseInt(temp) / 60)%60
  var sec = parseInt(temp) % 60
  temp = hr + ":" + min + ":" + sec
    

  return (
    <View style={styles.container}>
      
      
        <View style={styles.heartRateTitleWrapper}>
        <View style={styles.row}>
        <Image
          style={styles.imagem}
          source={bike}
        />
          <Text style={styles.title} >Corrida </Text>
        </View>
        
            
          <View style={styles.elementos}>
          
            <View style={styles.velocidade}>
            <Image
                  style={styles.imagem}
                  source={vel}
              />
                <Text >Med: {vel_med} km/h</Text>
                <Text >Max: {vel_max} km/h</Text>
            </View>

            <View style={styles.velocidade}>
            <Image
                  style={styles.imagem}
                  source={route}
              />
                <Text >Dist: {dist} m</Text>
                <Text >Tempo: {temp}</Text>
            </View>
            
            
          </View>

          </View>
        
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      height: 200,
      width: 300,
      backgroundColor: "#98d491",
      border: "1px solid black",
      borderRadius: 30,
      margin: 10,
    },
    heartRateTitleWrapper: {
      alignItems: "center",
    },
    elementos: {
      display : "flex",
      flexDirection: "row",

      alignItems: "center",
      backgroundColor: "#fec881",
      border: "1px solid black",
      justifyContent: "space-around",
      borderRadius: 30,
      padding: 10,
      position: "relative",
      width: 270,
      height: 150,
      top: 10,
      marginBottom :30,

    },
    title:{
      fontSize: 20,
      color: "black",

    },
    imagem:{
      width: 20,
      height: 20,
      marginRight: 10,
    },
    row:{
      display:"flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 3,
    },
    velocidade:{
      display:"flex",
      flexDirection: "column",
      alignItems: "center",



    }

    
  });