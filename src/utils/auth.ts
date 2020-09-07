import qs from 'qs';
import { writable } from 'svelte/store';
import { mockFetch } from './fetch';

export type User = {
  email: string;
  user_metadata: any;
};
type SpecialToken = {
  type: 'invite' | 'recovery';
  token: string;
};

export const specialToken = writable<SpecialToken>(null);
export const authError = writable('');

const initAuthClient = () => {
  const mockUser: User = {
    email: 'example@example.com',
    user_metadata: {
      full_name: 'Example User',
      access_key: 'example',
    },
  };

  // Parse possible tokens in hash on init
  const { invite_token, recovery_token } = qs.parse(
    window.location.hash.replace(/^#/, '')
  );

  if (invite_token && typeof invite_token === 'string') {
    specialToken.set({ type: 'invite', token: invite_token });
  } else if (recovery_token && typeof recovery_token === 'string') {
    specialToken.set({ type: 'recovery', token: recovery_token });
  }

  window.location.hash = '';

  function setError(e: any) {
    const codeStr = e && e.status ? ` (${e.status})` : '';
    if (e && e.json && e.json.error_description) {
      authError.set(`${e.json.error_description}${codeStr}`);
    } else if (e && e.json && e.json.msg) {
      authError.set(`${e.json.msg}${codeStr}`);
    } else {
      authError.set(JSON.stringify(e, null, 2));
    }
  }

  async function signUp(_token: string, _password: string) {
    return mockFetch(mockUser)
      .then((u) => {
        specialToken.set(null);
        user.set(u);
      })
      .catch(setError);
  }

  async function logIn(_email: string, _password: string, _remember: boolean) {
    return mockFetch(mockUser)
      .then((u) => user.set(u))
      .catch(setError);
  }

  function getUser(): User | null {
    return mockUser;
  }

  async function logOut() {
    const u = mockUser;
    if (!u) {
      user.set(null);
      return;
    }
    return mockFetch(null)
      .then(() => user.set(null))
      .catch(setError);
  }

  async function changeLoginDetails(
    _email: string,
    _password: string,
    _data: { full_name?: string; access_key?: string }
  ) {
    const u = mockUser;
    if (!u) {
      authError.set('No user found! Please log in again.');
    }
    return mockFetch(mockUser)
      .then((u) => {
        user.set(u);
      })
      .catch(setError);
  }

  async function requestPasswordRecovery(_email: string) {
    return mockFetch(null).catch(setError);
  }

  async function initRecoverPassword(_token: string) {
    return mockFetch(mockUser)
      .then((u) => user.set(u))
      .catch(
        () => null // fail silently
      );
  }

  async function recoverPassword(_token: string, _password: string) {
    return mockFetch(mockUser)
      .then((u) => {
        return mockFetch(mockUser).then((u) => {
          specialToken.set(null);
          user.set(u);
        });
      })
      .catch(setError);
  }

  function getAccessKey(): string {
    const u = getUser();
    return (u && u.user_metadata && u.user_metadata.access_key) || '';
  }

  return {
    signUp,
    logIn,
    logOut,
    getUser,
    changeLoginDetails,
    requestPasswordRecovery,
    initRecoverPassword,
    recoverPassword,
    getAccessKey,
  };
};

export const authClient = initAuthClient();

export const user = writable<User | null>(authClient.getUser());
