import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
  Modal,
} from 'react-native';
import {
  GluestackUIProvider,
  Card,
  VStack,
  Heading,
  Avatar,
  TrashIcon,
  EditIcon,
  AvatarFallbackText,
  AvatarImage,
  HStack,
  Icon,
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
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  Textarea,
  TextareaInput,
} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {saveData} from '../../database/savedata';
import {deletedata} from '../../database/deletedata';
import {useDispatch} from 'react-redux';
import {universalreload} from '../../redux/action/action';
import {create} from '../../database/createtable';
import {db} from '../../database/connect';
import {updatedata} from '../../database/updatedata';
function EditButton({element}): React.JSX.Element {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const [title, settitle] = useState(element.title);
  const [subject, setsubject] = useState(element.subject);
  return (
    <View>
      <GluestackUIProvider config={config}>
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
                DATE : {element.date}
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
                    value={title}
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
                    value={subject}
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
                    updatedata({
                      element: element,
                      newtitle: title,
                      newsubject: subject,
                    });
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
        <TouchableOpacity
          onPress={() => {
            setShowModal(true);
          }}>
          <HStack>
            <Icon as={EditIcon} m="$2" w="$7" h="$7" />
          </HStack>
        </TouchableOpacity>
      </GluestackUIProvider>
    </View>
  );
}

export default EditButton;
