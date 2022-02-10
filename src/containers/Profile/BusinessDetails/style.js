import {StyleSheet} from 'react-native';
import Colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';


const styles = StyleSheet.create({
  UserDetailWrap:{
    backgroundColor:Colors.BrandColor,
    padding:Dimension.padding15,
    borderRadius:8,
  },
  ContainerCss:{
    backgroundColor:Colors.WhiteColor,
    paddingHorizontal:Dimension.padding15
  },
  UserName: {
    fontSize: Dimension.font14,
    color: Colors.WhiteColor,
    fontFamily: Dimension.CustomSemiBoldFont,
  
  },
  UserEmail: {
    fontSize: Dimension.font12,
    color: Colors.WhiteColor,
    fontFamily: Dimension.CustomRegularFont,

    
  },
  UserContact: {
    fontSize: Dimension.font12,
    color: Colors.WhiteColor,
    fontFamily: Dimension.CustomRegularFont,
    //marginTop: 5,
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
  
});

export default styles;
