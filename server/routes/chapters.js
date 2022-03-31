const express = require('express');

const chaptersController = require('../controllers/chaptersController');
const utilController = require('../controllers/utilController');
const chapterItemsRouter = require('./chapterItems');

const router = express.Router();

router.use('/:chapterId/items', chapterItemsRouter);

router.get('/all',
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
      chapters: res.locals.chapter,
    });
  }
);

router.put('/:chapterId',
  chaptersController.storeTableAndColumnNames,
  utilController.toSqlUpdateQuery,
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
  chaptersController.addChapter,
  (req, res) => {
    return res.status(200).send('Add chapter success');
  }
);

module.exports = router;
