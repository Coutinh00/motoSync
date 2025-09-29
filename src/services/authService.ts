import api from './api';
import storage from './storage';

/**
 * Auth service: centraliza chamadas de login/signup e persistência do usuário.
 * - signin: faz POST /login e salva usuário no storage
 * - signup: faz POST /users e salva usuário no storage
 * - signout: limpa sessão local
 */

type Credentials = { email: string; password: string };

export const signin = async ({ email, password }: Credentials) => {
  try {
    const res = await api.post('login', { email, password });
    if (res && res.user) {
      await storage.setItem('user', res.user);
      return { ok: true, user: res.user };
    }
    return { ok: false, message: res.message || 'Erro' };
  } catch (e) {
    return { ok: false, message: (e as Error).message };
  }
};

export const signup = async ({ email, password }: Credentials) => {
  try {
    const res = await api.post('users', { email, password });
    if (res && res.id) {
      await storage.setItem('user', res);
      return { ok: true, user: res };
    }
    return { ok: false, message: res.message || 'Erro' };
  } catch (e) {
    return { ok: false, message: (e as Error).message };
  }
};

export const signout = async () => {
  await storage.setItem('user', null);
};

export default { signin, signup, signout };


