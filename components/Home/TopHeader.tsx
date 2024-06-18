import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  GluestackUIProvider,
  HStack,
  Icon,
  SearchIcon,
  createConfig,
  Text,
  Button,
  ButtonText,
  Box,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  Card,
  VStack,
  Heading,
  Avatar,
  AvatarFallbackText,
  TrashIcon,
  CloseIcon,
  SettingsIcon,
  Center,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from '@gluestack-ui/themed';
import EditButton from './EditButton';
import {db} from '../../database/connect';

import {config} from '@gluestack-ui/config';
import {useDispatch, useSelector} from 'react-redux';
import {alluserdata, universalreload} from '../../redux/action/action';
import UserDetails from './UserDetails';
import logo from '../../assets/image/28282651-29665d66-6af9-11e7-96d1-e9346a836007.png';
function TopHeader(): React.JSX.Element {
  const dispatch = useDispatch();
  const reduxalluserdata = useSelector(state => state.alluserdatareducer);
  const [icon, seticon] = useState(SearchIcon);
  const [searchdata, setsearchdata] = useState('');
  const [close, setclose] = useState(true);
  const [arrlength, setarrlength] = useState(0);
  useEffect(() => {
    if (searchdata.length == 0) {
      // console.log("00");
      dispatch(universalreload(1));
      seticon(SearchIcon);
      setclose(true);
    } else {
      seticon(CloseIcon);
      setclose(false);
    }
    searching();
  }, [searchdata]);

  function searching() {
    if (reduxalluserdata.length == 0) {
      console.log('hello');
    } else {
      const da = reduxalluserdata[arrlength].filter(ee => {
        return (
          searchdata.toLowerCase().trimEnd().trimStart() ==
            ee.subject.toLowerCase() ||
          searchdata.toLowerCase().trimEnd().trimStart() ==
            ee.title.toLowerCase()
        );
      });
      // console.log(da);
      dispatch(alluserdata(da));
    }
  }
  return (
    <View>
      <GluestackUIProvider config={config}>
        {/* <Text
          onPress={() => {
            console.log("aa");
          }}>
          fffffffffffffffffff
        </Text> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft:7
          }}>

          <Image
            style={{height: 40, width: 40}}
            alt="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            source={logo}
            />
          <Heading marginLeft={7} fontSize={25}>
            TodoApp
          </Heading>
            </View>

          <UserDetails />
        </View>

        <Box padding={7} marginTop={4} marginBottom={9}>
          <FormControl
            size="md"
            borderColor="#262626"
            borderWidth={1}
            borderRadius={5}
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            isRequired={false}>
            <Input>
              <InputField
                type="text"
                placeholder="Search Here"
                value={searchdata}
                onPress={() => {
                  setarrlength(reduxalluserdata.length - 1);
                }}
                onChangeText={text => {
                  setsearchdata(text);
                }}
              />
              <TouchableOpacity
                disabled={close}
                onPress={() => {
                  setsearchdata('');
                }}>
                <HStack flexWrap="wrap">
                  <Icon as={icon} m="$2" w="$5" h="$5" />
                </HStack>
              </TouchableOpacity>
            </Input>
          </FormControl>
        </Box>
      </GluestackUIProvider>
    </View>
  );
}

export default TopHeader;
