import {StyleSheet} from 'react-native';
import Colors from '../../Theme/Colors';
import Dimension from '../../Theme/Dimension';


const styles = StyleSheet.create({
  userName: {
    fontSize: Dimension.font14,
    color: Colors.textColor,
    fontFamily: Dimension.CustomRegularFont,
    marginTop: 5,
  },
  welcomeText: {
    fontSize: Dimension.font10,
    fontWeight: '400',
    color: Colors.textColor,
    lineHeight: 16,
    fontFamily: Dimension.CustomRegularFont,
  },
  statusBar: {
    marginVertical: 24,
  },
  actionSheet: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
  },
  modalText: {
    paddingVertical: Dimension.padding10,
    fontFamily: Dimension.CustomRegularFont,
    borderBottomWidth: 0.5,
    color: Colors.FontColor
  },
  labelStyle: {
    fontSize: Dimension.font10,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
    marginLeft: Dimension.margin12,
    marginBottom: Dimension.margin5,
  
  },
  starIcon:{
    color:Colors.BrandColor,
    fontSize: Dimension.font10,
    
    fontFamily: Dimension.CustomMediumFont,

  },
});

export default styles;
