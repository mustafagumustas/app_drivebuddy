import React from 'react';

import {Image, Text, View } from 'react-native'
import { Tabs, Redirect} from 'expo-router';

import { icons } from '../../constants'
import { Stack } from 'expo-router';


const TabsLayout = () => {
  return (
    <>
        <Stack>
        <Stack.Screen
            name="buddy"
            options={{
                headerShown: false
            }}/>

        </Stack>
    </>

  )
}

export default TabsLayout

