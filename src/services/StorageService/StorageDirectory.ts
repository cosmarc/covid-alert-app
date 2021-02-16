import {KeyDefinition, StorageType} from './StorageService';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class StorageDirectory {
  // TO REORGANIZE
  static readonly OnboardedDatetimeKey: KeyDefinition = {
    keyIdentifier: 'OnboardedDatetime',
    storageType: StorageType.Unsecure,
  };

  static readonly NavigationStateKey: KeyDefinition = {
    keyIdentifier: 'navigationState',
    storageType: StorageType.Unsecure,
  };

  static readonly RegionKey: KeyDefinition = {
    keyIdentifier: 'Region',
    storageType: StorageType.Unsecure,
  };

  static readonly LocaleKey: KeyDefinition = {
    keyIdentifier: 'Locale',
    storageType: StorageType.Unsecure,
  };

  static readonly OutbreakHistoryKey: KeyDefinition = {
    keyIdentifier: 'OutbreakHistory',
    storageType: StorageType.Unsecure,
  };

  static readonly CheckInHistoryKey: KeyDefinition = {
    keyIdentifier: 'CheckInHistory',
    storageType: StorageType.Unsecure,
  };

  static readonly IsOnboardedKey: KeyDefinition = {
    keyIdentifier: 'IsOnboarded',
    storageType: StorageType.Unsecure,
  };

  static readonly ForceScreenKey: KeyDefinition = {
    keyIdentifier: 'ForceScreen',
    storageType: StorageType.Unsecure,
  };

  static readonly SkipAllSetKey: KeyDefinition = {
    keyIdentifier: 'SkipAllSet',
    storageType: StorageType.Unsecure,
  };

  static readonly UserStoppedKey: KeyDefinition = {
    keyIdentifier: 'UserStopped',
    storageType: StorageType.Unsecure,
  };

  static readonly HasViewedQRInstructionsKey: KeyDefinition = {
    keyIdentifier: 'HasViewedQRInstructions',
    storageType: StorageType.Unsecure,
  };

  static readonly InitialTekUploadCompleteKey: KeyDefinition = {
    keyIdentifier: 'INITIAL_TEK_UPLOAD_COMPLETE',
    storageType: StorageType.Unsecure,
  };

  static readonly RegionContentKey: KeyDefinition = {
    keyIdentifier: '30F6F699-43F7-44A1-B138-89278C25A1AB',
    storageType: StorageType.Unsecure,
  };

  static readonly LastUploadedTekStartTimeKey: KeyDefinition = {
    keyIdentifier: 'LAST_UPLOADED_TEK_START_TIME',
    storageType: StorageType.Unsecure,
  };

  static readonly UUIDKey: KeyDefinition = {
    keyIdentifier: 'UUID_KEY',
    storageType: StorageType.Unsecure,
  };

  // OutbreakProvider.tsx
  static readonly OutbreaksLastCheckedStorageKey: KeyDefinition = {
    keyIdentifier: 'A436ED42-707E-11EB-9439-0242AC130002',
    storageType: StorageType.Secure,
  };

  // ExposureNotificationService.ts
  static readonly ExposureNotificationServiceExposureHistoryKey: KeyDefinition = {
    keyIdentifier: 'exposureHistory',
    storageType: StorageType.Secure,
  };

  static readonly ExposureNotificationServiceSubmissionAuthKeysKey: KeyDefinition = {
    keyIdentifier: 'submissionAuthKeys',
    storageType: StorageType.Secure,
  };

  static readonly ExposureNotificationServiceExposureStatusKey: KeyDefinition = {
    keyIdentifier: 'exposureStatus',
    storageType: StorageType.Unsecure,
  };

  static readonly ExposureNotificationServiceExposureConfigurationKey: KeyDefinition = {
    keyIdentifier: 'exposureConfiguration',
    storageType: StorageType.Unsecure,
  };

  // PollNotificationService.ts
  static readonly PollNotificationServiceReadReceiptsKey: KeyDefinition = {
    keyIdentifier: 'NotificationReadReceipts',
    storageType: StorageType.Unsecure,
  };

  static readonly PollNotificationServiceEtagStorageKey: KeyDefinition = {
    keyIdentifier: 'NotificationsEtag',
    storageType: StorageType.Unsecure,
  };

  static readonly PollNotificationServiceLastPollNotificationDateTimeKey: KeyDefinition = {
    keyIdentifier: 'LastPollNotificationDateTimeKey',
    storageType: StorageType.Secure,
  };

  // MetricsStorage.ts
  static readonly MetricsStorageKey: KeyDefinition = {
    keyIdentifier: 'AE6AE306-523B-4D92-871E-9D13D5CA9B23',
    storageType: StorageType.Secure,
  };

  // MetricsService.ts
  static readonly MetricsServiceLastMetricTimestampSentToTheServerKey: KeyDefinition = {
    keyIdentifier: '3FFE2346-1910-4FD7-A23F-52D83CFF083A',
    storageType: StorageType.Secure,
  };

  static readonly MetricsServiceMetricsLastUploadedDateTimeKey: KeyDefinition = {
    keyIdentifier: 'C0663511-3718-4D85-B165-A38155DED2F3',
    storageType: StorageType.Secure,
  };

  // FilteredMetricsStateStorage.ts
  static readonly FilteredMetricsStateStorageInstalledEventMarkerKey: KeyDefinition = {
    keyIdentifier: 'A607DDBD-D592-4927-8861-DD1CCEDA8E76',
    storageType: StorageType.Secure,
  };

  static readonly FilteredMetricsStateStorageOnboardedEventMarkerKey: KeyDefinition = {
    keyIdentifier: '0429518A-9D4D-4EB2-A5A8-AEA985DEB1D7',
    storageType: StorageType.Secure,
  };

  static readonly FilteredMetricsStateStorageBackgroundCheckEventMarkerKey: KeyDefinition = {
    keyIdentifier: 'AB398409-D8A9-4BC2-91F0-63E4CEFCD89A',
    storageType: StorageType.Secure,
  };
}
