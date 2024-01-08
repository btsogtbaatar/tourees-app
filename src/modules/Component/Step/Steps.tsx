import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Colors } from '../../../../constants/Colors';

interface PropsStep {
  groupSteps?: any;
  steps?: any;
}

export default function Steps({ steps, groupSteps }: PropsStep) {
  const [step, setStep] = useState(1);

  return (
    <View
      style={[
        {
          width: '100%',
          paddingHorizontal: 12,
          zIndex: 2,
          paddingBottom: 8,
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 6,
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}>
        {groupSteps.map((item: any, index: number) => {
          return (
            <>
              <View style={[{}]}>
                <View
                  style={[
                    {
                      height: 20,
                      width: 20,
                      borderRadius: 10,
                      backgroundColor:
                        (steps ? steps : step) >= index + 1
                          ? Colors.placeColor
                          : 'transparent',
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}>
                  <View
                    style={[
                      {
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor:
                          (steps ? steps : step) >= index + 1
                            ? Colors.primaryColor
                            : Colors.brandGray,
                        alignSelf: 'center',
                      },
                    ]}></View>
                </View>
              </View>

              {groupSteps.length > index + 1 && (
                <View
                  style={[
                    {
                      width:
                        (steps ? steps : step) == index + 1
                          ? `${100 / (groupSteps.length - 2)}%`
                          : `${100 / (groupSteps.length + 4)}%`,
                      backgroundColor:
                        (steps ? steps : step) >= index + 1
                          ? Colors.placeColor
                          : Colors.textWhite,
                      borderWidth: 0.5,
                      borderColor: Colors.brandGray200,
                      alignSelf: 'center',
                      alignItems: 'center',
                    },
                  ]}>
                  {/* <Text>test</Text> */}
                  {/* <View style={[{borderWidth: 1, borderColor: 'black'}]}></View> */}
                </View>
              )}
            </>
          );
        })}
      </View>
      <Text
        style={[
          {
            fontSize: 14,
            color: Colors.primaryColor,
            fontWeight: '500',
            marginLeft:
              (steps ? steps : step) > 1
                ? `${(100 / (groupSteps.length + 4)) * (steps ? steps : step)}%`
                : 0,
          },
        ]}>
        {steps ? groupSteps[steps - 1].name : groupSteps[step - 1].name}
      </Text>
    </View>
  );
}
