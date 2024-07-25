import React from 'react';
import { View } from 'react-native';
import CheckIcon from '../../assets/svg/auth/CheckIcon';
import StepCircleIcon from '../../assets/svg/auth/StepCircleIcon';
import { colors } from '../../constants/colors';

interface PropsStep {
  groupSteps: number;
  steps: number;
}

export default function Steps({ steps, groupSteps }: PropsStep) {
  const viewStep = () => {
    const render: React.ReactNode[] = [];
    for (let index = 0; index < groupSteps; index++) {
      const width = index + 1 < groupSteps ? 100 / 2.5 : 0;
      const oldStep: boolean = index + 1 < steps;
      render.push(
        <View
          key={index}
          style={{
            flexDirection: 'row',
            width: `${width}%`,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 5,
          }}>
          {index === groupSteps - 1 && index + 1 === steps ? (
            <View
              style={{
                height: 20,
                width: 20,
                borderRadius: 10,
                marginRight: 4,
                backgroundColor: '#46DC9D',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CheckIcon />
            </View>
          ) : index + 1 === steps ? (
            <View
              style={{
                padding: 4,
                borderRadius: 10,
                backgroundColor: 'rgba(255, 150, 70, 0.2)',
                zIndex: -1,
              }}>
              <StepCircleIcon color={colors.primaryColor} />
            </View>
          ) : (
            <StepCircleIcon
              color={oldStep ? colors.successsColor : colors.borderColor}
            />
          )}
          {index + 1 < groupSteps && (
            <View
              style={{
                width: '100%',
                borderColor: oldStep
                  ? colors.successsColor
                  : colors.borderColor,
                borderWidth: 0.5,
                alignSelf: 'center',
                alignItems: 'center',
                marginHorizontal: 8,
              }}
            />
          )}
        </View>,
      );
    }
    return render;
  };

  return (
    <View
      style={{
        paddingVertical: 8,
        paddingHorizontal: 48,
        alignItems: 'flex-start',
        flexDirection: 'row',
      }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {viewStep()}
      </View>
    </View>
  );
}