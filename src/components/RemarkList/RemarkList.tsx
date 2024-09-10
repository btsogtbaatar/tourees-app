import React, { useContext, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { PlusIcon } from '../Icon';
import { RemarkListStyle } from './RemarkList.style';
import { defaultMark } from '../../modules/Tasker/common/common';
import { RemarkModel } from '../../modules/Tasker/entities/remark.mode';
import { actions } from '../../context/modal/modal.reducer';
import { ModalContext } from '../../context/modal/modal.context';
import RemarkListModal from '../RemarkListModal/RemarkListModal';

interface RemarkListProps {
  label: string;
}

const RemarkList = ({ label }: RemarkListProps) => {
  const [remark, setRemark] = useState<RemarkModel.RemarkItem[]>([]);
  const { dispatch: dispatchModal } = useContext(ModalContext);
  useEffect(() => {
    const data: RemarkModel.RemarkItem[] = [];
    defaultMark.forEach((item) => {
      if (item.show) {
        data.push(item);
      }
    });
    if (data.length > 0) {
      setRemark(data);
    }
  }, []);
  const openModal = () => {
    dispatchModal({
      type: actions.SHOW,
      component: <RemarkListModal label={label} />,
      direction: 'bottom',
      closeOnBackDropPress: true,
      closeOnSwipeComplete: true,
    });
  };

  return (
    <View style={RemarkListStyle.header}>
      <Text style={RemarkListStyle.label}>{label}</Text>
      <View style={RemarkListStyle.container}>
        <TouchableOpacity
          onPress={openModal}
          style={RemarkListStyle.plusButton}
          children={<PlusIcon width={16} />}
        />
        {remark.map((item) => {
          if (item.show) {
            return (
              <TouchableOpacity
                key={item.id}
                style={RemarkListStyle.plusButton}
                children={
                  <Text style={RemarkListStyle.title}>{item.label}</Text>
                }
              />
            );
          }
        })}
      </View>
    </View>
  );
};

export default RemarkList;
