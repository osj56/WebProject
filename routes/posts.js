var express = require('express'),
    Post = require('../models/Post'),
    User = require('../models/User');
var router = express.Router();

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/signin');
  }
}


router.get('/', needAuth, function(req, res, next){
  Post.find({}, function(err, posts) {
    if (err) {
      return next(err);
    }
    res.render('posts/index', {posts : posts} );
  });
});


router.get('/new', function(req, res, next) {
  Post.find({}, function(err, post) {
    if (err) {
      return next(err);
    }
    res.render('posts/edit', {post : post});
  });
});


router.get('/:id', function(req, res, next) {
  Post.findById({_id: req.params.id}, function(err, post) {
    if (err) {
      return next(err);
    }
    post.read++;
    res.render('posts/show', {post : post});
    post.save(function(err) {
    if(err) {
      return next(err);
    }
    });
  });
});


router.get('/:id/edit', function(req, res, next) {
  Post.findById({_id: req.params.id}, function(err, post) {
    if (err) {
      return next(err);
    }
    res.render('posts/edit', {post : post});
  });
});


router.delete('/:id', function(req, res, next) {
  Post.findOneAndRemove({_id: req.params.id}, function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/posts');
  });
});


router.put('/:id', function(req, res, next) {
  Post.findById({_id: req.params.id}, function(err, post) {
    if (err) {
      return next(err);
    }
    post.title = req.body.title;
    post.content = req.body.content;
    post.sido = req.body.sido;
    post.address = req.body.address;
    post.address2 = req.body.address2;
    post.postcode = req.body.postcode;
    post.stime = req.body.stime;
    post.ftime = req.body.ftime;
    post.pay = req.body.pay;
    post.org = req.body.org;
    post.orgn = req.body.orgn;
    post.person = req.body.person;
    post.var = req.body.var;
    post.var2 = req.body.var2;
    post.fileupload = req.body.fileupload
    post.save(function(err) {
      if (err) {
        return next(err);
      }
      res.redirect('/posts');
    });
  });
});


router.post('/', function(req, res, next) {
  User.findOne({}, function(err, user) {
    Post.find({}, function(err, post) {
      if (err) {
        return next(err);
      }
      var newPost = new Post({
        email: req.user.email,
        title: req.body.title,
        content: req.body.content,
        postcode: req.body.postcode,
        sido: req.body.sido,
        address: req.body.address,
        address2: req.body.address2,
        stime: req.body.stime,
        ftime: req.body.ftime,
        org: req.body.org,
        orgn: req.body.orgn,
        pay: req.body.pay,
        person: req.body.person,
        var: req.body.var,
        var1: req.body.var1,
        fileupload: req.body.fileupload
      });

      newPost.save(function(err) {
        if (err) {
          return next(err);
        } else {
          res.redirect('/posts');
        }
      });
    });
  });
});


module.exports = router;