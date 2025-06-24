import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function SplashScreen() {
  return (
    <SafeAreaView className="flex-1 bg-black items-center justify-center">
      <View className="items-center">
        {/* Logo */}
        <View className="w-24 h-24 bg-green-500 rounded-3xl items-center justify-center mb-6">
          <Ionicons name="calendar" size={48} color="black" />
        </View>
        
        {/* App Name */}
        <Text className="text-green-400 text-4xl font-bold mb-2">GLR</Text>
        <Text className="text-white text-2xl font-light mb-8">Agenda</Text>
        
        {/* Loading indicator */}
        <View className="flex-row items-center">
          <View className="w-2 h-2 bg-green-500 rounded-full mx-1 animate-pulse" />
          <View className="w-2 h-2 bg-green-400 rounded-full mx-1 animate-pulse delay-100" />
          <View className="w-2 h-2 bg-green-300 rounded-full mx-1 animate-pulse delay-200" />
        </View>
      </View>
    </SafeAreaView>
  );
}
