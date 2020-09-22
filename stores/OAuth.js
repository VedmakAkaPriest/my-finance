import { types, flow, applySnapshot, onSnapshot, applyPatch } from 'mobx-state-tree';
import persist from './persist/persist';
import * as GoogleAuth from 'expo-google-app-auth';

const gconfig = {
  iosClientId: '292427923626-okif1215gsoc52b4u0gnojfgnj9o007s.apps.googleusercontent.com',
  androidClientId: '292427923626-n7vomip8btvibllb9t1n8rhmoum4m2sj.apps.googleusercontent.com',
  scopes: ['drive.readonly', 'spreadsheets'],
};

const AuthState = types.model('AuthState', {
  type: types.string, // 'success' | 'cancel'
  refreshToken: types.string,
  accessToken: types.string,
  idToken: types.string,
  accessTokenExpirationDate: types.number,
});

const Credentials = types.model('Credentials', {
  id: types.string,
  authState: AuthState,
  config: {
    iosClientId: types.string,
    androidClientId: types.string,
    scopes: types.array(types.string),
  },
});

const OAuthStore = types
  .model('OAuthStore', {
    isLoading: true,
    entries: types.map(Credentials),
  })
  .actions(self => ({
    load: flow(function* loadCredentials() {
      if (!self.entries.has('default')) {
        self.entries.put({ id: 'default', config: gconfig });
      }
      self.isLoading = false;
    }),
    logIn: flow(function* logInAsync() {
      const credentials = self.getCredentials(/*'default'*/);
      const authState = yield GoogleAuth.logInAsync(credentials.config);
      credentials.setAuthState(authState);
    }),
    logOut: flow(function* logOutAsync() {
      const credentials = self.getCredentials(/*'default'*/);
      yield GoogleAuth.logOutAsync({ accessToken: credentials.authState.accessToken, ...credentials.config });
      credentials.setAuthState(null);
    }),
  }))
  .views(self => ({
    /**
     * @returns Credentials
     */
    getCredentials(identifier = 'default') {
      return self.entries.get(identifier);
    },
    getAccessToken(identifier = 'default') {
      const creds = self.entries.get(identifier);
      return creds?.authState?.type === 'success' ? creds.authState.accessToken : null;
    },
  }));

const authStoreInstance = OAuthStore.create();
persist('authStore', authStoreInstance);
authStoreInstance.load();

export default authStoreInstance;
