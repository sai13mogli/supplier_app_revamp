import {View, Text, Image} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {getImageUrl} from '../services/orders';

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
      style={{
        margin: 8,
        padding: 12,
        borderRadius: 4,
        backgroundColor: '#fff',
      }}>
      <Image
        source={{
          uri:
            orderImage ||
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
        }}
        style={{
          height: 60,
          width: 60,
          alignSelf: 'center',
        }}
      />
      <Text style={{color: 'red'}}>{msn}</Text>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={showMoreTxt ? undefined : 1}
        style={{color: '#000'}}>
        {productName}
      </Text>
      {lengthMore ? (
        <Text onPress={toggleShowMoreTxt} style={{color: 'red'}}>
          {showMoreTxt ? 'Read less' : 'Read more'}
        </Text>
      ) : null}
      <Text style={{color: '#000'}}>Qty - {quantity}</Text>
      <Text style={{color: '#000'}}>PO ID - {orderRef}</Text>
      <Text style={{color: '#000'}}>PO Date - {getTime(createdAt)}</Text>
      <Text style={{color: '#000'}}>PO Item ID - {itemRef}</Text>
      <Text style={{color: '#000'}}>
        TP/Unit - ₹{Math.floor(transferPrice)}
      </Text>
      <Text style={{color: '#000'}}>Product HSN - {hsn}</Text>
      <Text style={{color: '#000'}}>Date - {getTime(pickupDate)}</Text>
      <Text style={{color: '#000'}}>{orderTypeString}</Text>
      <Text style={{color: '#000'}}>
        {shipmentMode == 2
          ? 'Dropship'
          : shipmentMode == 3
          ? 'Door Delivery'
          : 'Oneship'}
      </Text>
      {isVmi ? <Text style={{color: '#000'}}>VMI</Text> : null}
      <Text style={{color: '#000'}}>{shipmentModeString}</Text>
    </View>
  );
};

export default Ordercard;
