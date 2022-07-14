import {StyleSheet} from 'react-native';
import Colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';

const styles = StyleSheet.create({
    promoterheaderWrap:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginBottom:Dimension.margin10,
       // backgroundColor:"#ccc"
    },
    headingTxt:{
        fontSize:Dimension.font14,
        fontFamily:Dimension.CustomMediumFont,
        color:Colors.FontColor
    },
    promoterWrap:{
       borderBottomColor:"#C9C9C9",
       borderBottomWidth:1 ,
       paddingBottom:Dimension.padding12,
       marginBottom:Dimension.margin12
    },
    BtnWrap:{
        padding: Dimension.padding15,
        borderTopColor: Colors.grayShade2,
        borderTopWidth: 1,
        backgroundColor: "#fff",
        position:"absolute",
        bottom:Dimension.height65,
        left:0,
        flexDirection:"row",
        flex:1,
        width:"100%"
    },
    topbdr: {
        alignSelf: 'center',
        height: 3,
        backgroundColor: Colors.modalBorder,
        borderRadius: 2,
        width: Dimension.width70,
      },
      modalContainer: {
        backgroundColor: Colors.WhiteColor,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
        position: 'absolute',
        bottom: 0,
       
       
      },
      modalTopWrap:{
        padding: Dimension.padding20,
        paddingTop:Dimension.padding5
      },
      ModalHeading: {
        fontSize: Dimension.font16,
        color: Colors.FontColor,
        fontFamily: Dimension.CustomSemiBoldFont,
        marginBottom: Dimension.margin5,
        paddingTop:Dimension.padding15
      },
      termsText: {
        fontSize: Dimension.font14,
        color: Colors.BrandColor,
        fontFamily: Dimension.CustomMediumFont,
        //marginTop: Dimension.margin5,
        marginLeft: Dimension.margin35,
        textDecorationLine: 'underline'
        
      },
      ModalBtnWrap: {flex: 1, 
        flexDirection: 'row', 
        marginTop: Dimension.margin20,
        borderTopColor:Colors.grayShade2,
        borderTopWidth:1,
        padding:Dimension.padding15
    }
        ,
 
});

export default styles;
