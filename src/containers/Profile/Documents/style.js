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
    fontFamily:Dimension.CustomSemiBoldFont,
    marginBottom:Dimension.margin5

  },
  NoteData:{
    fontSize:Dimension.font13,
    color:Colors.FontColor,
    fontFamily:Dimension.CustomMediumFont,
    
  },
  bullet: {
    height: Dimension.height5,
    width: Dimension.width5,
    borderRadius: Dimension.width5,
    backgroundColor: Colors.blackColor,
    marginRight: Dimension.margin8,
    justifyContent:"flex-start",
    alignSelf:"center"
  },
  rowCss:{
    flexDirection:"row",
    marginBottom:Dimension.margin5
  },
  termsText:{
    fontSize:Dimension.font14,
    color:Colors.BrandColor,
    fontFamily:Dimension.CustomMediumFont,
    marginTop:Dimension.margin5,
    marginLeft:Dimension.margin25
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
