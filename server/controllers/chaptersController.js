const AppError = require('../utils/AppError');
const express = require('express');
const db = require ('./models');

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


  // latitude,
  // longitude on res.locals

  try {
    const text = 'INSERT INTO public.chapters (name, street, city, state, zip, phone, email, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING * ';
    const params = [name, street, city, state, zip, phone, email, latitude, longitude];
    const res = await db.query(text, params);
    console.log(`Successfully added ${res.rows[0]} to the database`);
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