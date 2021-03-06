const express = require('express');

const router = express.Router({ mergeParams: true });

const chapterItemsController = require('../controllers/chapterItemsController');
const authController = require('../controllers/authController');

router.get('/',
  chapterItemsController.getAllChapterItems,
  (req, res) => {
    return res.status(200).json({
      chapterItems: res.locals.chapterItems,
    });
  }
);

router.get('/:itemId',
  chapterItemsController.getItem,
  (req, res) => {
    return res.status(200).json({
      chapterItem: res.locals.chapterItem,
    });
  }
);


// Require authentication for all subsequent requests
router.use(authController.validateToken, (req, res, next) => {
  next('route');
});


router.put('/:itemId',
  chapterItemsController.updateItem,
  (req, res) => {
    return res.status(200).send('Update chapter item success!');
  }
);

router.delete('/:itemId',
  chapterItemsController.deleteItem,
  (req, res) => {
    return res.status(200).send('Delete chapter item success!');
  }
);

router.post('/',
  chapterItemsController.addItem,
  (req, res) => {
    return res.status(200).send('Post chapter item success!');
  }
);


module.exports = router;
