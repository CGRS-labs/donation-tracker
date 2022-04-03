const AppError = require('../utils/AppError');
const express = require('express');
const db = require ('../models.js');
require('dotenv').config();

const chaptersController = {};

chaptersController.getAllChapters = async (req, res, next) => {
  return next(new AppError(new Error('Not implemented'), 'chaptersController', 'getAllChapters', 500));
};

chaptersController.getChapter = async (req, res, next) => {
  return next(new AppError(new Error('Not implemented'), 'chaptersController', 'getChapter', 500));
};

chaptersController.addChapter = async (req, res, next) => {
  const {
    name,
    street,
    city,
    state,
    zip, 
    phone,
    email
  } = req.body;

  // const {
  //   latitude,
  //   longitude
  // } = res.locals;
  console.log(`name ${req.body.name}`);
  try {
    // eslint-disable-next-line semi
    const text = 'INSERT INTO public.chapters (name, street, city, state, zip, phone, email) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *'
    const values = [name, street, city, state, zip, phone, email];
    const result = await db.query(text, values);
    console.log(result.rows[0]);
  } catch (err) {
    return next(new AppError(new Error('Not implemented'), 'chaptersController', 'addChapter', 500));
  }
};

chaptersController.updateChapter = async (req, res, next) => {
  return next(new AppError(new Error('Not implemented'), 'chaptersController', 'updateChapter', 500));
};

chaptersController.deleteChapter = async (req, res, next) => {
  return next(new AppError(new Error('Not implemented'), 'chaptersController', 'deleteChapter', 500));
};

chaptersController.storeTableAndColumnNames = (req, res, next) => {
  res.locals.table = 'chapters';
  res.locals.column = 'id';
  res.locals.id = req.params.chapterId;
  return next();
};

module.exports = chaptersController;