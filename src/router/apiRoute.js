const { Router } = require("express");
const expressFileUpload = require("express-fileupload");
const router = Router();

const path = require("path");
const fs = require("fs");

const { responseData, responseMessage } = require("../utils/responseHandler");
const ErrorResponse = require("../utils/responseError");
const apikeyAndLimitMiddleware = require("../middleware/apikeyAndLimitMiddleware");

router.post(
  "/storage",
  expressFileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }),
  async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
    let sampleFile = req.files.file;
    let uploadPath =
      path.join(__dirname, "../public/storage/") + sampleFile.name;

    sampleFile.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);
      responseMessage(
        res,
        200,
        `Saved on http://api-pemalas.herokuapp.com/storage/${sampleFile.name}`
      );
      setTimeout(function () {
        fs.unlinkSync(uploadPath);
      }, 60 * 10 * 1000);
      // 60 * 10 * 1000
    });
  }
);

module.exports = router;
