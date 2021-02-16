/**
 * @format
 */
import 'react-native-gesture-handler';

import ExposureNotification from 'bridge/ExposureNotification';
import {HMAC_KEY, RETRIEVE_URL, SUBMIT_URL} from 'env';
import {AppRegistry, LogBox, Platform} from 'react-native';
import {BackendService} from 'services/BackendService';
import {BackgroundScheduler} from 'services/BackgroundSchedulerService';
import {ExposureNotificationService} from 'services/ExposureNotificationService';
import {createBackgroundI18n} from 'locale';
import {DefaultStorageService} from 'services/StorageService/StorageService';

import {name as appName} from '../app.json';

import App from './App';

AppRegistry.registerComponent(appName, () => App);

if (Platform.OS === 'android') {
  BackgroundScheduler.registerAndroidHeadlessPeriodicTask(async () => {
    const backendService = new BackendService(
      RETRIEVE_URL,
      SUBMIT_URL,
      HMAC_KEY,
      DefaultStorageService.sharedInstance(),
    );
    const i18n = await createBackgroundI18n();
    const exposureNotificationService = new ExposureNotificationService(
      backendService,
      i18n,
      DefaultStorageService.sharedInstance(),
      ExposureNotification,
    );
    await exposureNotificationService.updateExposureStatusInBackground();
  });

  BackgroundScheduler.registerAndroidHeadlessExposureCheckPeriodicTask(async () => {
    const backendService = new BackendService(
      RETRIEVE_URL,
      SUBMIT_URL,
      HMAC_KEY,
      DefaultStorageService.sharedInstance(),
    );
    const i18n = await createBackgroundI18n();
    const exposureNotificationService = new ExposureNotificationService(
      backendService,
      i18n,
      DefaultStorageService.sharedInstance(),
      ExposureNotification,
    );
    if (await exposureNotificationService.shouldPerformExposureCheck()) {
      await exposureNotificationService.initiateExposureCheckHeadless();
    }
  });
}

if (__DEV__) {
  LogBox.ignoreLogs([
    // Triggered by a lot of third party modules and not really actionable.
    'Require cycle:',
    // From 'react-native-snap-carousel', see https://github.com/archriss/react-native-snap-carousel/issues/672.
    'Calling `getNode()` on the ref of an Animated component is no longer necessary',
    // From 'react-native-zip-archive'.
    'Sending `zipArchiveProgressEvent` with no listeners registered.',
  ]);
}
