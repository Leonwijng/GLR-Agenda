import { Ionicons } from '@expo/vector-icons';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

export interface AgendaItemType {
  id: string;
  title: string;
  subject: string;
  time: string;
  date: string;
  location?: string;
  type: 'class' | 'assignment' | 'exam' | 'meeting';
}

interface AgendaItemProps {
  item: AgendaItemType;
  onDelete: (id: string) => void;
}

export function AgendaItemComponent({ item, onDelete }: AgendaItemProps) {
  const getTypeIcon = (type: AgendaItemType['type']) => {
    switch (type) {
      case 'class': return 'school-outline';
      case 'assignment': return 'document-text-outline';
      case 'exam': return 'clipboard-outline';
      case 'meeting': return 'people-outline';
      default: return 'calendar-outline';
    }
  };

  const getTypeColor = (type: AgendaItemType['type']) => {
    switch (type) {
      case 'class': return 'bg-[#87fe04]';
      case 'assignment': return 'bg-yellow-500';
      case 'exam': return 'bg-red-500';
      case 'meeting': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(item.id)
        }
      ]
    );
  };

  return (
    <View className="bg-gray-900 rounded-xl p-4 mb-3 border border-gray-800">
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <View className="flex-row items-center mb-2">
            <View className={`w-3 h-3 rounded-full ${getTypeColor(item.type)} mr-2`} />
            <Text className="text-white font-bold text-lg">{item.title}</Text>
          </View>
          
          <View className="flex-row items-center mb-1">
            <Ionicons name="book-outline" size={16} color="#10B981" />
            <Text className="text-[#87fe04] ml-2 font-medium">{item.subject}</Text>
          </View>
          
          <View className="flex-row items-center mb-1">
            <Ionicons name="time-outline" size={16} color="#6B7280" />
            <Text className="text-gray-400 ml-2">{item.time}</Text>
          </View>
          
          {item.location && (
            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={16} color="#6B7280" />
              <Text className="text-gray-400 ml-2">{item.location}</Text>
            </View>
          )}
        </View>
        
        <TouchableOpacity
          onPress={handleDelete}
          className="ml-4 p-2"
        >
          <Ionicons name="trash-outline" size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
