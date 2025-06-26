import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
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
  date: Date;
  location: string;
  type: AgendaItemType['type'];
}

export function AddItemModal({ visible, selectedDate, onClose, onAdd }: AddItemModalProps) {
  const [formData, setFormData] = React.useState<FormData>({
    title: '',
    subject: '',
    date: new Date(),
    location: '',
    type: 'class'
  });

  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [datePickerMode, setDatePickerMode] = React.useState<'date' | 'time'>('date');

  const resetForm = () => {
    setFormData({
      title: '',
      subject: '',
      date: new Date(),
      location: '',
      type: 'class'
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Add proper event handling for web compatibility
  const handleModalBackdropPress = (event: any) => {
    // Only close if clicking the backdrop, not the modal content
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  const handleAdd = () => {
    if (!formData.title || !formData.subject) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    onAdd({
      title: formData.title,
      subject: formData.subject,
      time: formData.date.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }),
      date: formData.date.toISOString().split('T')[0],
      location: formData.location,
      type: formData.type
    });

    resetForm();
  };

  const handleDateChange = (selectedDate: Date) => {
    setShowDatePicker(false);
    setFormData({...formData, date: selectedDate});
  };

  const handleDateCancel = () => {
    setShowDatePicker(false);
  };

  // Web fallback for date/time input
  const handleWebDateChange = (value: string, type: 'date' | 'time') => {
    const currentDate = new Date(formData.date);
    
    if (type === 'date') {
      const [year, month, day] = value.split('-').map(Number);
      currentDate.setFullYear(year, month - 1, day);
    } else if (type === 'time') {
      const [hours, minutes] = value.split(':').map(Number);
      currentDate.setHours(hours, minutes);
    }
    
    setFormData({...formData, date: currentDate});
  };

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const formatTimeForInput = (date: Date) => {
    return date.toTimeString().slice(0, 5);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('nl-NL', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit'
    });
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
      <View 
        className="flex-1 bg-black/50 justify-end"
        onStartShouldSetResponder={() => true}
        onResponderRelease={handleModalBackdropPress}
      >
        <View className="bg-gray-900 rounded-t-3xl p-6 max-h-[90%]">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-white text-xl font-bold">Add New Item</Text>
            <TouchableOpacity 
              onPress={handleClose}
              className="p-2 -m-2" // Add padding for better touch target
            >
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

            {/* Date & Time */}
            <View className="mb-4">
              <Text className="text-gray-400 mb-2 font-medium">Date & Time *</Text>
              
              {Platform.OS === 'web' ? (
                <View className="flex-row space-x-2">
                  {/* Web Date Input */}
                  <View className="flex-1">
                    <input
                      type="date"
                      value={formatDateForInput(formData.date)}
                      onChange={(e) => handleWebDateChange(e.target.value, 'date')}
                      className="w-full bg-gray-800 text-white p-4 rounded-xl text-base border-none outline-none"
                      style={{
                        backgroundColor: '#1f2937',
                        color: 'white',
                        padding: '16px',
                        borderRadius: '12px',
                        border: 'none',
                        fontSize: '16px'
                      }}
                    />
                  </View>
                  
                  {/* Web Time Input */}
                  <View className="flex-1">
                    <input
                      type="time"
                      value={formatTimeForInput(formData.date)}
                      onChange={(e) => handleWebDateChange(e.target.value, 'time')}
                      className="w-full bg-gray-800 text-white p-4 rounded-xl text-base border-none outline-none"
                      style={{
                        backgroundColor: '#1f2937',
                        color: 'white',
                        padding: '16px',
                        borderRadius: '12px',
                        border: 'none',
                        fontSize: '16px'
                      }}
                    />
                  </View>
                </View>
              ) : (
                <View className="flex-row space-x-2">
                  {/* Date Button */}
                  <TouchableOpacity
                    onPress={() => {
                      setDatePickerMode('date');
                      setShowDatePicker(true);
                    }}
                    className="flex-1 bg-gray-800 p-4 rounded-xl flex-row items-center justify-between"
                  >
                    <Text className="text-white text-base">{formatDate(formData.date)}</Text>
                    <Ionicons name="calendar-outline" size={20} color="#6B7280" />
                  </TouchableOpacity>

                  {/* Time Button */}
                  <TouchableOpacity
                    onPress={() => {
                      setDatePickerMode('time');
                      setShowDatePicker(true);
                    }}
                    className="flex-1 bg-gray-800 p-4 rounded-xl flex-row items-center justify-between"
                  >
                    <Text className="text-white text-base">{formatTime(formData.date)}</Text>
                    <Ionicons name="time-outline" size={20} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              )}

              {/* Date/Time Picker - Only for mobile */}
              {Platform.OS !== 'web' && (
                <DateTimePicker
                  isVisible={showDatePicker}
                  mode={datePickerMode}
                  onConfirm={handleDateChange}
                  onCancel={handleDateCancel}
                  date={formData.date}
                  minimumDate={new Date()}
                  is24Hour={true}
                />
              )}
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
              style={Platform.OS === 'web' ? { cursor: 'pointer' } : {}}
            >
              <Text className="text-black font-bold text-lg">Add Item</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}