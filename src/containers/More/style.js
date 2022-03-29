import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../Theme/Colors';
import Dimension from '../../Theme/Dimension';


const styles = StyleSheet.create({
    UserDetailWrap: {
        backgroundColor: Colors.BrandColor,
        padding: Dimension.padding15,
        borderRadius: 8,
        flexDirection: "row"
    },
    halfWarp: {
        backgroundColor: Colors.grayShade2,
        marginHorizontal: Dimension.margin15,
    },
    userDetailLeft: {
        marginRight: Dimension.margin15
    },
    ContainerCss: {
        //backgroundColor:Colors.WhiteColor,
        //paddingHorizontal:Dimension.padding15,
        //flex:1,
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
        marginLeft: Dimension.margin6,

    },
    UserContact: {
        fontSize: Dimension.font12,
        color: Colors.WhiteColor,
        fontFamily: Dimension.CustomRegularFont,
        marginLeft: Dimension.margin6,
    },
    userIconWrap: {
        backgroundColor: Colors.grayShade9,
        padding: Dimension.padding10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.grayShade9
    },

    UserEmailVerfyWrap: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: Colors.NudgeColor1,
        borderRadius: 8,
        paddingHorizontal: Dimension.padding15,
        paddingVertical: Dimension.padding10,
        marginTop: Dimension.margin10,
        alignItems: "center"
    },
    UserEmailVerfyBoldTxt: {
        fontSize: Dimension.font12,
        color: Colors.FontColor,
        fontFamily: Dimension.CustomSemiBoldFont,

    },
    UserEmailVerfylightTxt: {
        fontSize: Dimension.font12,
        color: Colors.FontColor,
        fontFamily: Dimension.CustomMediumFont,

    },
    profileTopWrap: {
        backgroundColor: Colors.WhiteColor,
        borderBottomWidth: 1,
        borderBottomColor: Colors.grayShade10,
        paddingBottom: Dimension.padding10,

        paddingHorizontal: Dimension.padding15

    },
    profileBottomWrap: {
        backgroundColor: Colors.grayShade3,
        paddingHorizontal: Dimension.padding15,
        //paddingVertical:Dimension.padding20,
    },
    progressbarWrap: {
        paddingVertical: Dimension.padding20,
    },
    progressTxt: {
        fontSize: Dimension.font14,
        color: Colors.FontColor,
        fontFamily: Dimension.CustomSemiBoldFont,
        marginBottom: Dimension.margin5
    },
    progressBottomtxt: {
        fontSize: Dimension.font12,
        color: Colors.FontColor,
        fontFamily: Dimension.CustomRegularFont,
        marginTop: Dimension.margin5,
    },
    profileTabWrap: {
        borderWidth: 1,
        borderColor: Colors.BoxBorderColor,
        marginHorizontal: Dimension.margin15,
        paddingHorizontal: Dimension.padding10,
        paddingVertical: Dimension.padding10,
        marginBottom: Dimension.margin10,
        borderRadius: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: Colors.WhiteColor,
        alignItems: "center"
    },
    varsionWrap: {
        borderWidth: 1,
        marginTop: Dimension.margin10,
        borderColor: Colors.BoxBorderColor,
        marginHorizontal: Dimension.margin15,
        paddingHorizontal: Dimension.padding10,
        paddingVertical: Dimension.padding15,
        marginBottom: Dimension.margin10,
        borderRadius: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: Colors.grayShade2,
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
        fontFamily: Dimension.CustomRobotoBold,
        marginTop: Dimension.margin8
    },
    versionText: {
        fontSize: Dimension.font14,
        color: Colors.headerTxtColor,
        fontFamily: Dimension.CustomRobotoRegular,
        marginTop: Dimension.margin8
    },
    tabStatusNC: {
        fontSize: Dimension.font10,
        color: Colors.PendingStateColor,
        fontFamily: Dimension.CustomMediumFont,
    },
    tabStatusC: {
        fontSize: Dimension.font10,
        color: Colors.SuccessStateColor,
        fontFamily: Dimension.CustomMediumFont,
        marginLeft: Dimension.margin5
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
    logoutBtnWrap: {
        paddingHorizontal: Dimension.padding15,
        paddingVertical: Dimension.paddng15,
        backgroundColor: Colors.grayShade3

    },
    logoutBtn: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: Dimension.padding20,
        paddingVertical: Dimension.padding12,
        borderWidth: 1,
        borderColor: Colors.eyeIcon,
        borderRadius: 8
    },
    logoutBtnTxt: {
        fontSize: Dimension.font14,
        color: Colors.FontColor,
        fontFamily: Dimension.CustomMediumFont,
    },
});

export default styles;
