import {View, Text, Image,StyleSheet} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {getImageUrl} from '../services/orders';
import Dimension from '../Theme/Dimension';
import Colors from '../Theme/Colors';
import CustomeIcon from './common/CustomeIcon';

const Ordercard = props => {
  const {
    msn,
    quantity,
    orderRef,
    createdAt,
    itemRef,
    pickupDate,
    transferPrice,
    hsn,
    productName,
    orderTypeString,
    shipmentMode,
    isVmi,
    shipmentModeString,
  } = props;
  const [orderImage, setOrderImage] = useState(null);
  const [showMoreTxt, setShowMoreTxt] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    const {data} = await getImageUrl(msn);
    let imageUrl =
      'https://cdn.moglix.com/' +
      (data &&
        data.productBO &&
        data.productBO.productPartDetails &&
        data.productBO.productPartDetails[msn] &&
        data.productBO.productPartDetails[msn].images &&
        data.productBO.productPartDetails[msn].images[0] &&
        data.productBO.productPartDetails[msn].images[0].links.medium);
    let validUrl = imageUrl.split('/');
    if (!validUrl.includes('null')) {
      setOrderImage(imageUrl);
    }
  };

  const getTime = time => {
    let months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ];
    let date = new Date(Number(time));
    return `${months[date.getMonth()]} ${date.getDate()},${date.getFullYear()}`;
  };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length > 1);
  }, []);

  const toggleShowMoreTxt = () => {
    setShowMoreTxt(!showMoreTxt);
  };

  const getShipmentMode = shipMode => {
    let shipmentModeTxt = 'Oneship';
    if (shipMode == 2) {
      shipmentModeTxt = 'Dropship';
    } else if (data.shipmentMode == 3) {
      shipmentModeTxt = 'Door Delivery';
    }
  };

  return (
    <View
      style={styles.orderCardwrap}>
        <View style={styles.leftpart}>

        
      <Image
        source={{
          uri:
            orderImage ||
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
        }}
        style={styles.imgStyle}
      />
      <View style={styles.quantityTxt}>
       <Text style={styles.TitleLightTxt}>Qty - <Text style={styles.TitleBoldTxt}>{quantity}</Text></Text>
       </View>
       </View>
       <View style={styles.rightPart}>

       
      <Text style={styles.msnName}>{msn}</Text>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={showMoreTxt ? undefined : 1}
        style={styles.productName}>
        {productName}
      </Text>
      {lengthMore ? (
        <Text onPress={toggleShowMoreTxt} style={styles.readMoretxt}>
          {showMoreTxt ? 'Read less' : 'Read more'}
        </Text>
      ) : null}
      <View style={{flexDirection:"row"}}>

      
      <View>
      <Text style={styles.TitleLightTxt}>PO ID - <Text style={styles.TitleBoldTxt}>{orderRef}</Text></Text>
      <Text style={styles.TitleLightTxt}>PO Date - <Text style={styles.TitleBoldTxt}>{getTime(createdAt)}</Text></Text>
      <Text style={styles.TitleLightTxt}>PO Item ID - <Text style={styles.TitleBoldTxt}>{itemRef}</Text></Text>
      </View>
     
      <View>
      <Text style={styles.TitleLightTxt}>
        TP/Unit -  <Text style={styles.TitleBoldTxt}>₹{Math.floor(transferPrice)}</Text>
      </Text>
      <Text style={styles.TitleLightTxt}>Product HSN - <Text style={styles.TitleBoldTxt}>{hsn}</Text></Text>
      <Text style={styles.TitleLightTxt}>Date - <Text style={styles.TitleBoldTxt}>{getTime(pickupDate)}</Text></Text>
      </View>
      </View>
<View style={{flexDirection:"row"}}>
<Text style={styles.GstWrapTxt}>{orderTypeString}</Text>
      <Text style={styles.shipmentModeWrap}>
        {shipmentMode == 2
          ? 'Dropship'
          : shipmentMode == 3
          ? 'Door Delivery'
          : 'Oneship'}
      </Text>
      {isVmi ? <Text style={styles.VMIWrap}>VMI</Text> : null}
      <Text style={styles.shipmentModeStringWrap}>{shipmentModeString}</Text>
</View>
</View> 
    </View>
  );
};
const styles = StyleSheet.create({
 
  TitleLightTxt: {
    fontSize: Dimension.font10,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
  },
  TitleBoldTxt: {
    fontSize: Dimension.font10,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomBoldFont,
  },
  msnName:{
    fontSize: Dimension.font12,
    color: Colors.BrandColor,
    fontFamily: Dimension.CustomSemiBoldFont,
  },
  productName:{
    fontSize: Dimension.font12,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
  },
  readMoretxt:{
    fontSize: Dimension.font12,
    color: Colors.BrandColor,
    fontFamily: Dimension.CustomMediumFont,
  },
  GstWrapTxt:{
    paddingVertical:Dimension.padding4,
    paddingHorizontal:Dimension.padding10,
    fontSize: Dimension.font10,
    color: Colors.BrandColor,
    fontFamily: Dimension.CustomMediumFont,
    backgroundColor:Colors.LightBrandColor,
    borderRadius:2,
    marginRight:Dimension.margin5
  },
  shipmentModeWrap:{
    paddingVertical:Dimension.padding4,
    paddingHorizontal:Dimension.padding10,
    fontSize: Dimension.font10,
    color: Colors.BrandColor,
    fontFamily: Dimension.CustomMediumFont,
    backgroundColor:Colors.LightBrandColor,
    borderRadius:2,
    marginRight:Dimension.margin5
  },
  shipmentModeStringWrap:{
   
      paddingVertical:Dimension.padding4,
      paddingHorizontal:Dimension.padding10,
      fontSize: Dimension.font10,
      color: Colors.BrandColor,
      fontFamily: Dimension.CustomMediumFont,
      backgroundColor:Colors.LightBrandColor,
      borderRadius:2,
      marginRight:Dimension.margin5
  },
  VMIWrap:{
   
    paddingVertical:Dimension.padding4,
    paddingHorizontal:Dimension.padding10,
    fontSize: Dimension.font10,
    color: Colors.BrandColor,
    fontFamily: Dimension.CustomMediumFont,
    backgroundColor:Colors.LightBrandColor,
    borderRadius:2,
    marginRight:Dimension.margin5
},
orderCardwrap:{
  borderRadius:8,
borderWidth:1,
borderColor:Colors.BoxBorderColor,
backgroundColor:Colors.WhiteColor,
marginBottom:Dimension.margin8,
paddingHorizontal:Dimension.padding12,
paddingVertical:Dimension.padding12,
flex:1,
flexDirection:"row"
},
leftpart:{
flex:2,
marginRight:Dimension.margin12
},
rightPart:{
flex:7
},
imgStyle:{
  borderRadius:4,
  backgroundColor:Colors.WhiteColor,
  padding:2,
  height:Dimension.width50,
  height:Dimension.height50,
  //alignSelf:'center'
},
quantityTxt:{
alignSelf:"center",
backgroundColor:"#E2E2E2",
borderRadius:2,
marginTop:Dimension.margin8,
width:"100%",
alignItems:"center",
paddingVertical:Dimension.padding5

},
});
export default Ordercard;
