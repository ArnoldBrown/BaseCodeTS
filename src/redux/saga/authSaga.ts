import { call, put, takeLatest } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure } from '../slices/authSlice';

function simulateLogin(username: string, password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'test' && password === 'password') {
        resolve('fake-jwt-token');
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
}

function* handleLogin(action: ReturnType<typeof loginRequest>) {
  try {
    const { username, password } = action.payload;

    // Call the login function (simulate an API request)
    const token: string = yield call(simulateLogin, username, password);

    // Dispatch success if login succeeds
    yield put(loginSuccess(token));
  } catch (error) {
    // Dispatch failure if login fails
    console.error(error);
    yield put(loginFailure());
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}
