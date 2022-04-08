const express = require('express');

const chaptersController = require('../controllers/chaptersController');
const utilController = require('../controllers/utilController');
const authController = require('../controllers/authController');
const chapterItemsRouter = require('./chapterItems');

const router = express.Router();

router.use('/:chapterId/items', chapterItemsRouter);

router.get('/',
  chaptersController.getAllChapters,
  (req, res) => {
    return res.status(200).json({
      chapters: res.locals.chapters,
    });
  }
);

router.get('/:chapterId',
  chaptersController.getChapter,
  (req, res) => {
    return res.status(200).json({
      chapter: res.locals.chapter,
    });
  }
);

// Require authentication for all subsequent requests
router.use(authController.validateToken, (req, res, next) => {
  next('route');
});

router.put('/:chapterId',
  chaptersController.storeTableAndColumnNames,
  utilController.toSqlUpdateQuery,
  chaptersController.getGeocode,
  chaptersController.updateChapter,
  (req, res) => {
    return res.status(200).send('Update chapter success');
  }
);

router.delete('/:chapterId',
  chaptersController.deleteChapter,
  (req, res) => {
    return res.status(200).send('Delete chapter success');
  }
);

router.post('/',
  chaptersController.validateAddressInfo,
  chaptersController.getGeocode,
  chaptersController.addChapter,
  (req, res) => {
    return res.status(200).send('Add chapter success');
  }
);

module.exports = router;
