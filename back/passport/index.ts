import passport from 'passport';

import User from '../models/user';
import local from './localStrategy';

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser<number>(async (id, done) => {
    try {
      const user = await User.findOne({
        where: { id }
      });
      if (!user) {
        return done(new Error('회원정보가 존재하지 않습니다.'));
      }
      return done(null, user);
    } catch (err) {
      console.error(err);
      return done(err);
    }
  });

  local();
};
