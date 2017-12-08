module.exports = function(app, passport) {
  app.post('/signin', passport.authenticate('local-signin', {
    successRedirect : '/posts', 
    failureRedirect : '/signin',
    failureFlash : true 
  }));

  app.get('/auth/facebook',
    passport.authenticate('facebook', { scope : ['email'] })
  );

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect : '/signin',
      failureFlash : true 
    }),
    function(req, res, next) {
      req.flash('success', '로그인되었습니다.');
      res.redirect('/posts');
    }
  );

  app.get('/signout', function(req, res) {
    req.logout();
    req.flash('success', '로그아웃 되었습니다.');
    res.redirect('/');
  });
};
