import HomeScreen from '../containers/Home';
import ProfileScreen from '../containers/Profile';
import OrdersScreen from '../containers/Orders';
import DashboardScreen from '../containers/Dashboard';
import SupportScreen from '../containers/Support';
import DocumentsScreen from '../containers/Profile/Documents';
import BusinessDetails from '../containers/Profile/BusinessDetails';
import Addresses from '../containers/Profile/Addresses';
import {OrderedMap} from 'immutable';

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
];

export const PROFILE_TABS = new OrderedMap({
  business_details: {
    route: 'BusinessDetails',
    title: 'Business Details',
    icon: 'contact',
    progress: 2,
  },
  category_brands: {
    route: 'CategoryBrands',
    title: 'Category & Brand',
    icon: 'bulb',
    progress: 3,
  },
  addresses: {
    route: 'Addresses',
    title: 'Addresses',
    icon: 'location',
    progress: 4,
  },
  bank_details: {
    route: 'BankDetails',
    title: 'Bank Details',
    icon: 'bank',
    progress: 5,
  },
  documents: {
    route: 'Documents',
    title: 'Documents',
    icon: 'file',
    progress: 7,
  },
});
