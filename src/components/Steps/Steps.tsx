import React from 'react';
import { View } from 'react-native';
import { colors } from '../../theme/colors';
import { CheckIcon, StepCircleIcon } from '../Icon';
import StepStyle from './Steps.style';

interface StepsProp {
  totalSteps: number;
  currentStepIndex: number;
}

export default function Steps(props: StepsProp) {
  if (props.totalSteps < 1) {
    throw new Error('Total steps must be greater than 1.');
  }

  if (props.currentStepIndex < 0) {
    throw new Error('Current step must be greater than 0.');
  }

  if (props.currentStepIndex > props.totalSteps) {
    throw new Error('Current step cannot be greater than total steps.');
  }

  const getSteps = () => {
    const steps: React.ReactNode[] = [];

    for (let stepIndex = 1; stepIndex <= props.totalSteps; stepIndex++) {
      const isVisited = stepIndex < props.currentStepIndex;

      steps.push(getStep(stepIndex));

      if (stepIndex < props.totalSteps) {
        steps.push(<Trail key={stepIndex} isVisited={isVisited} />);
      }
    }

    return steps;
  };

  const getStep = (index: number) => {
    if (index === props.totalSteps) {
      if (index === props.currentStepIndex) {
        return (
          <View style={[StepStyle.step, StepStyle.completed]}>
            <CheckIcon height={12} width={12} color={colors.white} />
          </View>
        );
      } else {
        return (
          <View style={[StepStyle.step, StepStyle.uncompleted]}>
            <CheckIcon height={8} width={8} color={colors.gray300} />
          </View>
        );
      }
    }

    if (index === props.currentStepIndex) {
      return (
        <View style={[StepStyle.step, StepStyle.active]}>
          <StepCircleIcon color={colors.primaryGradient} />
        </View>
      );
    } else {
      const isVisited = index < props.currentStepIndex;

      return (
        <View style={StepStyle.step}>
          <StepCircleIcon
            color={isVisited ? colors.success : colors.borderColor}
          />
        </View>
      );
    }
  };

  return <View style={StepStyle.container}>{getSteps()}</View>;
}

interface TrailProps {
  isVisited: boolean;
}

function Trail({ isVisited }: TrailProps) {
  return (
    <View
      style={[
        StepStyle.trail,
        {
          borderColor: isVisited ? colors.success : colors.borderColor,
        },
      ]}
    />
  );
}
