import React, {useCallback} from 'react';
import {useI18n} from 'locale';
import {useNavigation} from '@react-navigation/native';
import {Text, ButtonSingleLine, RoundedBox} from 'components';
import {useAccessibilityAutoFocus} from 'shared/useAccessibilityAutoFocus';
import {DefaultStorageService} from 'services/StorageService/StorageService';
import {StorageDirectory} from 'services/StorageService/StorageDirectory';

import {BaseHomeView} from '../components/BaseHomeView';

export const DiagnosedShareUploadView = ({isBottomSheetExpanded}: {isBottomSheetExpanded: boolean}) => {
  const i18n = useI18n();
  const navigation = useNavigation();
  const toDataShare = useCallback(async () => {
    const initialTekUploadComplete = await DefaultStorageService.sharedInstance().retrieve(
      StorageDirectory.GlobalInitialTekUploadCompleteKey,
    );
    const screen = initialTekUploadComplete === 'false' ? 'IntermediateScreen' : 'TekUploadSubsequentDays';
    return navigation.navigate('DataSharing', {screen});
  }, [navigation]);
  const autoFocusRef = useAccessibilityAutoFocus(!isBottomSheetExpanded);

  return (
    <BaseHomeView iconName="hand-reminder-red">
      <RoundedBox isFirstBox>
        <Text focusRef={autoFocusRef} variant="bodyTitle" color="bodyText" marginBottom="m" accessibilityRole="header">
          {i18n.translate('Home.DiagnosedShareUploadView.Title')}
        </Text>
        <Text variant="bodyText" color="bodyText" marginBottom="m">
          {i18n.translate('Home.DiagnosedShareUploadView.Body1')}
        </Text>
        <ButtonSingleLine
          text={i18n.translate('Home.DiagnosedShareUploadView.ButtonCTA')}
          variant="dangerWhiteText"
          onPress={toDataShare}
          iconName="icon-chevron-white"
        />
      </RoundedBox>
    </BaseHomeView>
  );
};
