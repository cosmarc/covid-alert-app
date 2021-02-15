import {FutureStorageService} from 'services/StorageService/FutureStorageService';
import {StorageDirectory} from 'services/StorageService/StorageDirectory';

export interface FilteredMetricsStateStorage {
  markInstalledEventAsPublished(): Promise<void>;
  isInstalledEventPublished(): Promise<boolean>;

  markOnboardedEventShouldBePublished(): Promise<void>;
  shouldOnboardedEventBePublished(): Promise<boolean>;
  markOnboardedEventShouldNotBePublished(): Promise<void>;

  getBackgroundCheckEvents(): Promise<Date[]>;
  saveBackgroundCheckEvents(events: Date[]): Promise<void>;
}

export class DefaultFilteredMetricsStateStorage implements FilteredMetricsStateStorage {
  private storageService: FutureStorageService;

  constructor(storageService: FutureStorageService) {
    this.storageService = storageService;
  }

  markInstalledEventAsPublished(): Promise<void> {
    return this.storageService.save(StorageDirectory.FilteredMetricsStateStorageInstalledEventMarkerKey, 'exists');
  }

  isInstalledEventPublished(): Promise<boolean> {
    return this.storageService
      .retrieve(StorageDirectory.FilteredMetricsStateStorageInstalledEventMarkerKey)
      .then(result => Boolean(result));
  }

  markOnboardedEventShouldBePublished(): Promise<void> {
    return this.storageService.save(
      StorageDirectory.FilteredMetricsStateStorageOnboardedEventMarkerKey,
      JSON.stringify(true),
    );
  }

  shouldOnboardedEventBePublished(): Promise<boolean> {
    return this.storageService
      .retrieve(StorageDirectory.FilteredMetricsStateStorageOnboardedEventMarkerKey)
      .then(result => {
        if (result) {
          return JSON.parse(result);
        } else {
          return false;
        }
      });
  }

  markOnboardedEventShouldNotBePublished(): Promise<void> {
    return this.storageService.save(
      StorageDirectory.FilteredMetricsStateStorageOnboardedEventMarkerKey,
      JSON.stringify(false),
    );
  }

  getBackgroundCheckEvents(): Promise<Date[]> {
    return this.storageService
      .retrieve(StorageDirectory.FilteredMetricsStateStorageBackgroundCheckEventMarkerKey)
      .then(result => {
        if (result) {
          return result.split(',').map(timestamp => new Date(Number(timestamp)));
        } else {
          return [];
        }
      });
  }

  saveBackgroundCheckEvents(events: Date[]): Promise<void> {
    const eventsAsListOfTimestamps = events.map(event => event.getTime());
    return this.storageService.save(
      StorageDirectory.FilteredMetricsStateStorageBackgroundCheckEventMarkerKey,
      eventsAsListOfTimestamps.join(','),
    );
  }
}
