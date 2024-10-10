import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CloseIcon } from '../Icon';
import { RemarkTextViewStyle } from './RemarkTextView.style';
import { RemarkListViewStyle } from '../RemarkListView/RemarkListView.style';

interface RemarkTextViewProps {
  arrayText?: string[];
  isDelete?: boolean;
  text?: string;
  label?: string;
}

const RemarkTextView = ({
  arrayText,
  isDelete,
  text,
  label,
}: RemarkTextViewProps) => {
  return (
    <View style={RemarkTextViewStyle.container}>
      <Text style={RemarkTextViewStyle.label}>{label}</Text>
      {text ? (
        <View style={RemarkTextViewStyle.textContainer}>
          <Text style={RemarkTextViewStyle.text}>{text}</Text>
        </View>
      ) : (
        <View style={RemarkTextViewStyle.listTextContainer}>
          {arrayText &&
            arrayText.map(item => {
              return (
                <View key={item} style={[RemarkTextViewStyle.plusButton]}>
                  <Text style={RemarkTextViewStyle.title}>{item}</Text>
                  {isDelete && (
                    <TouchableOpacity style={RemarkListViewStyle.p12}>
                      <CloseIcon width={10} />
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
        </View>
      )}
    </View>
  );
};

export default RemarkTextView;
