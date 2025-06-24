import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

interface DatePickerProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

export function DatePicker({ selectedDate, onDateSelect }: DatePickerProps) {
  const getDatesForWeek = () => {
    const today = new Date();
    const dates = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    return dates;
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-4">
      <View className="flex-row px-4">
        {getDatesForWeek().map((date, index) => {
          const dateObj = new Date(date);
          const isSelected = date === selectedDate;
          const isToday = date === new Date().toISOString().split('T')[0];
          
          return (
            <TouchableOpacity
              key={date}
              onPress={() => onDateSelect(date)}
              className={`mx-2 px-4 py-3 rounded-xl min-w-[80px] items-center ${
                isSelected 
                  ? 'bg-green-500' 
                  : isToday 
                  ? 'bg-gray-800 border border-green-500' 
                  : 'bg-gray-800'
              }`}
            >
              <Text className={`text-xs font-medium ${
                isSelected ? 'text-black' : 'text-gray-400'
              }`}>
                {dateObj.toLocaleDateString('en-US', { weekday: 'short' })}
              </Text>
              <Text className={`text-lg font-bold ${
                isSelected ? 'text-black' : 'text-white'
              }`}>
                {dateObj.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}
