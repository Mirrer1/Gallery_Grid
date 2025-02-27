import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

import User from '../models/user';

export default () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({ where: { email } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password!);

            if (result) done(null, exUser);
            else done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
          } else {
            done(null, false, { message: '회원정보가 존재하지 않습니다.' });
          }
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
    )
  );
};
