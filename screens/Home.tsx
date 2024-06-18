import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { GluestackUIProvider } from "@gluestack-ui/themed"

import TopHeader from '../components/Home/TopHeader';
import AddContent from '../components/Home/AddContent';
import Content from '../components/Home/Content';

import { config } from '@gluestack-ui/config';



function Home(): React.JSX.Element {



  return (

    <SafeAreaView>
        <TopHeader />
        <AddContent />
        <ScrollView showsVerticalScrollIndicator={false}>
        <Content />
        </ScrollView>
    </SafeAreaView>
  );
}



export default Home;
