const AppError = require('../utils/AppError');
const db = require('../models.js');

chapterItemsController = {};

/**
 * Adds an association between a chapter an item via the chapter_items table. 
 * If the chapter and item already have an entry in the chapter_items table the total_received payload is 
 * added to the existing total_received. Otherwise a new entry is added. 
 * 
 * Updates the items table to reflect the new item total across all chapters
 * @requires item_id on request body
 * @requires total_received on request body
 * @requires chapterId in request params
 */
chapterItemsController.addItem = async (req, res, next) => {
  const { itemId, total_received } = req.body;

  const chapterId = '4';    //{ chapterId } = req.params;
  //query that updates the totals based on the items table-- make separate controller for this and put in middleware

  try {
    // check if the item already exists in for this chapter. 
    const getChapterItemQuery = {
      text: 'SELECT total_received FROM chapter_items WHERE item_id = $1 AND chapter_id = $2',
      values: [itemId, chapterId],
    };
    const { rowCount } = await db.query(getChapterItemQuery);


    // Start a transaction to maintain atomicity
    await db.query('BEGIN;');
    if (rowCount !== 0) {
      // if the item already exists update the existing entry in chapter items;
      const updateQuery = {
        text: 'UPDATE chapter_items SET total_received = ((SELECT total_received FROM chapter_items WHERE item_id = $1 AND chapter_id = $2) + $3) WHERE item_id = $1;',
        values: [itemId, chapterId, total_received],
      };
      // update the chapter items table
      await db.query(updateQuery);
    } else {
      // insert a row into chapter items
      const text = 'INSERT INTO chapter_items (chapter_id, item_id, total_received) VALUES ($1, $2, $3) RETURNING * ;';
      const params = [chapterId, itemId, total_received];
      await db.query(text, params);
    }

    // Update the total in the items table
    const updateItemTotalQuery = {
      // FIXME: Need to add the new ammount to the original ammount here
      text: 'UPDATE items SET total_received = (SELECT SUM(total_received) FROM chapter_items WHERE item_id = $1) WHERE id = $1;',
      values: [itemId],
    };

    const result = await db.query(updateItemTotalQuery);
    console.log(result);
    // save the transction
    await db.query('COMMIT');

    // console.log(`Successfully added ${res.rows[0]} to the database`);
    return next();
  } catch (err) {
    await db.query('ROLLBACK');
    return next(new AppError(err, 'chapterItemsController', 'addItem', 500));
  }
};

/**
 * Replaces the current items count for the provided chapter in the chapter items table
 * Updates the items table to reflect the new total for the item. 
 * @requires total_received on request body
 * @requires itemId in request params
 * @requires chapterId in request params
 * */
chapterItemsController.updateItem = async (req, res, next) => {
  const { total_received } = req.body;

  const { chapterId, itemId } = req.params;
  try {
    // Start a transaction to maintain atomicity
    await db.query('BEGIN;');
    const updateQuery = {
      text: 'UPDATE chapter_items SET total_received = $1 WHERE item_id = $2 AND chapter_id = $3',
      values: [total_received, itemId, chapterId],
    };
    // update the chapter items table
    const { rowCount } = await db.query(updateQuery);

    if (rowCount === 0) {
      return res.status(404).send('Error 404: Chapter item not found');
    }

    // Update the total in the items table
    const updateItemTotalQuery = {
      text: 'UPDATE items SET total_received = (SELECT SUM(total_received) FROM chapter_items WHERE item_id = $1) WHERE id = $1;',
      values: [itemId],
    };

    const result = await db.query(updateItemTotalQuery);
    // save the transction
    await db.query('COMMIT');
    return next();

  } catch (err) {
    await db.query('ROLLBACK');
    return next(new AppError(err, 'chapterItemsController', 'updateItem', 500));
  }
};

/**
 * Removes the chapter and item relationship from the chapter_items table. 
 * Updates the total_received count for the item in the items table
 * @requires itemId on request params
 * @requires chapterId on request params
 */
chapterItemsController.deleteItem = async (req, res, next) => {
  const { chapterId, itemId } = req.params;
  return next(new AppError('Not Implemented', 'chapterItemsController', 'deleteItem', 500));
};

/**
 * Retrieves information on the specific item for a specific chapter
 * 
 * Stores a chapterItems array on res.locals with each element having 
 * the following properties item_id, item_name, category, total_received, 
 * total_needed, chapter_id, chapter_name, 
 * @requires itemId on request params
 * @requires chapterId on request params
 */
chapterItemsController.getItem = async (req, res, next) => {
  const { chapterId, itemId } = req.params;

  const query = {
    text: `SELECT i.id as item_id, i.name as item_name, i.category, ci.total_received, i.total_needed, c.id as chapter_id, c.name as chapter_name 
    FROM chapter_items ci 
    LEFT JOIN items i ON ci.item_id = i.id 
    LEFT JOIN chapters c ON c.id = ci.chapter_id 
    WHERE ci.item_id = $1 and c.id = $2;`,
    values: [itemId, chapterId],
  };

  try {
    const { rows } = await db.query(query);
    if (rows.length === 0) {
      return res.status(404).send('Error 404: Chapter item not found');
    }

    [res.locals.chapterItem] = rows;
    return next();

  } catch (err) {
    return next(new AppError(err, 'chapterItemsController', 'getItem', 500));
  }

};


/**
 * Retrieves information on all items for a specific chapter
 * 
 * Stores an array of item objects on res.locals.chapterItems where each item object has the 
 * following properties id, name, category, total_received, total_needed 
 * @requires chapterId on request params
 */
chapterItemsController.getAllChapterItems = async (req, res, next) => {
  const { chapterId } = req.params;
  const query = {
    text: `SELECT i.id, i.name, i.category, ci.total_received, i.total_needed 
    FROM chapter_items ci 
    LEFT JOIN items i ON ci.item_id = i.id 
    WHERE ci.chapter_id = $1`,
    values: ['4'] // values: [chapterId]
  };

  try {
    const { rows } = await db.query(query);

    res.locals.chapterItems = rows;
    return next();

  } catch (err) {
    return next(new AppError(err, 'chapterItemsController', 'getAllItems', 500));
  }
};


/**
 * Retrieves information on all items for all chapters broken down by chapter
 * 
 * res.locals = {
 *   chapters: {
    *   chapterId: {
    *      items: {
              id: total_received // item
            }
    *   }
    * }
 * }
 * Stores a chapterItem object on res.locals with the following properties item_id, 
 * item_name, category, total_received, total_needed, chapter_id, chapter_name, 
 */
chapterItemsController.getAllByChapter = async (req, res, next) => {
  const query = {
    text: `SELECT i.id as item_id, i.name as item_name, i.category, ci.total_received, c.id as chapter_id, c.name as chapter_name 
    FROM chapter_items ci 
    LEFT JOIN items i ON i.id = ci.item_id  
    LEFT JOIN chapters c ON c.id = ci.chapter_id;`
  };

  try {
    const { rows } = await db.query(query);

    // Pre-process the data that will be stored on res.locals
    const chapters = {};
    for (let i = 0; i < rows.length; i++) {
      const { chapter_id, item_id, total_received, item_name, category, chapter_name } = rows[0];
      // Create entry for chapter if it doesn't exist yet
      if (!chapters[chapter_id]) chapters[cur.chapter_id] = {
        chapter_name,
      };

      // Create entry for the item on this chapter. Entries in chapter items are unique for each chapter_id and item_id
      chapters[chapter_id][item_id] = {
        total_received,
        item_name,
        category,
      };
    }

    res.locals.chapterItems = chapters;
    return next();

  } catch (err) {
    return next(new AppError(err, 'chapterItemsController', 'getAllItems', 500));
  }
};


chapterItemsController.getAllByItems = async (req, res, next) => {
  const query = {
    text: 'SELECT i.id as item_id, i.name as item_name, i.category, i.total_received FROM items;'
  };

  try {
    const { rows: items } = await db.query(query);


    const promises = items.map((item) => {
      const getItemChaptersQuery = {
        text: 'SELECT c.id, c.name, ci.total_received FROM chapter_items ci LEFT JOIN chapters c WHERE ci.item_id = $1 ',
        values: [item.id] 
      };
      return db.query(getItemChaptersQuery);
    });

    const results = await Promise.all(promises);

    // put the chapter data on the each item
    items.forEach((item, i) => {
      item.chapters = results[i];
    });

    res.locals.chapterItems = items;
    return next();

  } catch (err) {
    return next(new AppError(err, 'chapterItemsController', 'getAllItems', 500));
  }
};


module.exports = chapterItemsController;
