import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    inputField: {
        flexDirection:'row',
        height: 50,
        top:40,
        // paddingHorizontal:100,
        borderWidth:1,
        borderRadius:5,
        backgroundColor: '#fff',
        borderColor:'grey',
        width:'70%'
        // fontFamily: Dimension.CustomMediumFont,
        // color: colors.PrimaryTextColor,
    },
    magnifyIcon:{
        color:'black',
        
    }
   
  
});

export default styles;