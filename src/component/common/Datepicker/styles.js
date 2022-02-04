import {StyleSheet} from 'react-native';
import {Scale,Colors} from '../../../../src/CommonConfig';

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
    dateView:{
      height: Scale(45),
      paddingHorizontal: Scale(120),
      borderWidth: Scale(1),
      borderColor: Colors.BORDERCOLOR,
      width: '100%',
      borderRadius:Scale(5),
      top:90,
      borderWidth:0.8,
    }
  });

  export default styles;