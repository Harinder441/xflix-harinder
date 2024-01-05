const express = require('express');
const videoController = require('../../controllers/video.controller');
const videoValidation = require("../../validations/video.validation");
const validate = require("../../middlewares/validate");
const router = express.Router();

router.get('/', videoController.getAllVideos);
router.get('/:videoId', videoController.getVideoById);
router.post('/',validate(videoValidation.createVideo), videoController.createVideo);
router.patch('/:videoId/votes', validate(videoValidation.voteUpdateSchema), videoController.updateVotes);
router.patch('/:videoId/views', videoController.increaseViews);

module.exports = router;
