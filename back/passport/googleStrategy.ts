import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import User from '../models/user';
import { GOOGLE_CONFIG } from '../config/auth';

export default () => {
  passport.use(
    new GoogleStrategy(GOOGLE_CONFIG, async (accessToken, refreshToken, profile, done) => {
      try {
        const exUser = await User.findOne({
          where: { snsId: profile.id, provider: 'google' }
        });

        if (exUser) {
          done(null, exUser);
        } else {
          const newUser = await User.create({
            email: profile.emails ? profile.emails[0].value : '',
            nickname: profile.displayName,
            password: null,
            snsId: profile.id,
            provider: 'google',
            desc: '',
            isRecommended: false
          });
          done(null, newUser);
        }
      } catch (error) {
        console.error(error);
        done(error);
      }
    })
  );
};
