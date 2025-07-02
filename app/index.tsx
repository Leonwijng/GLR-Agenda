import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GLRLogo from '../assets/images/GLRLOGO.png';
import { AddItemModal } from '../components/AddItemModal';
import { AgendaItemComponent, AgendaItemType } from '../components/AgendaItem';
import { DatePicker } from '../components/DatePicker';

export default function Index() {
  const [agendaItems, setAgendaItems] = useState<AgendaItemType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    loadAgendaItems();
  }, []);

  const loadAgendaItems = async () => {
    try {
      const stored = await AsyncStorage.getItem('agendaItems');
      if (stored) {
        setAgendaItems(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading agenda items:', error);
    }
  };

  const saveAgendaItems = async (items: AgendaItemType[]) => {
    try {
      await AsyncStorage.setItem('agendaItems', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving agenda items:', error);
    }
  };

  const addAgendaItem = (itemData: Omit<AgendaItemType, 'id'>) => {
    const item: AgendaItemType = {
      id: Date.now().toString(),
      ...itemData
    };

    const updatedItems = [...agendaItems, item];
    setAgendaItems(updatedItems);
    saveAgendaItems(updatedItems);
    setModalVisible(false);
  };

  const deleteAgendaItem = (id: string) => {
    const updatedItems = agendaItems.filter(item => item.id !== id);
    setAgendaItems(updatedItems);
    saveAgendaItems(updatedItems);
  };

  const getItemsForDate = (date: string) => {
    return agendaItems
      .filter(item => item.date === date)
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTotalItemsCount = () => {
    return agendaItems.length;
  };

  const getUpcomingItemsCount = () => {
    const today = new Date().toISOString().split('T')[0];
    return agendaItems.filter(item => item.date >= today).length;
  };

  const getNextAppointment = () => {
    const today = new Date().toISOString().split('T')[0];
    const upcomingItems = agendaItems
      .filter(item => item.date >= today)
      .sort((a, b) => {
        const dateCompare = a.date.localeCompare(b.date);
        if (dateCompare === 0) {
          return a.time.localeCompare(b.time);
        }
        return dateCompare;
      });
    
    return upcomingItems.length > 0 ? upcomingItems[0] : null;
  };

  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar style="light" />
      
      {/* Header */}
      <View className="px-6 py-4 border-b border-gray-800">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="items-center justify-center mr-4 overflow-hidden">
              <Image
                source={GLRLogo}
                style={{ width: 65, height: 65, resizeMode: 'contain' }}
              />
            </View>
            <View>
              <Text className="text-[#87fe04] text-3xl font-bold">GLR</Text>
              <Text className="text-white text-lg font-light">Agenda</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="bg-[#87fe04] rounded-2xl px-5 py-3 flex-row items-center"
          >
            <Ionicons name="add" size={24} color="black" />
            <Text className="text-black font-bold ml-2">Nieuwe Afspraak</Text>
          </TouchableOpacity>
        </View>
        
        {/* Stats */}
        <View className="flex-row mt-4 space-x-4 gap-4">
          <TouchableOpacity 
            className="bg-gray-900 rounded-xl px-4 py-3 flex-1"
            onPress={() => {
              const nextAppointment = getNextAppointment();
              if (nextAppointment) {
                setSelectedDate(nextAppointment.date);
              }
            }}
          >
            <Text className="text-gray-400 text-xs mb-1">Eerstvolgende afspraak:</Text>
            {getNextAppointment() ? (
              <View>
                <Text className="text-[#87fe04] text-sm font-bold" numberOfLines={1}>
                  {getNextAppointment()!.title}
                </Text>
                <Text className="text-white text-xs mt-1">
                  {formatDateShort(getNextAppointment()!.date)} • {getNextAppointment()!.time}
                </Text>
              </View>
            ) : (
              <Text className="text-gray-500 text-sm">Geen afspraken</Text>
            )}
          </TouchableOpacity>
          
          <View className="bg-gray-900 rounded-xl px-4 py-2 flex-1">
            <Text className="text-gray-400 text-xs">Aantal afspraken</Text>
            <Text className="text-white text-lg font-bold">{getTotalItemsCount()}</Text>
          </View>
        </View>
      </View>

      {/* Date Selection (vertical) */}
      <DatePicker
        selectedDate={selectedDate ?? ''}
        onDateSelect={setSelectedDate}
        agendaItems={agendaItems}
        isModalOpen={!!selectedDate}
      />

      {/* Overlay met agenda-items van geselecteerde dag - als absolute positioned element */}
      {selectedDate && (
        <View className="absolute bottom-0 left-0 right-0 bg-gray-900 rounded-t-3xl p-6 max-h-[80%] z-50">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white text-xl font-bold">
              {formatDate(selectedDate)}
            </Text>
            <TouchableOpacity 
              onPress={() => setSelectedDate(null)}
              className="p-1"
            >
              <Text className="text-white text-3xl font-bold">×</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            {getItemsForDate(selectedDate).length > 0 ? (
              getItemsForDate(selectedDate).map((item) => (
                <AgendaItemComponent
                  key={item.id}
                  item={item}
                  onDelete={deleteAgendaItem}
                />
              ))
            ) : (
              <View className="items-center justify-center py-8">
                <Ionicons name="calendar-outline" size={32} color="#6B7280" />
                <Text className="text-gray-400 text-lg font-medium mt-4">Geen afspraken op deze dag</Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}

      {/* Add Item Modal */}
      <AddItemModal
        visible={modalVisible}
        selectedDate={typeof selectedDate === 'string' ? selectedDate : new Date().toISOString().split('T')[0]}
        onClose={() => setModalVisible(false)}
        onAdd={addAgendaItem}
      />
    </SafeAreaView>
  );
}