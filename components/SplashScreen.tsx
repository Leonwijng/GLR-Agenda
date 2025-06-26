import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GLRLogo from '../assets/images/GLRLOGO.png';

export default function SplashScreen() {
  return (
    <SafeAreaView className="flex-1 bg-black items-center justify-center">
      <View className="items-center">
        {/* Logo */}
        <View className="w-24 h-24 items-center justify-center mb-6">
          <Image
            source={GLRLogo}
            style={{ width: 100, height: 100, resizeMode: 'contain' }}
          />
        </View>
        
        {/* App Name */}
        <Text className="text-[#87fe04] text-4xl font-bold mb-2">GLR</Text>
        <Text className="text-white text-2xl font-light mb-8">Agenda</Text>
        
        {/* Loading indicator */}
        <View className="flex-row items-center">
          <View className="w-2 h-2 bg-[#87fe04] rounded-full mx-1 animate-pulse" />
          <View className="w-2 h-2 bg-[#87fe04] rounded-full mx-1 animate-pulse delay-100" />
          <View className="w-2 h-2 bg-[#87fe04] rounded-full mx-1 animate-pulse delay-200" />
        </View>
      </View>
    </SafeAreaView>
  );
}
