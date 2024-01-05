const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const videoService  = require('../services/video.service');

/**
 * Get all available videos with optional filters and sorting
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllVideos = catchAsync(async (req, res) => {
  const filters = {
    title: req.query.title,
    genres: req.query.genres,
    contentRating: req.query.contentRating,
  };

  const sortBy = req.query.sortBy;

  const videos = await videoService.getAllVideos(filters, sortBy);
  res.status(httpStatus.OK).json({videos:videos});
});

/**
 * Get the video object for a specific video by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getVideoById = catchAsync(async (req, res) => {
    const video = await videoService.getVideoById(req.params.videoId);
    res.status(httpStatus.OK).json(video);
  });
/**
 * Create a new video object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
 const createVideo = catchAsync(async (req, res) => {
  
    const video = await videoService.createVideo(req.body);
    res.status(httpStatus.CREATED).json(video);
  });

/**
 * Update upVote or downVote value by 1 for a video
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
 const updateVotes = catchAsync(async (req, res) => {
  const { videoId } = req.params;
  const { vote, change } = req.body;

  await videoService.updateVotes(videoId, { vote, change });

  res.sendStatus(httpStatus.NO_CONTENT);
});
/**
 * Increase the viewCount value of a video by 1
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
 const increaseViews = catchAsync(async (req, res) => {
  const { videoId } = req.params;

  await videoService.increaseViews(videoId);

  res.sendStatus(httpStatus.NO_CONTENT);
});
module.exports = {
  getAllVideos,
  getVideoById,
  createVideo,
  updateVotes,
  increaseViews
};
