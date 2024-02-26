import React from 'react';
import { ScrollView } from 'react-native';
import { ProfileIndexCommon } from '../../../../../../uitls/common';
import GroupedMenuList from '../../../../../Component/GroupedMenuList/GroupedMenuList';

const ProfileMenu = () => {
  const { profileMenus } = ProfileIndexCommon();
  return (
    <ScrollView>
      <GroupedMenuList listItems={profileMenus} />
    </ScrollView>
  );
};

export default ProfileMenu;
