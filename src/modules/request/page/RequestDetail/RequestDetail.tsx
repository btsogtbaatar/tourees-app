import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { RootStackParamList } from '../../../../navigation/types';
import { SeperatorType, TaskModel } from '../../entities/request.model';
import {
  getChats,
  sendChat,
  subscribeToNotification,
} from '../../service/request.service';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../Auth/slice/authSlice';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import CustomKeyboardAvoidingView from '../../../../components/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';
import { verticalScale } from '../../../../utilities';
import moment, { Moment } from 'moment';
import CustomDivider from '../../../../components/CustomDivider/CustomDivider';
import SpeechBubble from '../../component/SpeechBubble/SpeechBubble';
import TimeSeparator from '../../component/TimeSeparator/TimeSeparator';
import InputSection from '../../component/InputSection/InputSection';

type Props = NativeStackScreenProps<RootStackParamList, 'RequestDetail'>;

const RequestDetail = (props: Props) => {
  const { id } = props.route.params;
  const user = useSelector(selectUser);
  const [state, setState] = useState<TaskModel.Message[]>([]);

  useEffect(() => {
    getChats(id)
      .then(res => {
        const chats: TaskModel.Message[] = [];
        if (res && res.length == 0) {
          return;
        }
        chats.push({ ...res[0], type: SeperatorType.CHAT });
        let prev = res[0];
        for (let i = 1; i < res.length; i++) {
          addSeparator(
            prev,
            res[i],
            (a, b) => a.subtract(10, 'minutes').isAfter(b),
            moment(res[i].createdDate),
            chats,
            res[i].user.id,
          );
          prev = res[i];
        }
        setState(chats);
      })
      .catch(e => {
        console.log('error', e);
      });
  }, []);
  useEffect(() => {
    const client = subscribeToNotification(res => {
      if (res.taskID !== id) {
        return;
      }
      setState(prev => {
        const current = { ...res, type: SeperatorType.CHAT };
        const newState: TaskModel.Message[] = [];
        const previous = prev[0] as TaskModel.Chat;
        addSeparator(
          previous,
          current,
          (a, b) => a.add(10, 'minutes').isBefore(b),
          moment(previous.createdDate),
          newState,
          previous.user.id,
        );
        return [...newState.reverse(), ...prev];
      });
    });
    client.activate();
    return () => {
      client.deactivate();
    };
  }, []);

  const addSeparator = (
    prev: TaskModel.Chat,
    current: TaskModel.Chat,
    comperator: (p: Moment, c: Moment) => boolean,
    date: Moment,
    chats: TaskModel.Message[],
    userID: number,
  ) => {
    const prevDate = moment(prev.createdDate.split('T')[0]);
    const prevTime = moment(prev.createdDate);
    const currentDate = moment(current.createdDate.split('T')[0]);
    const currentTime = moment(current.createdDate);

    if (!currentDate.isSame(prevDate)) {
      chats.push({
        type: SeperatorType.DATE,
        id: userID,
        message: date.format('DD/MM/YYYY'),
      });
    }
    if (comperator(prevTime, currentTime) || prev.user.id != current.user.id) {
      chats.push({
        type: SeperatorType.TIME,
        id: userID,
        message: date.format('hh:mm'),
      });
    }
    chats.push({ ...current, type: SeperatorType.CHAT });
  };

  const submit = (input: string) => {
    if (input.length == 0) {
      return;
    }
    sendChat(id, input);
  };
  return (
    <CustomKeyboardAvoidingView>
      <CustomSafeAreaView style={{ padding: verticalScale(10) }}>
        <ContainerView>
          {/* <RequestMessage time="18:11" newRequest={true} />
      {status != TaskStatus.ASSIGNED && (
        <RequestMessage time="18:11" newRequest={false} />
      )} */}
          <FlatList
            data={state}
            inverted
            ItemSeparatorComponent={() => <View style={{ marginTop: 6 }} />}
            keyExtractor={(item, key) => {
              return key.toString();
            }}
            renderItem={({ item }) => {
              switch (item.type) {
                case SeperatorType.CHAT:
                  return (
                    <SpeechBubble
                      item={{ ...item } as TaskModel.Chat}
                      id={user?.id}
                    />
                  );
                case SeperatorType.DATE:
                  return <CustomDivider>{item.message}</CustomDivider>;
                case SeperatorType.TIME:
                  return (
                    <TimeSeparator
                      userID={user?.id}
                      ownerID={item.id}
                      time={item.message}
                    />
                  );
                default:
                  return <View></View>;
              }
            }}
          />
          <InputSection callback={submit} />
        </ContainerView>
      </CustomSafeAreaView>
    </CustomKeyboardAvoidingView>
  );
};

export default RequestDetail;
