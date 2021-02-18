import {CachedStorageService, createCachedStorageService} from '../CachedStorageService';
import {StorageDirectory} from '../StorageDirectory';
import {StorageService} from '../StorageService';

jest.mock('react-native-localize', () => ({
  getLocales: () => [{countryCode: 'US', languageTag: 'en-US', langaugeCode: 'en', isRTL: false}],
}));

const storageService: StorageService = {
  save: jest.fn(),
  retrieve: jest.fn(),
  delete: jest.fn(),
};

describe('CachedStorageService', () => {
  let cachedStorageService: CachedStorageService;

  beforeEach(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    cachedStorageService = await createCachedStorageService(storageService);
  });

  describe('createStorageService', () => {
    it('initializes onboarding status from persistent storage', async () => {
      expect(storageService.retrieve).toHaveBeenCalledWith(StorageDirectory.IsOnboardedKey);
    });

    it('initializes locale from persistent storage', async () => {
      expect(storageService.retrieve).toHaveBeenCalledWith(StorageDirectory.LocaleKey);
    });

    it('initalizes region from persistent storage', async () => {
      expect(storageService.retrieve).toHaveBeenCalledWith(StorageDirectory.RegionKey);
    });

    it('initializes onboardedDateTime from persistent storage', async () => {
      expect(storageService.retrieve).toHaveBeenCalledWith(StorageDirectory.OnboardedDatetimeKey);
    });

    it('initializes forceScreen from persistent storage', async () => {
      expect(storageService.retrieve).toHaveBeenCalledWith(StorageDirectory.ForceScreenKey);
    });

    it('initializes skipAllSet from persistent storage', async () => {
      expect(storageService.retrieve).toHaveBeenCalledWith(StorageDirectory.SkipAllSetKey);
    });
  });

  describe('setOnboarded', () => {
    it('stores the onboarded status to permanent storage', async () => {
      await cachedStorageService.setOnboarded(true);
      expect(storageService.save).toHaveBeenCalledWith(StorageDirectory.IsOnboardedKey, '1');

      await cachedStorageService.setOnboarded(false);
      expect(storageService.save).toHaveBeenCalledWith(StorageDirectory.IsOnboardedKey, '0');
    });

    it('exposes set value as StorageService attribute', async () => {
      await cachedStorageService.setOnboarded(true);
      expect(cachedStorageService.isOnboarding.get()).toStrictEqual(false);

      await cachedStorageService.setOnboarded(false);
      expect(cachedStorageService.isOnboarding.get()).toStrictEqual(true);
    });
  });

  describe('setLocale', () => {
    it('stores the locale to permanent storage', async () => {
      await cachedStorageService.setLocale('en');
      expect(storageService.save).toHaveBeenCalledWith(StorageDirectory.LocaleKey, 'en');

      await cachedStorageService.setLocale('fr_CA');
      expect(storageService.save).toHaveBeenCalledWith(StorageDirectory.LocaleKey, 'fr_CA');
    });

    it('exposes set value as StorageService attribute', async () => {
      await cachedStorageService.setLocale('en_US');
      expect(cachedStorageService.locale.get()).toStrictEqual('en_US');

      await cachedStorageService.setLocale('fr');
      expect(cachedStorageService.locale.get()).toStrictEqual('fr');
    });
  });

  describe('setRegion', () => {
    it('stores the region to permanent storage', async () => {
      await cachedStorageService.setRegion('ABC');
      expect(storageService.save).toHaveBeenCalledWith(StorageDirectory.RegionKey, 'ABC');

      await cachedStorageService.setRegion('asd');
      expect(storageService.save).toHaveBeenCalledWith(StorageDirectory.RegionKey, 'asd');
    });

    it('exposes set value as StorageService attribute', async () => {
      await cachedStorageService.setRegion('qwe');
      expect(cachedStorageService.region.get()).toStrictEqual('qwe');

      await cachedStorageService.setRegion('fddd');
      expect(cachedStorageService.region.get()).toStrictEqual('fddd');
    });
  });

  describe('setOnboardedDatetime', () => {
    it('stores the onboarded date to permanent storage', async () => {
      const d1 = new Date();
      await cachedStorageService.setOnboardedDatetime(d1);
      expect(storageService.save).toHaveBeenCalledWith(StorageDirectory.OnboardedDatetimeKey, d1.toISOString());

      const d2 = new Date();
      await cachedStorageService.setOnboardedDatetime(d2);
      expect(storageService.save).toHaveBeenCalledWith(StorageDirectory.OnboardedDatetimeKey, d2.toISOString());
    });

    it('exposes set value as StorageService attribute', async () => {
      const d1 = new Date();
      await cachedStorageService.setOnboardedDatetime(d1);
      expect(cachedStorageService.onboardedDatetime.get()).toStrictEqual(d1);

      const d2 = new Date();
      await cachedStorageService.setOnboardedDatetime(d2);
      expect(cachedStorageService.onboardedDatetime.get()).toStrictEqual(d2);
    });
  });

  describe('setForceScreen', () => {
    it('stores the forceScreen flag to permanent storage', async () => {
      await cachedStorageService.setForceScreen('testing');
      expect(storageService.save).toHaveBeenCalledWith(StorageDirectory.ForceScreenKey, 'testing');

      await cachedStorageService.setForceScreen('xaz');
      expect(storageService.save).toHaveBeenCalledWith(StorageDirectory.ForceScreenKey, 'xaz');
    });

    it('exposes set value as StorageService attribute', async () => {
      await cachedStorageService.setForceScreen('testing');
      expect(cachedStorageService.forceScreen.get()).toStrictEqual('testing');

      await cachedStorageService.setForceScreen('xaz');
      expect(cachedStorageService.forceScreen.get()).toStrictEqual('xaz');
    });
  });

  describe('setSkipAllSet', () => {
    it('stores the SkipAllSet flag to permanent storage', async () => {
      await cachedStorageService.setSkipAllSet(true);
      expect(storageService.save).toHaveBeenCalledWith(StorageDirectory.SkipAllSetKey, '1');

      await cachedStorageService.setSkipAllSet(false);
      expect(storageService.save).toHaveBeenCalledWith(StorageDirectory.SkipAllSetKey, '0');
    });

    it('exposes set value as StorageService attribute', async () => {
      await cachedStorageService.setSkipAllSet(false);
      expect(cachedStorageService.skipAllSet.get()).toStrictEqual(false);

      await cachedStorageService.setSkipAllSet(true);
      expect(cachedStorageService.skipAllSet.get()).toStrictEqual(true);
    });
  });
});
