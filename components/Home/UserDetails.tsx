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
  Modal,
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
import {userinfo} from '../../redux/action/action';
import {savetableuserdetails} from '../../database/savetableuserdetails';
import {createtableuserdetails} from '../../database/createtableuserdetails';
import {updatetableuserdetails} from '../../database/updatetableuserdetails';

function UserDetails(): React.JSX.Element {
  const dispatch = useDispatch();
  const reduxuserinfo = useSelector(state => state.userinforeducer);

  const [userdetailsData, setuserdetailsData] = useState([
    {career: 'error', edit: 'error', name: 'error', user_id: 11},
  ]);
  const [showupdatebtn, setshowupdatebtn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setname] = useState();
  const [career, setcareer] = useState();
  useEffect(() => {
    createtableuserdetails();
    getuserdetailsData();
  }, []);
  const getuserdetailsData = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_user_details', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setuserdetailsData(temp);
        dispatch(userinfo(temp));
      });
    });
  };

  return (
    <View>
      <GluestackUIProvider config={config}>
        <Center>
          <TouchableOpacity
            onPress={() => {
              if (userdetailsData[0].name == 'error') {
                setshowupdatebtn(false);
              } else {
                // console.log('updatebtn');
                setshowupdatebtn(true);
              }
              setShowModal(true);
            }}>
            <HStack borderColor="#262626">
              <Icon as={SettingsIcon} m="$2" w="$9" h="$9" />
            </HStack>
          </TouchableOpacity>
          {reduxuserinfo.length == 0 ? (
            <Text>Loding.....</Text>
          ) : (
            <Modal animationType="slide" visible={showModal}>
              {/* <Text
                onPress={() => {
                  console.log(reduxuserinfo);
                }}>
                hello
              </Text> */}
              <Heading marginTop={5} textAlign="center" fontSize={25}>
                Setting
              </Heading>
              <View
                style={{
                  marginTop: 50,
                }}>
                <Card
                  p="$5"
                  borderRadius="$lg"
                  maxWidth={360}
                  m="$3"
                  marginTop={0}>
                  <Text
                    fontSize="$sm"
                    fontStyle="normal"
                    fontFamily="$heading"
                    fontWeight="$normal"
                    lineHeight="$sm"
                    mb="$2"
                    sx={{
                      color: '$textLight700',
                      _dark: {
                        color: '$textDark200',
                      },
                    }}>
                    Change name and profession :
                  </Text>
                  <VStack mb="$5">
                    <Heading size="md" fontFamily="$heading" mb="$1">
                      NAME : {reduxuserinfo[reduxuserinfo.length - 1][0].name}
                    </Heading>
                    <Input mb="$2">
                      <InputField
                        onChangeText={text => {
                          setname(text);
                        }}
                        value={name}
                      />
                    </Input>
                    <Heading size="md" fontFamily="$heading" mb="$1">
                      PROFESSION :{' '}
                      {reduxuserinfo[reduxuserinfo.length - 1][0].career}
                    </Heading>
                    <Input mb="$2">
                      <InputField
                        onChangeText={text => {
                          setcareer(text);
                        }}
                        value={career}
                      />
                    </Input>
                  </VStack>
                  <Box
                    flexDirection="row"
                    justifyContent="space-evenly"
                    sx={{
                      '@sm': {
                        flexDirection: 'row',
                      },
                    }}>
                    {showupdatebtn == true ? (
                      <Button
                        onPress={() => {
                          updatetableuserdetails({
                            name: name,
                            career: career,
                            user_id: userdetailsData[0].user_id,
                          });
                          getuserdetailsData();
                          setname('');
                          setcareer('');
                          setShowModal(false);
                        }}>
                        <ButtonText size="sm">Update</ButtonText>
                      </Button>
                    ) : (
                      <Button
                        onPress={() => {
                          savetableuserdetails({name: name, career: career});
                          setShowModal(false);
                        }}>
                        <ButtonText size="sm">Save</ButtonText>
                      </Button>
                    )}
                    <Button
                      onPress={() => {
                        setShowModal(false);
                      }}
                      px="$4"
                      py="$2"
                      variant="outline"
                      borderColor="$borderLight300"
                      $dark-borderColor="$backgroundDark600"
                      sx={{
                        '@sm': {
                          flex: 1,
                        },
                      }}>
                      <ButtonText
                        size="sm"
                        color="$textLight600"
                        $dark-color="$textDark400">
                        Discard
                      </ButtonText>
                    </Button>
                  </Box>
                </Card>
              </View>
            </Modal>
          )}
        </Center>
      </GluestackUIProvider>
    </View>
  );
}

export default UserDetails;
