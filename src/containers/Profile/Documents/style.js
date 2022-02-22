import {StyleSheet} from 'react-native';
import Colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';

const styles = StyleSheet.create({
  actionSheet: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
  },
  modalText: {
    paddingVertical: 10,
    fontFamily: Dimension.CustomRegularFont,
    borderBottomWidth: 0.5,
    color: Colors.FontColor,
  },

  ContainerCss:{
    paddingHorizontal:Dimension.padding15,
    backgroundColor:Colors.WhiteColor
  },
  Notetxt:{
    fontSize:Dimension.font14,
    color:Colors.BrandColor,
    fontFamily:Dimension.CustomMediumFont,
    marginBottom:Dimension.margin5

  },
  NoteData:{
    fontSize:Dimension.font14,
    color:Colors.FontColor,
    fontFamily:Dimension.CustomMediumFont,
    
  },
  bottombtnWrap:{
    padding:Dimension.padding15,
    borderTopColor:Colors.grayShade2,
    borderTopWidth:1,
    backgroundColor:Colors.WhiteColor
  },

  //Modal Css

  modalContainer:{
    backgroundColor:Colors.WhiteColor,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    width:"100%",
    position:"absolute",
    bottom:0,
    padding:Dimension.padding20

  },
  ModalHeading:{
    fontSize:Dimension.font16,
    color:Colors.FontColor,
    fontFamily:Dimension.CustomSemiBoldFont,
    marginBottom:Dimension.margin5

  },
  Modaltext:{
    fontSize:Dimension.font14,
    color:Colors.FontColor,
    fontFamily:Dimension.CustomRegularFont,
    marginVertical:Dimension.margin15

  },
  ModalBtnWrap:{flexDirection:"row",marginTop:Dimension.margin20},
  ModalCss:{padding:0,margin:0}
});

export default styles;
