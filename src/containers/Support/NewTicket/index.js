import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {OrderedMap} from 'immutable';
import FloatingLabelInputField from '../../../component/common/FloatingInput';
import DropDown from '../../../component/common/DropDown';
import MultiFileUpload from '../../../component/common/MultiFileUpload';
import CustomButton from '../../../component/common/Button';
import Colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import {BASE_URL} from '../../../redux/constants';
import {getCategories, getSubCategories} from '../../../services/support';
import AppHeader from '../../../component/common/Header';

const NewTicket = props => {
  const [category, setcategory] = useState('');
  const [subCategory, setsubCategory] = useState('');
  const [businessType, setbusinessType] = useState('');
  const [explainQuery, setexplainQuery] = useState('');
  const [docs, setdocs] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);

  const [categoryError, setcategoryError] = useState('');
  const [subCategoryError, setsubCategoryError] = useState('');
  const [businessTypeError, setbusinessTypeError] = useState('');
  const [explainQueryError, setexplainQueryError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const {data} = await getCategories();
    setCategoryList(data.data.map(_ => ({label: _.name, value: _.id})));
  };

  const fetchSubCategory = async id => {
    const {data} = await getSubCategories(id);
    setSubCategoryList(data.data.map(_ => ({label: _.name, value: _.id})));
  };

  const FORM_FIELDS = new OrderedMap({
    category: {
      label: 'Category',
      title: 'Category',
      selectedValue: category,
      component: DropDown,
      isImp: true,
      errorMessage: 'Please select a Category',
      showError: categoryError,
      placeholder: 'Please Select a Category',
      onValueChange: text => {
        setcategory(text);
        fetchSubCategory(text);
      },
      items: categoryList,
      enabled: true,
    },
    subCategory: {
      label: 'Sub Category',
      title: 'Sub Category',
      selectedValue: subCategory,
      component: DropDown,
      isImp: true,
      errorMessage: 'Please select a Sub Category',
      showError: subCategoryError,
      placeholder: 'Please Select a Sub Category',
      onValueChange: text => setsubCategory(text),
      items: subCategoryList,
      enabled: true,
    },
    businessType: {
      label: 'Business Type',
      title: 'Business Type',
      selectedValue: businessType,
      component: DropDown,
      isImp: true,
      errorMessage: 'Please select a Business Type',
      showError: businessTypeError,
      placeholder: 'Please Select a Business Type',
      onValueChange: text => setbusinessType(text),
      items: [
        {label: 'B2B', value: 'Online'},
        {label: 'B2C', value: 2},
        {label: 'Both', value: 30},
      ],
      enabled: true,
    },
    explainQuery: {
      label: 'Explain Query',
      title: 'Explain Query',
      value: explainQuery,
      placeholder: 'Explain your Query',
      component: FloatingLabelInputField,
      isImp: true,
      errorMessage: 'Please explain your query',
      onChangeText: text => setexplainQuery(text),
      showError: explainQueryError,
    },
  });

  const submit = async () => {
    let token = `Bearer ${await AsyncStorage.getItem('token')}`;
    const url = `${BASE_URL}api/ticket/create`;
    const response = await RNFetchBlob.fetch(
      'POST',
      url,
      {
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      },
      [
        {
          name: 'categoryId',
          data: category,
        },
        {
          name: 'subCategoryId',
          data: subCategory,
        },
        {
          name: 'businessType',
          data: businessType,
        },
        {
          name: 'description',
          data: explainQuery,
        },
        ...docs.map(_ => ({
          name: 'file',
          filename: _.name,
          type: _.type,
          data: RNFetchBlob.wrap(_.uri),
        })),
      ],
    );

    const res = await response.json();
    // setLoader(false);
    // return {
    //   resp: res,
    //   fileData: data,
    // };
    if (res.success) {
      props.navigation.goBack();
    }
  };

  return (
    <>
      <AppHeader
        showBack
        navigation={props.navigation}
        showText={'New Ticket'}
        // rightIconName={'category--brand'}
      />
      <ScrollView style={{padding: 12}}>
        {FORM_FIELDS.map((field, fieldKey) => (
          <field.component key={fieldKey} {...field} />
        )).toList()}
        <MultiFileUpload
          title={'Add Attachment'}
          subTitle={
            'Attach file (pdf, doc, csv, jpg ,jpeg ,png upto 2 Mb in size)'
          }
          docsList={docs}
          onUpload={doc => setdocs([...docs, doc])}
          onRemove={id => setdocs(docs.filter(doc => doc.id !== id))}
        />
        <CustomButton
          title={'SUBMIT'}
          buttonColor={Colors.BrandColor}
          onPress={submit}
          TextColor={Colors.WhiteColor}
          borderColor={Colors.WhiteColor}
          TextFontSize={Dimension.font16}
        />
      </ScrollView>
    </>
  );
};

export default NewTicket;
