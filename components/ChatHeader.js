import React from 'react';
import { View } from 'react-native';
import AppText from '../components/AppText';


function ChatHeader({ params }) {
  const { ads } = params.data;
  const { displayName } = params;
  return (
    <View>
        <AppText style={{ fontSize: 15 }}>{displayName}</AppText>
        <View>
        <AppText style={{ fontSize: 13 }}>{ads.title}</AppText>
        </View>
    </View>
  );
}

export default ChatHeader;