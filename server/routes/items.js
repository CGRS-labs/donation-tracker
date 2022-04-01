const express = require('express');
const itemsController = require('../controllers/itemsController');
const utilConroller = require('../controllers/utilController');

const router = express.Router();

router.get('/all',
  itemsController.getAllItems,
  (req, res) => {
    return res.status(200).json({
      items: res.locals.items,
    });
  }
);

router.get('/:itemId',
  itemsController.getItem,
  (req, res) => {
    return res.status(200).json({
      item: res.locals.item,
    });
  }
);

router.put('/:itemId',
  itemsController.storeTableAndColumnNames,
  utilConroller.toSqlUpdateQuery,
  itemsController.updateItem,
  (req, res) => {
    return res.status(200).send('Update item succesful');
  }
);

router.delete('/:itemId',
  itemsController.deleteItem,
  (req, res) => {
    return res.status(200).send('Delete item succesful');
  }
);

router.post('/',
  itemsController.addItem,
  (req, res) => {
    return res.status(200).json({
      item: res.locals.id,
    });
  }
);


module.exports = router;