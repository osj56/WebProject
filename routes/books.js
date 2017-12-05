var express = require('express'),
    Book = require('../models/Book'),
    Post = require('../models/Post'),
    User = require('../models/User');
var router = express.Router();


router.get('/bookList', function(req, res, next) {
    Book.find({}, function(err, books) {
        if (err) {
            return next(err);
        }
        res.render('books/bookList', {books : books});
    });
});


router.get('/:id/postshow', function(req, res, next) {
  Book.findById({_id: req.params.id}, function(err, book) {
    if (err) {
      return next(err);
    }
  Post.findOne({title: book.title}, function(err, post) {
    if (err) {
      return next(err);
    }
    res.render('posts/show', {post : post});
    });
  });
});



router.get('/:id', function(req, res, next) {
  Post.findById({_id: req.params.id}, function(err, post) {
    if (err) {
      return next(err);
    }
    User.findById({_id: req.params.id}, function(err, user) {
      res.render('books/index', {post : post , user : user});
    });    
  });
});



router.put('/:id/agree', function(req, res, next) {
  Book.findById({_id: req.params.id}, function(err, book) {
    if (err) {
      return next(err);
    }
    book.status= "agree";
    book.save(function(err) {
      if (err) {
        return next(err);
      }
      req.flash('success', '예약을 수락하였습니다');
      res.redirect('/books/bookList');
    });
  });
});


router.put('/:id/reject', function(req, res, next) {
  Book.findOneAndRemove({_id: req.params.id}, function(err, book) {
    if (err) {
      return next(err);
    }
    book.save(function(err) {
      if (err) {
        return next(err);
      }
      req.flash('success', '예약을 거절 하였습니다');
      res.redirect('/books/bookList');
    });
  });
});


router.put('/:id/cancle', function(req, res, next) {
  Book.findOneAndRemove({_id: req.params.id}, function(err, book) {
    if (err) {
      return next(err);
    }
    book.save(function(err) {
      if (err) {
        return next(err);
      }
      req.flash('success', '예약을 취소하였습니다');
      res.redirect('/books/bookList');
    });
  });
});



router.post('/:id', function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
      if (err) {
          return next(err);
      }
      User.findOne({email: req.body.customerEmail}, function(err, user) {
        if (err) {
            return next(err);
        }
        if (req.body.dateFirst > req.body.dateLast) {
          req.flash('danger', '예약 일 수가 맞지 않습니다');
          return res.redirect('back');
        }
        
        var newBook = new Book({
            hostEmail: post.email,
            customerEmail: req.user.email,
            name: req.user.name,
            address: post.address + post.address2,
            pay: post.pay,
            dateFirst: req.body.dateFirst,
            dateLast: req.body.dateLast,
            title: post.title
        });

        newBook.save(function(err) {
            if (err) {
            return next(err);
            } else {
            res.redirect('/books/bookList');
            }
        });
    });
  });
});


module.exports = router;
