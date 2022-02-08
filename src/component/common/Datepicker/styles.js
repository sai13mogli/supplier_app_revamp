import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      padding: 20,
    },
    datePickerStyle: {
      width: 200,
      marginTop: 20,
    },
    date:{
     justifyContent:'flex-end',
     left:200,
     top:8
    },
    wrap:{
      flexDirection:'row'
      
    },
    dateText:{
     fontSize:18,
     top:10,
     right:10
    },
    dateView:{
      height: 45,
      left:10,
      paddingHorizontal: 25,
      borderWidth: 1,
      // borderColor: Colors.BORDERCOLOR,
      width: '94%',
      borderRadius:5,
      top:90,
      borderWidth:0.8,
    }
  });

  export default styles;