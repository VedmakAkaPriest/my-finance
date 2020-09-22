import { types, flow, applySnapshot, onSnapshot, applyPatch } from 'mobx-state-tree';
import OAuthStore from './OAuth';

const GDFile = types.model('GDFile', { id: types.identifier, name: types.string });

const GDriveStore = types
  .model('GDriveStore', {
    isLoading: true,
    files: types.array(GDFile),
  })
  .actions(self => ({
    load: flow(function* loadFiles() {
      try {
        const { files /*, nextPageToken */ } = yield fetch(self.buildApiUrl());
        files.forEach(fData => self.files.push(fData));
      } catch (err) {
        console.error(err);
        self.files.clear();
      }
    }),
  }))
  .views(self => ({
    buildApiUrl(grouping = 'user') {
      const key = OAuthStore.getAccessToken();
      return `https://www.googleapis.com/drive/v3/files?key=${key}&corpora=${grouping}&q=mimeType%3D%22application%2Fvnd.google-apps.spreadsheet%22`;
    },
  }));

const gdriveStoreInstance = GDriveStore.create();

export default gdriveStoreInstance;
