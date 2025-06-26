import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AgendaItemType } from './AgendaItem';

interface AddItemModalProps {
  visible: boolean;
  selectedDate: string;
  onClose: () => void;
  onAdd: (item: Omit<AgendaItemType, 'id'>) => void;
}

interface FormData {
  title: string;
  subject: string;
  time: string;
  location: string;
  type: AgendaItemType['type'];
}

export function AddItemModal({ visible, selectedDate, onClose, onAdd }: AddItemModalProps) {
  const [formData, setFormData] = React.useState<FormData>({
    title: '',
    subject: '',
    time: '',
    location: '',
    type: 'class'
  });

  const resetForm = () => {
    setFormData({
      title: '',
      subject: '',
      time: '',
      location: '',
      type: 'class'
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleAdd = () => {
    if (!formData.title || !formData.subject || !formData.time) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    onAdd({
      title: formData.title,
      subject: formData.subject,
      time: formData.time,
      date: selectedDate,
      location: formData.location,
      type: formData.type
    });

    resetForm();
  };

  const typeOptions: { value: AgendaItemType['type']; label: string; icon: string }[] = [
    { value: 'class', label: 'Class', icon: 'school-outline' },
    { value: 'assignment', label: 'Assignment', icon: 'document-text-outline' },
    { value: 'exam', label: 'Exam', icon: 'clipboard-outline' },
    { value: 'meeting', label: 'Meeting', icon: 'people-outline' }
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-gray-900 rounded-t-3xl p-6 max-h-[90%]">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-white text-xl font-bold">Add New Item</Text>
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Title */}
            <View className="mb-4">
              <Text className="text-gray-400 mb-2 font-medium">Title *</Text>
              <TextInput
                className="bg-gray-800 text-white p-4 rounded-xl text-base"
                placeholder="Enter title"
                placeholderTextColor="#6B7280"
                value={formData.title}
                onChangeText={(text) => setFormData({...formData, title: text})}
              />
            </View>

            {/* Subject */}
            <View className="mb-4">
              <Text className="text-gray-400 mb-2 font-medium">Subject *</Text>
              <TextInput
                className="bg-gray-800 text-white p-4 rounded-xl text-base"
                placeholder="Enter subject"
                placeholderTextColor="#6B7280"
                value={formData.subject}
                onChangeText={(text) => setFormData({...formData, subject: text})}
              />
            </View>

            {/* Time */}
            <View className="mb-4">
              <Text className="text-gray-400 mb-2 font-medium">Time *</Text>
              <TextInput
                className="bg-gray-800 text-white p-4 rounded-xl text-base"
                placeholder="e.g., 09:00 - 10:30"
                placeholderTextColor="#6B7280"
                value={formData.time}
                onChangeText={(text) => setFormData({...formData, time: text})}
              />
            </View>

            {/* Location */}
            <View className="mb-4">
              <Text className="text-gray-400 mb-2 font-medium">Location</Text>
              <TextInput
                className="bg-gray-800 text-white p-4 rounded-xl text-base"
                placeholder="Enter location"
                placeholderTextColor="#6B7280"
                value={formData.location}
                onChangeText={(text) => setFormData({...formData, location: text})}
              />
            </View>

            {/* Type Selection */}
            <View className="mb-6">
              <Text className="text-gray-400 mb-3 font-medium">Type</Text>
              <View className="flex-row flex-wrap">
                {typeOptions.map((option) => {
                  const isSelected = formData.type === option.value;
                  return (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() => setFormData({...formData, type: option.value})}
                      className={`mr-3 mb-2 px-4 py-3 rounded-xl flex-row items-center ${
                        isSelected ? 'bg-[#87fe04]' : 'bg-gray-800'
                      }`}
                    >
                      <Ionicons 
                        name={option.icon as any} 
                        size={16} 
                        color={isSelected ? 'black' : 'white'} 
                      />
                      <Text className={`ml-2 font-medium ${
                        isSelected ? 'text-black' : 'text-white'
                      }`}>
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Add Button */}
            <TouchableOpacity
              onPress={handleAdd}
              className="bg-[#87fe04] rounded-xl p-4 items-center mb-4"
            >
              <Text className="text-black font-bold text-lg">Add Item</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
