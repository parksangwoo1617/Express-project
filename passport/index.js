const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const { User } = require('../models');

module.exports = (passport) => {
    passport.serializeUser((user, done) => { //세션에 사용자 아이디만 저장
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => { //사용자 정보 불러오기
        User.findOne({ where: { id } })
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local(passport);
    kakao(passport);
};
