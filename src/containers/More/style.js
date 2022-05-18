; import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../Theme/Colors';
import Dimension from '../../Theme/Dimension';


const styles = StyleSheet.create({

    userNameCss: {
        fontSize: Dimension.font16,
        color: Colors.WhiteColor,
        fontFamily: Dimension.CustomSemiBoldFont,
        marginBottom: Dimension.margin5

    },
    UserEmail: {
        fontSize: Dimension.font12,
        color: Colors.WhiteColor,
        fontFamily: Dimension.CustomRegularFont,
        marginBottom: Dimension.margin5

    },
    dateTxt: {
        fontSize: Dimension.font10,
        color: Colors.WhiteColor,
        fontFamily: Dimension.CustomRegularFont,
        justifyContent: "flex-end",
        alignContent: "flex-end",
        marginTop: Dimension.margin4

    },
    topWrap: {
        paddingHorizontal: Dimension.padding15,
        paddingTop: Dimension.padding50,
        paddingBottom: Dimension.padding25
    },
    companyName: {
        fontSize: Dimension.font12,
        color: Colors.WhiteColor,
        fontFamily: Dimension.CustomSemiBoldFont,

    },
    profileTabWrapper: {
        borderRadius: 4,
        backgroundColor: Colors.grayShade3,
        paddingHorizontal: Dimension.padding10,
        paddingVertical: Dimension.padding15,
        marginHorizontal: Dimension.margin15,
        marginTop: Dimension.margin30,

    },



    profileTabWrap: {
        padding: Dimension.padding10,
        marginVertical: Dimension.margin5,
        borderRadius: 4,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: Colors.WhiteColor,
        alignItems: "center"
    },
    varsionWrap: {

        marginTop: Dimension.margin20,

        marginHorizontal: Dimension.margin15,
        paddingHorizontal: Dimension.padding15,
        paddingVertical: Dimension.padding15,
        marginBottom: Dimension.margin10,
        borderRadius: 4,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: Colors.grayShade3,
        alignItems: "center"

    },
    IconWrap: {
        width: Dimension.width30,
        height: Dimension.height30,
        backgroundColor: Colors.grayShade3,
        borderRadius: 4,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        marginRight: Dimension.margin10,
    },
    tabTitle: {
        fontSize: Dimension.font14,
        color: Colors.headerTxtColor,
        fontFamily: Dimension.CustomSemiBoldFont,
        marginLeft: Dimension.margin15
    },
    versionText: {
        fontSize: Dimension.font14,
        color: Colors.headerTxtColor,
        fontFamily: Dimension.CustomRegularFont,
        // marginTop: Dimension.margin8
    },
    AppversionNumber: {
        fontSize: Dimension.font14,
        color: Colors.headerTxtColor,
        fontFamily: Dimension.CustomBoldFont,
    },
    updatedateTxt:{
        fontSize: Dimension.font10,
        color: Colors.headerTxtColor,
        fontFamily: Dimension.CustomRegularFont,
    },
});

export default styles;
