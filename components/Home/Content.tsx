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
  PlayIcon,
} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {saveData} from '../../database/savedata';
import {deletedata} from '../../database/deletedata';
import {useDispatch, useSelector} from 'react-redux';
import {alluserdata, universalreload} from '../../redux/action/action';
import {create} from '../../database/createtable';
import {db} from '../../database/connect';
import EditButton from './EditButton';
import LottieView from 'lottie-react-native';

function Content(): React.JSX.Element {
  const dispatch = useDispatch();
  const reduxalluserdata = useSelector(state => state.alluserdatareducer);
  const reduxuserinfo = useSelector(state => state.userinforeducer);
  const reduxuniversalreload = useSelector(
    state => state.universalreloadreducer,
  );

  const [reload, setreload] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, [reduxuniversalreload, reload]);
  const getData = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setData(temp);
        dispatch(alluserdata(temp));
      });
    });
  };
  return (
    <View style={{marginBottom: 185, marginTop: 2}}>
      <GluestackUIProvider config={config}>
        {/* <TouchableOpacity
          onPress={() => {
            if (reload == false) {
              setreload(true);
            } else {
              setreload(false);
            }
          }}>
          <HStack borderColor="#262626">
            <Icon as={PlayIcon} m="$2" w="$9" h="$9" />
          </HStack>
        </TouchableOpacity> */}
        {/* <Text
          onPress={() => {
            // saveData();
            // console.log(reduxalluserdata);
            console.log('hello999999999999999999');
          }}>
          hello99999999999999999999
        </Text> */}

        {reduxalluserdata.length == 0 ? (
          <View>
            <Card p="$5" borderRadius="$lg" maxWidth={360} m="$3">
              <LottieView
                style={{height: 200}}
                source={require('../../assets/animations/scanner.json')}
                autoPlay
                speed={3}
              />
            </Card>
          </View>
        ) : (
          reduxalluserdata[reduxalluserdata.length - 1].map(
            (element, index) => (
              <View key={index}>
                <Card p="$5" borderRadius="$lg" maxWidth={360} m="$3">
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
                    {element.date}
                  </Text>
                  <VStack mb="$6">
                    <Heading size="md" fontFamily="$heading" mb="$4">
                      {element.title}
                    </Heading>
                    <Text size="sm" fontFamily="$heading">
                      {element.subject}
                    </Text>
                  </VStack>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Box flexDirection="row">
                      <Avatar mr="$3">
                        <AvatarFallbackText fontFamily="$heading">
                        {reduxuserinfo[reduxuserinfo.length - 1][0].name[0]}
                        </AvatarFallbackText>
                        {/* <AvatarImage
                    source={{
                      uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
                    }}
                  /> */}
                      </Avatar>
                      <VStack>
                        <Heading size="sm" fontFamily="$heading" mb="$1">
                          {reduxuserinfo[reduxuserinfo.length - 1][0].name}
                        </Heading>
                        <Text size="sm" fontFamily="$heading">
                          {reduxuserinfo[reduxuserinfo.length - 1][0].career}
                        </Text>
                      </VStack>
                    </Box>
                    <View style={{flexDirection:"row"}}>

                    <EditButton element={element} />
                    <TouchableOpacity
                    style={{marginLeft:15}}
                      onPress={() => {
                        deletedata({user_id: element.user_id});
                        dispatch(universalreload(1));
                      }}>
                      <HStack>
                        <Icon as={TrashIcon} m="$2" w="$7" h="$7" />
                      </HStack>
                    </TouchableOpacity>
                    </View>

                  </View>
                </Card>
              </View>
            ),
          )
        )}
      </GluestackUIProvider>
    </View>
  );
}

export default Content;
