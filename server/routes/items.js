const express = require('express');
const itemsController = require('../controllers/itemsController');
const utilConroller = require('../controllers/utilController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/',
  itemsController.getAllItems,
  (req, res) => {
    return res.status(200).json({
      items: res.locals.items,
    });
  }
);

router.get('/names',
  itemsController.getAllItemsNames
);

router.get('/:itemId',
  itemsController.getItem,
  (req, res) => {
    return res.status(200).json({
      item: res.locals.item,
    });
  }
);


// Require authentication for all subsequent requests
router.use(authController.validateToken, (req, res, next) => {
  next('route');
});


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
      item: res.locals.item,
    });
  }
);


module.exports = router;