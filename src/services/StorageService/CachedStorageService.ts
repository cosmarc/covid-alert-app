import {Observable} from 'shared/Observable';
import {ForceScreen} from 'shared/ForceScreen';
import {Region} from 'shared/Region';
import {getSystemLocale} from 'locale/utils';

import {DefaultFutureStorageService, FutureStorageService} from './FutureStorageService';
import {StorageDirectory} from './StorageDirectory';

export class CachedStorageService {
  isOnboarding: Observable<boolean>;
  locale: Observable<string>;
  region: Observable<Region | undefined>;
  onboardedDatetime: Observable<Date | undefined>;
  forceScreen: Observable<ForceScreen | undefined>;
  skipAllSet: Observable<boolean>;
  userStopped: Observable<boolean>;
  hasViewedQrInstructions: Observable<boolean>;

  private storageService: FutureStorageService;

  constructor(storageService: FutureStorageService) {
    this.isOnboarding = new Observable<boolean>(true);
    this.locale = new Observable<string>(getSystemLocale());
    this.region = new Observable<Region | undefined>(undefined);
    this.onboardedDatetime = new Observable<Date | undefined>(undefined);
    this.forceScreen = new Observable<ForceScreen | undefined>(undefined);
    this.skipAllSet = new Observable<boolean>(false);
    this.userStopped = new Observable<boolean>(false);
    this.hasViewedQrInstructions = new Observable<boolean>(false);
    this.storageService = storageService;
  }

  setOnboarded = async (value: boolean) => {
    await this.storageService.save(StorageDirectory.IsOnboardedKey, value ? '1' : '0');
    this.isOnboarding.set(!value);
  };

  setLocale = async (value: string) => {
    await this.storageService.save(StorageDirectory.LocaleKey, value);
    this.locale.set(value);
  };

  setRegion = async (value: Region | undefined) => {
    await this.storageService.save(StorageDirectory.RegionKey, value ? value : '');
    this.region.set(value);
  };

  setOnboardedDatetime = async (value: Date | undefined) => {
    await this.storageService.save(StorageDirectory.OnboardedDatetimeKey, value ? value.toISOString() : '');
    this.onboardedDatetime.set(value);
  };

  setForceScreen = async (value: ForceScreen | undefined) => {
    await this.storageService.save(StorageDirectory.ForceScreenKey, value ? value : '');
    this.forceScreen.set(value);
  };

  setSkipAllSet = async (value: boolean) => {
    await this.storageService.save(StorageDirectory.SkipAllSetKey, value ? '1' : '0');
    this.skipAllSet.set(value);
  };

  setUserStopped = async (value: boolean) => {
    await this.storageService.save(StorageDirectory.UserStoppedKey, value ? '1' : '0');
    this.userStopped.set(value);
  };

  setHasViewedQrInstructions = async (value: boolean) => {
    await this.storageService.save(StorageDirectory.HasViewedQRInstructionsKey, value ? '1' : '0');
    this.hasViewedQrInstructions.set(value);
  };

  init = async () => {
    const isOnboarded = (await this.storageService.retrieve(StorageDirectory.IsOnboardedKey)) === '1';
    this.isOnboarding.set(!isOnboarded);

    const locale = (await this.storageService.retrieve(StorageDirectory.LocaleKey)) || this.locale.get();
    this.locale.set(locale);

    const region =
      ((await this.storageService.retrieve(StorageDirectory.RegionKey)) as Region | undefined) || undefined;
    this.region.set(region);

    const onboardedDatetimeStr =
      ((await this.storageService.retrieve(StorageDirectory.OnboardedDatetimeKey)) as string | undefined) || undefined;
    const onboardedDatetime = onboardedDatetimeStr ? new Date(onboardedDatetimeStr) : undefined;
    this.onboardedDatetime.set(onboardedDatetime);

    const forceScreen =
      ((await this.storageService.retrieve(StorageDirectory.ForceScreenKey)) as ForceScreen | undefined) || undefined;
    this.forceScreen.set(forceScreen);

    const skipAllSet = (await this.storageService.retrieve(StorageDirectory.SkipAllSetKey)) === '1';
    this.skipAllSet.set(skipAllSet);

    const userStopped = (await this.storageService.retrieve(StorageDirectory.UserStoppedKey)) === '1';
    this.userStopped.set(userStopped);

    const hasViewedQrInstructions =
      (await this.storageService.retrieve(StorageDirectory.HasViewedQRInstructionsKey)) === '1';
    this.hasViewedQrInstructions.set(hasViewedQrInstructions);
  };

  reset = async () => {
    this.setOnboarded(false);
    this.setLocale(getSystemLocale());
    this.setRegion(undefined);
    this.setOnboardedDatetime(undefined);
    this.setSkipAllSet(false);
    this.setUserStopped(false);
    this.setHasViewedQrInstructions(false);
    // DO WE REALLY NEED THIS?
    // await AsyncStorage.clear();
  };
}

export const createCachedStorageService = async (
  storageService: FutureStorageService = DefaultFutureStorageService.sharedInstance(),
) => {
  const cachedStorageService = new CachedStorageService(storageService);
  await cachedStorageService.init();
  return cachedStorageService;
};
