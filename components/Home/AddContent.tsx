import React, {useState} from 'react';
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
import {
  GluestackUIProvider,
  HStack,
  Icon,
  Card,
  VStack,
  Heading,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  AddIcon,
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
  TextareaInput,
  Textarea,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from '@gluestack-ui/themed';

import {config} from '@gluestack-ui/config';
import {useDispatch, useSelector} from 'react-redux';
import {saveData} from '../../database/savedata';
import {universalreload} from '../../redux/action/action';

function AddContent(): React.JSX.Element {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [title, settitle] = useState();
  const [subject, setsubject] = useState();

  return (
    <View style={{marginLeft: 8, marginRight: 8}}>
      <GluestackUIProvider config={config}>
        {/* <Text
          onPress={() => {
            console.log('hello 001');
          }}>
          hello
        </Text> */}

        <Modal animationType="slide" visible={showModal} transparent={true}>
          <View style={{marginTop: 'auto'}}>
            {/* <View
              style={{
                height: 300,
                backgroundColor: '#3c40434d',
                opacity: 0.7,
              }}></View> */}
            <Card p="$5" borderRadius="$lg" maxWidth={360} m="$3" marginTop={0}>
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
                DATE : {new Date().toDateString()}
              </Text>
              <VStack mb="$5">
                <Heading size="md" fontFamily="$heading" mb="$1">
                  TITLE :
                </Heading>
                <Input mb="$2">
                  <InputField
                    onChangeText={text => {
                      settitle(text);
                    }}
                  />
                </Input>
                <Heading size="md" fontFamily="$heading" mb="$1">
                  SUBJECT :
                </Heading>
                <Textarea>
                  <TextareaInput
                    onChangeText={text => {
                      setsubject(text);
                    }}
                  />
                </Textarea>
              </VStack>
              <Box
                flexDirection="row"
                justifyContent="space-evenly"
                sx={{
                  '@sm': {
                    flexDirection: 'row',
                  },
                }}>
                <Button
                  onPress={() => {
                    saveData({title: title, subject: subject});
                    dispatch(universalreload(1));
                    setShowModal(false);
                  }}
                  px="$4"
                  py="$2"
                  mr="$0"
                  mb="$3"
                  sx={{
                    '@sm': {
                      mr: '$3',
                      mb: '$0',
                      flex: 1,
                    },
                  }}>
                  <ButtonText size="sm">Save</ButtonText>
                </Button>
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
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          backgroundColor="#B0B0B0"
          borderBottomLeftRadius={9999}
          borderTopLeftRadius={9999}
          borderTopRightRadius={5555}
          borderBottomRightRadius={5555}>
          <TouchableOpacity
            onPress={() => {
              setShowModal(true);
            }}>
            <Box
              bg="#F6F6F6"
              width={55}
              borderRadius={9999}
              alignItems="center"
              alignContent="center">
              <HStack borderColor="#262626">
                <Icon as={AddIcon} m="$2" w="$11" h="$11" />
              </HStack>
            </Box>
          </TouchableOpacity>

          <Text marginRight={9}>DATE : {new Date().toDateString()}</Text>
        </Box>
      </GluestackUIProvider>
    </View>
  );
}

export default AddContent;
