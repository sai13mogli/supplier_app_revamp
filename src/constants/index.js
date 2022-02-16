import HomeScreen from '../containers/Home';
import ProfileScreen from '../containers/Profile';
import OrdersScreen from '../containers/Orders';
import DashboardScreen from '../containers/Dashboard';
import SupportScreen from '../containers/Support';
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
import BrandScreen from '../containers/Profile/CategoryBrand/Brand/index';
import {OrderedMap} from 'immutable';
import Accounts from '../containers/Profile/BankDetails/Accounts';
import TdsDetails from '../containers/Profile/BankDetails/TdsDetails';
import PickedUp from '../containers/Profile/Addresses/PickedUp';
import Billing from '../containers/Profile/Addresses/Billing';

export const BOTTOM_TAB_SCREENS = [
  //   {
  //     name: 'Home',
  //     component: HomeScreen,
  //     // activeIcon: 'home',
  //     // inactiveIcon: 'home',
  //   },
  {
    name: 'Orders',
    component: OrdersScreen,
    // activeIcon: 'categories',
    // inactiveIcon: 'categories',
  },
  {
    name: 'Dashboard',
    component: DashboardScreen,
    // activeIcon: 'brand_store',
    // inactiveIcon: 'brand_store',
  },
  {
    name: 'Support',
    component: SupportScreen,
    // activeIcon: 'orders',
    // inactiveIcon: 'orders',
  },
  {
    name: 'Profile',
    component: ProfileScreen,
    // activeIcon: 'profile',
    // inactiveIcon: 'profile',
  },
];

export const TOP_TAB_SCREENS = [
 
  {
    name: 'Account',
    component: Accounts,
  },
  {
    name: 'TDS Taxation Details',
    component: TdsDetails,
  },

];

export const ADDRESSES_TAB_SCREENS = [
  {
    name: 'Billing',
    component: Billing,
  },
  {
    name: 'PickedUp',
    component: PickedUp,
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
];

export const PROFILE_TABS = new OrderedMap({
  business_details: {
    route: 'BusinessDetails',
    title: 'Business Details',
    icon: 'business-details',
    progress: 2,
  },
  category_brands: {
    route: 'CategoryBrand',
    title: 'Category & Brand',
    icon: 'category--brand',
    progress: 3,
  },
  addresses: {
    route: 'Addresses',
    title: 'Addresses',
    icon: 'address',
    progress: 4,
  },
  bank_details: {
    route: 'BankDetails',
    title: 'Bank Details',
    icon: 'bank-details',
    progress: 5,
  },
  documents: {
    route: 'Documents',
    title: 'Documents',
    icon: 'single-product-upload',
    progress: 7,
  },
});
