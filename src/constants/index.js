import { createRef } from 'react';
import { Linking } from 'react-native';
import HomeScreen from '../containers/Home';
import ProfileScreen from '../containers/Profile';
import OrdersScreen from '../containers/Orders';
import DashboardScreen from '../containers/Dashboard';
import SupportScreen from '../containers/Support';
import MoreScreen from '../containers/More';
import SettingsScreen from '../containers/Settings';
import AboutUsScreen from '../containers/AboutUs';
import DocumentsScreen from '../containers/Profile/Documents';
import BusinessDetails from '../containers/Profile/BusinessDetails';
import Addresses from '../containers/Profile/Addresses';
import LoginScreen from '../containers/Auth/Login';
import SplashScreen from '../containers/Auth/Splash';
import SignUpStartScreen from '../containers/Auth/SignUpStart';
import SignUpEndScreen from '../containers/Auth/SignUpEnd';
import BankDetails from '../containers/Profile/BankDetails';
import CategoryBrand from '../containers/Profile/CategoryBrand';
import SelectCategoryScreen from '../containers/Auth/SelectCategory';
import NotificationScreen from '../containers/Notification';
import BrandScreen from '../containers/Profile/CategoryBrand/Brand/index';
import { OrderedMap } from 'immutable';
import Accounts from '../containers/Profile/BankDetails/Accounts';
import TdsDetails from '../containers/Profile/BankDetails/TdsDetails';
import PickedUp from '../containers/Profile/Addresses/PickedUp';
import Billing from '../containers/Profile/Addresses/Billing';
import CategoryScreen from '../containers/Profile/CategoryBrand/Category';
import PopularBrandsScreen from '../containers/Profile/CategoryBrand/Brand/PopularBrands';
import AllBrandsScreen from '../containers/Profile/CategoryBrand/Brand/AllBrands';
import NewTicket from '../containers/Support/NewTicket';
import Error from '../containers/Auth/Login/Error';
import Conversation from '../containers/Support/Conversation';
import EditAddress from '../containers/Profile/Addresses/EditAddress';
import EditBankAccount from '../containers/Profile/BankDetails/Accounts/EditBankAccount';
import UploadInvoiceScreen from '../containers/Orders/UploadInvoiceEMS';
import UploadInvoiceOMSScreen from '../containers/Orders/UploadInvoiceOMS';
import InvoiceEMSFormDetailScreen from '../containers/Orders/InvoiceEMSFormDetails';

export const BOTTOM_TAB_SCREENS = [
  {
    name: 'Orders',
    component: OrdersScreen,
    activeIcon: 'file-list-2-line',
    inactiveIcon: 'file-list-2-line',
  },
  {
    name: 'Profile',
    component: ProfileScreen,
    activeIcon: 'account-pin-box-line',
    inactiveIcon: 'account-pin-box-line',
  },
  {
    name: 'Support',
    component: SupportScreen,
    activeIcon: 'flag-2-line',
    inactiveIcon: 'flag-2-line',
  },

  {
    name: 'More',
    component: MoreScreen,
    activeIcon: 'list-unordered',
    inactiveIcon: 'list-unordered',
  },
];

export const TOP_TAB_SCREENS = [
  {
    name: 'Account',
    key: 'account',
    component: Accounts,
    ref: createRef(),
    idx: 0,
  },
  {
    name: 'TDS Taxation Details',
    key: 'tdsTaxationDetails',
    component: TdsDetails,
    ref: createRef(),
    idx: 1,
  },
];

export const TOP_BRANDS_SCREENS = [
  {
    name: 'PopularBrands',
    component: PopularBrandsScreen,
  },
  {
    name: 'AllBrands',
    component: AllBrandsScreen,
  },
];

export const ADDRESSES_TAB_SCREENS = [
  {
    name: 'Billing',
    key: 'billing',
    component: Billing,
    ref: createRef(),
    idx: 0,
  },
  {
    name: 'Pickup',
    key: 'pickup',
    component: PickedUp,
    ref: createRef(),
    idx: 1,
  },
];

export const AUTH_STACK_SCREENS = [
  {
    name: 'Splash',
    component: SplashScreen,
  },
  {
    name: 'Login',
    component: LoginScreen,
  },
  {
    name: 'Error',
    component: Error,
  },
  {
    name: 'SignUpStart',
    component: SignUpStartScreen,
  },
  {
    name: 'SignUpEnd',
    component: SignUpEndScreen,
  },
  {
    name: 'SelectCategory',
    component: SelectCategoryScreen,
  },
];

export const APP_STACK_SCREENS = [
  {
    name: 'Home',
    component: HomeScreen,
  },
  {
    name: 'Profile',
    component: ProfileScreen,
  },
  {
    name: 'Settings',
    component: SettingsScreen,
  },
  {
    name: 'About Us',
    component: AboutUsScreen,
  },
  {
    name: 'Documents',
    component: DocumentsScreen,
  },
  {
    name: 'BusinessDetails',
    component: BusinessDetails,
  },
  {
    name: 'Addresses',
    component: Addresses,
  },
  {
    name: 'EditAddress',
    component: EditAddress,
  },
  {
    name: 'More',
    component: MoreScreen,
  },
  {
    name: 'EditBankAccount',
    component: EditBankAccount,
  },
  {
    name: 'BankDetails',
    component: BankDetails,
  },
  {
    name: 'CategoryBrand',
    component: CategoryBrand,
  },
  {
    name: 'Brands',
    component: BrandScreen,
  },
  {
    name: 'Billing',
    component: Billing,
  },
  {
    name: 'Notification',
    component: NotificationScreen,
  },
  {
    name: 'Category',
    component: CategoryScreen,
  },
  {
    name: 'NewTicket',
    component: NewTicket,
  },
  {
    name: 'Conversation',
    component: Conversation,
  },
  {
    name: 'UploadInvoiceEMS',
    component: UploadInvoiceScreen,
  },
  {
    name: 'InvoiceEMSFormDetails',
    component: InvoiceEMSFormDetailScreen,
  },
  {
    name: 'UploadInvoiceOMS',
    component: UploadInvoiceOMSScreen,
  },
];

export const PROFILE_TABS = new OrderedMap({
  business_details: {
    route: 'BusinessDetails',
    title: 'Business Details',
    icon: 'business-details',
    progress: 2,
    activity: 1,
  },
  category_brands: {
    route: 'CategoryBrand',
    title: 'Category & Brand',
    icon: 'category--brand',
    progress: 3,
    activity: 2,
  },
  addresses: {
    route: 'Addresses',
    title: 'Addresses',
    icon: 'address',
    progress: 4,
    activity: 3,
  },
  bank_details: {
    route: 'BankDetails',
    title: 'Bank Details',
    icon: 'bank-details',
    progress: 5,
    activity: 4,
  },
  documents: {
    route: 'Documents',
    title: 'Documents',
    icon: 'single-product-upload',
    progress: 7,
    activity: 5,
  },
});

export const MORE_TABS = [
  {
    route: 'Profile',
    title: 'Profile',
    icon: 'account-pin-box-line',
  },
  {
    route: 'Settings',
    title: 'Settings',
    icon: 'settings-3-line',
  },
  {
    route: '',
    onPress: () => {
      Linking.openURL('https://suppliercentralqa.moglilabs.com/#faq');
    },
    title: 'FAQs',
    icon: 'questionnaire-line',
  },
];
//pushe
export const PRIVACY_TABS = [
  {
    route: 'About Us',
    title: 'About Us',
    icon: 'team-line',
    // onPress: () => {
    //   Linking.openURL('https://suppliercentralqa.moglilabs.com/#home');
    // },

  },
  {
    route: '',
    onPress: () => {
      Linking.openURL(
        'https://www.moglix.com/privacy',
      );
    },
    title: 'Privacy Policy',
    icon: 'file-user-line',
  },
  {
    route: '',
    onPress: () => {
      Linking.openURL('https://suppliercentralqa.moglilabs.com/');
    },
    title: 'Contact Us',
    icon: 'customer-service-line',
  },
];
