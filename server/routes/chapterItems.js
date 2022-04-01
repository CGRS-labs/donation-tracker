const express = require('express');

const router = express.Router();

const chapterItemsController = require('../controllers/chapterItemsController');

router.get('/all',
  chapterItemsController.getAllItems,
  (req, res) => {
    return res.status(200).send({
      chapterItems: res.locals.chapterItems,
    });
  }
);

router.get('/:itemId',
  chapterItemsController.getItem,
  (req, res) => {
    return res.status(200).send({
      chapterItem: res.locals.chapterItem,
    });
  }
);


router.put('/:itemId',
  chapterItemsController.updateItem,
  (req, res) => {
    return res.status(200).send('Update chapter success!');
  }
);

router.delete('/:itemId',
  chapterItemsController.deleteItem,
  (req, res) => {
    return res.status(200).send('Delete chapter success!');
  }
);

router.post('/',
  chapterItemsController.addItem,
  (req, res) => {
    return res.status(200).send('Post chapter success!');
  }
);


module.exports = router;
