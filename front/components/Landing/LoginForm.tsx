import React, { useCallback } from 'react';
import { GoogleCircleFilled } from '@ant-design/icons';

import useInput from 'hooks/useInput';

const LoginForm = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [rememberMe, onChangeRememberMe] = useInput(false);

  const onSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      console.log(email, password, rememberMe);
    },
    [email, password, rememberMe]
  );

  return (
    <section>
      <div>
        <GoogleCircleFilled />
        <button type="button">Sign in with Google</button>
      </div>

      <div>
        <span>OR</span>
      </div>

      <form onSubmit={onSubmitForm}>
        <div>
          <input type="text" value={email} onChange={onChangeEmail} required />
          <label>Email address</label>
          <span></span>
        </div>

        <div>
          <input type="password" value={password} onChange={onChangePassword} required />
          <label>Password</label>
          <span></span>
        </div>

        <div>
          <div>
            <label htmlFor="remember-me">Remember me</label>
            <input type="checkbox" id="remember-me" checked={rememberMe} onChange={onChangeRememberMe} />
          </div>

          <button type="button">Forget your password?</button>
        </div>

        <button type="submit">Log in</button>
      </form>
    </section>
  );
};

export default LoginForm;
