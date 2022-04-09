const AppError = require('../utils/AppError');

const utilConroller = {};

/**
 * Transforms request body to node-postgres parameterized query. 
 * Requires res.locals to contain table name [table] and name of id column [column] 
 * @param {Object} body key value  pairs
 * @returns node-postgres parameterized query stored on res.locals.updateQuery
 */
utilConroller.toSqlUpdateQuery = (req, res, next) => {
  const fields = Object.keys(req.body);

  if (fields.length === 0) {
    return new AppError(new Error('Expected request body to contain data'), 'utilConroller', 'toSqlUpdateQuery', 400);
  }

  const chunks = [];
  const values = [];

  for (let i = 0; i < fields.length; i++) {
    chunks.push(`${fields[i]} = $${i + 1}`);
    values.push(req.body[fields[i]]);
  }

  values.push(res.locals.id);

  res.locals.updateQuery = {
    text: `UPDATE ${res.locals.table} SET ${chunks.join(', ')} WHERE ${res.locals.column} = $${fields.length + 1};`,
    values,
  };

  return next();

};

module.exports = utilConroller;

