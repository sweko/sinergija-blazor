import * as express from "express";

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'TS-Express' });
});

/* GET authors list. */
router.get('/authors-client', function (req, res, next) {
  res.render('authors-cl', {});
});

router.get('/authors-rest', function (req, res, next) {
  res.render('authors-rest', {});
});

router.get('/author/:id', function (req, res, next) {
  const id = Number(req.params.id);
  res.render('author', { id });
});

router.get('/login', function (req, res, next) {
  res.render('login', {});
});

router.get('/admin', function (req, res, next) {
  res.render('admin', {});
});

export { router as defaultRouter };
