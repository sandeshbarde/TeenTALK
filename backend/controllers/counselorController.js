const counselorService = require('../services/counselorService');
const { successResponse } = require('../utils/response');

const getCases = async (req, res, next) => {
  try {
    const cases = await counselorService.getCounselorCases(req.user);
    return successResponse(res, cases, 'Counselor cases retrieved successfully');
  } catch (err) {
    next(err);
  }
};

const addNote = async (req, res, next) => {
  try {
    const note = await counselorService.addCaseNote(req.user, req.body);
    return successResponse(res, note, 'Case note recorded successfully', 201);
  } catch (err) {
    next(err);
  }
};

const getCalendar = async (req, res, next) => {
  try {
    const calendar = await counselorService.getCounselorCalendar(req.user);
    return successResponse(res, calendar, 'Counselor schedule retrieved successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCases,
  addNote,
  getCalendar,
};
