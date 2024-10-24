import { NativeStackScreenProps } from '@react-navigation/native-stack';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomDivider from '../../../../components/CustomDivider/CustomDivider';
import CustomKeyboardAvoidingView from '../../../../components/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';
import { RootStackParamList } from '../../../../navigation/types';
import { selectUser } from '../../../Auth/slice/authSlice';
import InputSection from '../../component/InputSection/InputSection';
import SpeechBubble from '../../component/SpeechBubble/SpeechBubble';
import TimeSeparator from '../../component/TimeSeparator/TimeSeparator';
import { SeparatorType, TaskModel } from '../../entities/request.model';
import {
  addSeparator,
  getChats,
  getConversation,
  sendChat,
} from '../../service/chat.service';
import { useStompConnection } from '../../../Shared/hooks';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import { ImageSource } from '../../../../components/ImageUploadButton/ImageUploadButton';
import { uniqueId } from 'lodash';
import MessageWidget from '../../component/MessageWidget/MessageWidget';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

const Chat = (props: Props) => {
  const { id } = props.route.params;
  const user = useSelector(selectUser);
  const [state, setState] = useState<TaskModel.Message[]>([]);
  const [profile, setProfile] = useState<TaskModel.User | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const fetchPage = (
    page: number,
    callback: (value: TaskModel.Message[]) => void,
  ) => {
    getChats(id, page, 30)
      .then(data => {
        const res = data.content;
        setLastPage(data.totalPages);
        const chats: TaskModel.Message[] = [];
        if (res && res.length == 0) {
          return;
        }
        chats.push({ ...res[0], type: SeparatorType.CHAT });
        let prev = res[0];
        for (let i = 1; i < res.length; i++) {
          const separated = addSeparator(
            prev,
            res[i],
            (a, b) => a.subtract(10, 'minutes').isAfter(b),
            moment(res[i].createdDate),
            res[i].user.id,
          );
          prev = res[i];
          chats.push(...separated);
        }
        callback(chats);
      })
      .catch(e => {
        console.log('error retrieving chats :', e);
      });
  };
  useEffect(() => {
    fetchPage(0, value => {
      setState(value);
    });
    getConversation(id).then(data => {
      if (data.contractor.id !== user?.id) {
        setProfile(data.contractor);
      } else {
        setProfile(data.customer);
      }
    });
  }, []);
  useStompConnection<TaskModel.Chat>(`chat/${id}`, res => {
    setState(prev => {
      const current = { ...res, type: SeparatorType.CHAT };
      if (prev.length === 0) {
        return [current];
      }
      const previous = prev[0] as TaskModel.Chat;
      const chats = addSeparator(
        previous,
        current,
        (a, b) => a.add(10, 'minutes').isBefore(b),
        moment(previous.createdDate),
        previous.user.id,
      );
      return [...chats.reverse(), ...prev];
    });
  });
  const fetchMore = () => {
    if (loadingMore) {
      return;
    }
    if (currentPage > lastPage) {
      return;
    }
    setLoadingMore(true);
    setCurrentPage(currentPage + 1);
    fetchPage(currentPage + 1, value => {
      setState(prev => {
        return [...prev, ...value];
      });
      setLoadingMore(false);
    });
  };
  const submit = (input: string) => {
    if (input.length == 0) {
      return;
    }
    sendChat(id, input);
  };
  const sendPictures = (images: ImageSource[]) => {
    if (images.length == 0) {
      return;
    }
    sendChat(id, undefined, images);
  };
  return (
    <CustomKeyboardAvoidingView>
      <CustomSafeAreaView>
        <ContainerView>
          {profile && (
            <MessageWidget
              user={profile}
              onClick={() => {
                props.navigation.navigate('TaskerView', { id: profile.id });
              }}
            />
          )}
          <FlatList
            data={state}
            inverted
            onEndReached={fetchMore}
            onEndReachedThreshold={0.1}
            pagingEnabled={true}
            ItemSeparatorComponent={() => <View style={{ marginTop: 6 }} />}
            keyExtractor={(item, key) => {
              if (item.type === SeparatorType.CHAT) {
                return item.id.toString();
              }
              return uniqueId('separator');
            }}
            renderItem={({ item }) => {
              switch (item.type) {
                case SeparatorType.CHAT:
                  return (
                    <SpeechBubble
                      item={{ ...item } as TaskModel.Chat}
                      id={user?.id}
                    />
                  );
                case SeparatorType.DATE:
                  return <CustomDivider>{item.message}</CustomDivider>;
                case SeparatorType.TIME:
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
          <InputSection onSubmit={submit} onImageSubmit={sendPictures} />
        </ContainerView>
      </CustomSafeAreaView>
    </CustomKeyboardAvoidingView>
  );
};
export default Chat;
