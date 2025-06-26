import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { AgendaItemType } from './AgendaItem';

interface DatePickerProps {
  selectedDate: string | null;
  onDateSelect: (date: string | null) => void;
  agendaItems: AgendaItemType[];
  isModalOpen?: boolean;
}

const DAYS_BATCH_SIZE = 10;

function generateDates(startDate: Date, count: number) {
  const dates = [];
  for (let i = 0; i < count; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
}

export function DatePicker({ selectedDate, onDateSelect, agendaItems, isModalOpen }: DatePickerProps) {
  const [visibleDays, setVisibleDays] = useState(DAYS_BATCH_SIZE);
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    const today = new Date();
    setDates(generateDates(today, visibleDays));
  }, [visibleDays]);

  const getItemsForDate = (date: string) => {
    return agendaItems.filter(item => item.date === date);
  };

  const loadMoreDays = () => {
    setVisibleDays((prev) => prev + DAYS_BATCH_SIZE);
  };

  return (
    <FlatList
      data={dates}
      keyExtractor={(date) => date}
      renderItem={({ item: date }) => {
        const dateObj = new Date(date);
        const isSelected = date === selectedDate;
        const items = getItemsForDate(date);
        return (
          <TouchableOpacity
            onPress={() => {
              // If modal is open and we click a different date, select that new date
              // If modal is open and we click the same date, close it
              // If modal is closed, open the selected date
              if (isModalOpen && date !== selectedDate) {
                onDateSelect(date);
              } else {
                onDateSelect(isSelected ? null : date);
              }
            }}
            className={`w-full rounded-xl px-4 py-4 transition-all duration-200 ${
              isSelected ? 'bg-[#87fe04]' : 'bg-gray-800'
            }`}
            style={{
              minHeight: 55,
              marginBottom: 12,
              borderBottomWidth: 1,
              borderBottomColor: '#87fe04',
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
            }}
            activeOpacity={0.8}
          >
            <View className="flex-col">
              <Text className={`text-lg font-bold ${isSelected ? 'text-black' : 'text-white'}`}
                style={{ textTransform: 'capitalize' }}>
                {dateObj.toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long' })}
              </Text>
              {items.length > 0 && (
                <View className="mt-2">
                  <Text className={`font-bold ${isSelected ? 'text-black' : 'text-[#87fe04]'} text-base`}>{items[0].title}</Text>
                  <Text className={`text-xs ${isSelected ? 'text-black/70' : 'text-gray-400'} mt-1`}>{items[0].time}</Text>
                  {items.length > 1 && (
                    <Text className={`text-xs ${isSelected ? 'text-black/70' : 'text-gray-400'} mt-1`}>+{items.length - 1} meer</Text>
                  )}
                </View>
              )}
            </View>
            {isSelected && (
              <TouchableOpacity onPress={() => onDateSelect(null)} className="absolute top-2 right-2">
                <Text className="text-black text-2xl font-bold">×</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        );
      }}
      onEndReached={loadMoreDays}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
    />
  );
}
