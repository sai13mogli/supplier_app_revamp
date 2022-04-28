import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { getImageUrl } from '../services/orders';
import Dimension from '../Theme/Dimension';
import Colors from '../Theme/Colors';
import CustomeIcon from './common/CustomeIcon';



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
        bulkItemIds,
        selectItemId,
        keys

    } = props;

    const [showMoreTxt, setShowMoreTxt] = useState(false);
    const [showMoreCTA, setShowMoreCTA] = useState(false);
    const [invoiceImage, setInvoiceImage] = useState(null);

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
            setInvoiceImage(imageUrl);
        }
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
                            (bulkItemIds || []).includes(podId)
                                ? 'checkbox-tick'
                                : 'checkbox-blank'
                        }
                        color={
                            (bulkItemIds || []).includes(podId)
                                ? Colors.BrandColor
                                : Colors.FontColor
                        }
                        size={Dimension.font22}
                        onPress={() => selectItemId(podId, totalPrice, keys)}
                        style={{
                            position: 'absolute',
                            right: 0,
                            zIndex: 9999,
                        }}></CustomeIcon>

                    <View style={styles.leftpart}>
                        {
                            invoiceImage ?
                                <Image
                                    // source={{
                                    //   uri:
                                    //     orderImage ||
                                    //     'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
                                    // }}
                                    source={{ uri: invoiceImage }}
                                    style={styles.imgStyle}
                                /> :
                                <Image
                                    source={require('../assets/images/default_image.png')}
                                    style={styles.imgStyle}
                                />

                        }
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
                        <View style={styles.productnameWrap}>
                            <Text style={styles.productName}
                                numberOfLines={showMoreTxt ? undefined : 1}>{productName}</Text>
                            <Text onPress={toggleShowMoreTxt} style={styles.readMoretxt}>
                                {showMoreTxt ? 'Read less' : 'Read more'}
                            </Text>
                        </View>

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
    productnameWrap: {
        marginBottom: Dimension.margin10,
    },
    productName: {
        fontSize: Dimension.font12,
        color: Colors.FontColor,
        fontFamily: Dimension.CustomRegularFont,

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
    imgStyleModal: {
        borderRadius: 4,
        backgroundColor: Colors.WhiteColor,
        padding: 2,
        width: 250,
        height: 250,
        alignSelf: 'center',
    },
    imgStyle: {
        borderRadius: 4,
        backgroundColor: Colors.WhiteColor,
        padding: 2,
        width: Dimension.width50,
        height: Dimension.height50,
        //alignSelf:'center'
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
        width: '100%',
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
