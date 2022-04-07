import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
    PermissionsAndroid,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { getImageUrl, markOutForOrderApi } from '../services/orders';
import Dimension from '../Theme/Dimension';
import Colors from '../Theme/Colors';
import CustomeIcon from './common/CustomeIcon';
import Modal from 'react-native-modal';
import {
    acceptOrder,
    getpoChallan,
    rejectOrder,
    createManifestApi,
} from '../services/orders';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PackNowModal from '../component/PackNowModal';
import RejectModal from '../component/RejectModal';
import MarkOutForDeliveryModal from '../component/MarkOutForDeliveryModal';
import ViewLSPModal from '../component/ViewLSPModal';
import SplitHistoryModal from '../component/SplitHistoryModal';
import ProofOfDeliveryModal from '../component/ProofOfDeliveryModal';
import AcceptModal from './AcceptModal';
import AddView from './AddView';
import SplitQuantityModal from './SplitQuantityModal';
import { useNavigation } from '@react-navigation/native'

const deviceWidth = Dimensions.get('window').width;

const InvoiceOmsCard = props => {
    const {
        msn,
        quantity,
        totalPrice,
        podId,
        TpUnit,
        productName,
        taxpercent,
        actionCTA,
        itemId,
        bulkItemIds,
        selectItemId,


    } = props;

    const [orderImage, setOrderImage] = useState(null);
    const [showMoreTxt, setShowMoreTxt] = useState(false);
    const [lengthMore, setLengthMore] = useState(false);

    const { navigate } = useNavigation();
    const navigation = useNavigation();

    useEffect(() => {
        fetchImage();
        if (actionCTA && actionCTA.length > 2) {
            setShowMoreCTA(true);
        }
    }, []);

    const fetchImage = async () => {
        const { data } = await getImageUrl(msn);
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

    const getTime = (time, acceptrejectOrder) => {
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
        if (acceptrejectOrder) {
            return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        }
        return `${months[date.getMonth()]} ${date.getDate()},${date.getFullYear()}`;
    };



    const toggleShowMoreTxt = () => {
        setShowMoreTxt(!showMoreTxt);
    };



    const renderOrderDetails = (fromModal, fromCTA) => {
        return (
            <>
                <View
                    style={[styles.orderCardwrapInner]}>
                    <CustomeIcon
                        name={
                            (bulkItemIds || []).includes(itemId)
                                ? 'checkbox-tick'
                                : 'checkbox-blank'
                        }
                        color={
                            (bulkItemIds || []).includes(itemId)
                                ? Colors.BrandColor
                                : Colors.FontColor
                        }
                        size={Dimension.font22}
                        onPress={() => selectItemId(itemId)}
                        style={{
                            position: 'absolute',
                            right: 0,
                            zIndex: 9999,
                        }}></CustomeIcon>

                    <View style={[styles.leftpart]}>
                        <Image
                            source={require('../assets/images/Prd.png')}
                            style={[fromModal ? styles.imgStyleModal : styles.imgStyle]}
                        />
                        <View style={styles.quantityTxt}>
                            <Text style={styles.TitleLightTxt}>
                                Qty - <Text style={styles.TitleBoldTxt}>{quantity}</Text>
                            </Text>
                        </View>

                    </View>
                    <View style={styles.rightPart}>
                        <Text
                            style={[{ color: Colors.BrandColor }, styles.msnName,
                            ]}>
                            {msn}
                        </Text>

                        <Text style={styles.productName}>{productName}</Text>
                        <Text onPress={toggleShowMoreTxt} style={styles.readMoretxt}>
                            {showMoreTxt ? 'Read less' : 'Read more'}
                        </Text>


                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginRight: Dimension.margin20 }}>
                                <Text style={styles.TitleLightTxt}>
                                    PO ID - <Text style={styles.TitleBoldTxt}>{podId}</Text>
                                </Text>
                                <Text style={styles.TitleLightTxt}>
                                    Total Price -{' '}
                                    <Text style={styles.TitleBoldTxt}>
                                        {Math.floor(totalPrice)}
                                    </Text>
                                </Text>

                            </View>

                            <View>
                                <Text style={styles.TitleLightTxt}>
                                    TP/Unit -{' '}
                                    <Text style={styles.TitleBoldTxt}>
                                        ₹{Math.floor(TpUnit)}
                                    </Text>
                                </Text>
                                <Text style={styles.TitleLightTxt}>
                                    Product HSN - <Text style={styles.TitleBoldTxt}>{taxpercent}</Text>
                                </Text>
                            </View>
                        </View>

                    </View>
                </View >

            </>
        );
    };

    return (
        <>
            <View style={styles.orderCardwrap} >
                {renderOrderDetails(false, '')}
            </View>

        </>
    );
};

const styles = StyleSheet.create({
    TitleLightTxt: {
        fontSize: Dimension.font10,
        color: Colors.FontColor,
        fontFamily: Dimension.CustomRegularFont,
        marginBottom: Dimension.margin5,
    },
    TitleBoldTxt: {
        fontSize: Dimension.font10,
        color: Colors.FontColor,
        fontFamily: Dimension.CustomBoldFont,
    },
    msnName: {
        fontSize: Dimension.font12,
        // color: Colors.BrandColor,
        fontFamily: Dimension.CustomSemiBoldFont,
    },
    productName: {
        fontSize: Dimension.font12,
        color: Colors.FontColor,
        fontFamily: Dimension.CustomRegularFont,
        marginBottom: Dimension.margin10,
        marginTop: Dimension.margin5,
    },
    readMoretxt: {
        fontSize: Dimension.font12,
        color: Colors.BrandColor,
        fontFamily: Dimension.CustomMediumFont,
    },
    GstWrapTxt: {
        paddingVertical: Dimension.padding4,
        paddingHorizontal: Dimension.padding10,
        fontSize: Dimension.font10,
        color: Colors.BrandColor,
        fontFamily: Dimension.CustomMediumFont,
        backgroundColor: Colors.LightBrandColor,
        borderRadius: 2,
        marginRight: Dimension.margin5,
    },
    shipmentModeWrap: {
        paddingVertical: Dimension.padding4,
        paddingHorizontal: Dimension.padding10,
        fontSize: Dimension.font10,
        color: Colors.oneShipTxt,
        fontFamily: Dimension.CustomMediumFont,
        backgroundColor: Colors.oneShipLight,
        borderRadius: 2,
        marginRight: Dimension.margin5,
    },
    shipmentModeStringWrap: {
        paddingVertical: Dimension.padding4,
        paddingHorizontal: Dimension.padding10,
        fontSize: Dimension.font10,
        color: Colors.ApproveStateColor,
        fontFamily: Dimension.CustomMediumFont,
        backgroundColor: Colors.pickupLight,
        borderRadius: 2,
        marginRight: Dimension.margin5,
    },
    VMIWrap: {
        paddingVertical: Dimension.padding4,
        paddingHorizontal: Dimension.padding10,
        fontSize: Dimension.font10,
        color: Colors.VmiTxt,
        fontFamily: Dimension.CustomMediumFont,
        backgroundColor: Colors.VmiLight,
        borderRadius: 2,
        marginRight: Dimension.margin5,
    },
    orderCardwrap: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.BoxBorderColor,
        backgroundColor: Colors.WhiteColor,
        marginBottom: Dimension.margin8,
        paddingHorizontal: Dimension.padding12,
        paddingVertical: Dimension.padding12,
        flex: 1,

        marginHorizontal: Dimension.margin5,
    },
    orderCardwrapInner: {
        flexDirection: 'row',
        flex: 1,
    },
    leftpart: {
        flex: 2,
        marginRight: Dimension.margin12,
    },
    rightPart: {
        flex: 8,
    },
    imgStyle: {
        borderRadius: 4,
        backgroundColor: Colors.WhiteColor,
        padding: 2,
        width: Dimension.width50,
        height: Dimension.height50,
        //alignSelf:'center'
    },

    imgStyleModal: {
        borderRadius: 4,
        backgroundColor: Colors.WhiteColor,
        padding: 2,
        width: 250,
        height: 250,
        alignSelf: 'center',
    },
    quantityTxt: {
        alignSelf: 'center',
        backgroundColor: '#E2E2E2',
        borderRadius: 2,
        marginTop: Dimension.margin8,
        width: '60%',
        alignItems: 'center',
        paddingVertical: Dimension.padding5,
    },
    modalContainer: {
        backgroundColor: Colors.WhiteColor,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        paddingTop: Dimension.padding10,
    },
    acceptCtabtn: {
        flex: 5,
        backgroundColor: Colors.BrandColor,
        borderRadius: 4,
        paddingVertical: Dimension.padding8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Dimension.margin10,
    },
    acceptCtaTxt: {
        fontFamily: Dimension.CustomSemiBoldFont,
        color: Colors.WhiteColor,
        fontSize: Dimension.font12,
    },
    rejectCtabtn: {
        flex: 5,
        backgroundColor: Colors.grayShade12,
        borderRadius: 4,
        paddingVertical: Dimension.padding8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rejectCtaTxt: {
        fontFamily: Dimension.CustomSemiBoldFont,
        color: Colors.FontColor,
        fontSize: Dimension.font12,
    },
    DownloadPoBtn: {
        flex: 1,
        backgroundColor: Colors.grayShade12,
        borderRadius: 4,
        paddingVertical: Dimension.padding8,
        justifyContent: 'center',
        alignItems: 'center',

        flexBasis: '100%',
        marginTop: Dimension.margin10,
    },
    showMoreCta: {
        marginLeft: Dimension.margin10,
        paddingVertical: Dimension.padding6,
    },
    LeftpartModal: { flex: 1 },
    orderCardwrapInnerModal: { paddingHorizontal: Dimension.padding15 },
    rupeeSign: {
        fontFamily: Dimension.CustomRobotoBold,
        fontSize: Dimension.font12,
        color: Colors.FontColor,
        marginRight: Dimension.margin5,
    },
    TotalamounTxt: {
        fontFamily: Dimension.CustomSemiBoldFont,
        fontSize: Dimension.font12,
        color: Colors.FontColor,
    },
    taxpercentageTxt: {
        fontFamily: Dimension.CustomSemiBoldFont,
        fontSize: Dimension.font12,
        color: Colors.greenShade,
        marginLeft: Dimension.margin5,
    },
    topbdr: {
        alignSelf: 'center',
        height: 3,
        backgroundColor: Colors.modalBorder,
        borderRadius: 2,
        width: Dimension.width70,
    },
    ModalheadingWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: Dimension.padding15,
    },
});
export default InvoiceOmsCard;
