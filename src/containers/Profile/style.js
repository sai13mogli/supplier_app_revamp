import {StyleSheet} from 'react-native';
import Colors from '../../Theme/Colors'
import Dimension from '../../Theme/Colors'

const styles = StyleSheet.create({
    userName:{
        fontSize:Dimension.font14,
        color:Colors.textColor,
        fontFamily:Dimension.CustomBoldFont,
        marginTop:5,
    },
    welcomeText:{
        fontSize:Dimension.font10,
        fontWeight:'400',
        color:Colors.textColor,
        lineHeight:16,
        fontFamily:Dimension.CustomRegularFont,
    },
    statusBar: {
        marginVertical: 24,
      },
});

export default styles;