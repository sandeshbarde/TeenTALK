const certificateService = require('../services/certificateService');
const { successResponse } = require('../utils/response');

const generateCertificate = async (req, res, next) => {
  try {
    const cert = await certificateService.generateCertificate(req.user, req.params.courseId);
    return successResponse(res, cert, 'Certificate issued successfully', 200);
  } catch (err) {
    next(err);
  }
};

const generateTeenCertificate = async (req, res, next) => {
  try {
    const cert = await certificateService.generateTeenCertificate(req.user);
    return successResponse(res, cert, 'Teen certificate issued successfully', 200);
  } catch (err) {
    next(err);
  }
};

const generateEmployeeCertificate = async (req, res, next) => {
  try {
    const cert = await certificateService.generateEmployeeCertificate(req.user);
    return successResponse(res, cert, 'Employee certificate issued successfully', 200);
  } catch (err) {
    next(err);
  }
};

const getMyCertificates = async (req, res, next) => {
  try {
    const list = await certificateService.getUserCertificates(req.user.id);
    return successResponse(res, list, 'Certificates retrieved successfully', 200);
  } catch (err) {
    next(err);
  }
};

const verifyCertificate = async (req, res, next) => {
  try {
    const cert = await certificateService.verifyCertificate(req.params.code);
    return successResponse(res, cert, 'Certificate verified successfully', 200);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  generateCertificate,
  generateTeenCertificate,
  generateEmployeeCertificate,
  getMyCertificates,
  verifyCertificate,
};
