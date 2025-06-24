import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AgendaItemComponent, AgendaItemType } from '../components/AgendaItem';
import { DatePicker } from '../components/DatePicker';
import { AddItemModal } from '../components/AddItemModal';

export default function Index() {
  const [agendaItems, setAgendaItems] = useState<AgendaItemType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

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

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar style="light" />
      
      {/* Header */}
      <View className="px-6 py-4 border-b border-gray-800">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-green-500 rounded-2xl items-center justify-center mr-4">
              <Ionicons name="calendar" size={28} color="black" />
            </View>
            <View>
              <Text className="text-green-400 text-3xl font-bold">GLR</Text>
              <Text className="text-white text-lg font-light">Agenda</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="bg-green-500 rounded-2xl px-5 py-3 flex-row items-center"
          >
            <Ionicons name="add" size={24} color="black" />
            <Text className="text-black font-bold ml-2">Add</Text>
          </TouchableOpacity>
        </View>
        
        {/* Stats */}
        <View className="flex-row mt-4 space-x-4 gap-4">
          <View className="bg-gray-900 rounded-xl px-4 py-2 flex-1">
            <Text className="text-gray-400 text-xs">Total Items</Text>
            <Text className="text-white text-lg font-bold">{getTotalItemsCount()}</Text>
          </View>
          <View className="bg-gray-900 rounded-xl px-4 py-2 flex-1">
            <Text className="text-gray-400 text-xs">Upcoming</Text>
            <Text className="text-green-400 text-lg font-bold">{getUpcomingItemsCount()}</Text>
          </View>
        </View>
      </View>

      {/* Date Selection */}
      <DatePicker
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />

      {/* Agenda Items */}
      <ScrollView className="flex-1 px-6">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-white text-xl font-bold">
            {formatDate(selectedDate)}
          </Text>
          <Text className="text-gray-400 text-sm">
            {getItemsForDate(selectedDate).length} {getItemsForDate(selectedDate).length === 1 ? 'item' : 'items'}
          </Text>
        </View>
        
        {getItemsForDate(selectedDate).length === 0 ? (
          <View className="flex-1 items-center justify-center py-16">
            <View className="w-16 h-16 bg-gray-800 rounded-2xl items-center justify-center mb-4">
              <Ionicons name="calendar-outline" size={32} color="#6B7280" />
            </View>
            <Text className="text-gray-400 text-lg font-medium mb-2">No classes scheduled</Text>
            <Text className="text-gray-500 text-sm text-center mb-6">
              Your schedule is free for this day.{'\n'}Tap "Add" to create a new item.
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              className="bg-green-500 rounded-xl px-6 py-3"
            >
              <Text className="text-black font-bold">Add First Item</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="pb-6">
            {getItemsForDate(selectedDate).map((item) => (
              <AgendaItemComponent
                key={item.id}
                item={item}
                onDelete={deleteAgendaItem}
              />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Add Item Modal */}
      <AddItemModal
        visible={modalVisible}
        selectedDate={selectedDate}
        onClose={() => setModalVisible(false)}
        onAdd={addAgendaItem}
      />
    </SafeAreaView>
  );
}
