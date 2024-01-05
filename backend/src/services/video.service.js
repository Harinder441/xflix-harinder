const Video = require("../models/video.model");

/**
 * Get all available videos with optional filters and sorting
 * @param {Object} filters - Filters for title, genre, and contentRating
 * @param {string} sortBy - Sorting field (releaseDate or viewCount)
 * @returns {Promise<Array>} - Array of video objects
 */
const getAllVideos = async (filters, sortBy) => {
  let query = {};

  if (filters.title) {
    query.title = { $regex: new RegExp(filters.title, "i") };
  }

  if (filters.genres) {
    const genresArray = filters.genres.split(",");
    if (!genresArray.includes("All")) {
      query.genre = { $in: genresArray };
    }
  }

  if (filters.contentRating) {
    // Assuming contentRating is stored as string
    const rating = filters.contentRating;
    // const ratingArray = ["Anyone", "7+", "12+", "16+", "18+"];
    // const index = ratingArray.indexOf(rating);
    // if (index != -1) {
    //   query.contentRating = { $in: ratingArray.slice(0, index + 1) };
    // }
    query.contentRating = { $eq:rating };
  }

  let sortQuery = {};
  if (sortBy === "viewCount") {
    sortQuery.viewCount = -1;
  } else {
    sortQuery.releaseDate = -1;
  }
  try {
    const videos = await Video.find(query).sort(sortQuery);
    return videos;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error"
    );
  }
 
};
/**
 * Get the video object for a specific video by ID
 * @param {string} videoId - ID of the video
 * @returns {Promise<Object>} - Video object
 */
const getVideoById = async (videoId) => {
  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(httpStatus.NOT_FOUND, "Video not found");
  }

  return video;
};

/**
 * Create a new video object
 * @param {Object} videoData - Video data to be created
 * @returns {Promise<Object>} - Created video object
 */
const createVideo = async (videoData) => {
  try {
    const video = await Video.create(videoData);
    return video;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error"
    );
  }
};

/**
 * Update upVote or downVote value by 1 for a video
 * @param {string} videoId - ID of the video to update votes
 * @param {Object} voteData - Vote update data
 * @returns {Promise<void>}
 */
 const updateVotes = async (videoId, voteData) => {
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Video not found');
  }

  if (voteData.vote === 'upVote' && voteData.change === 'increase') {
    video.votes.upVotes += 1;
  } else if (voteData.vote === 'downVote' && voteData.change === 'increase') {
    video.votes.downVotes += 1;
  } else if (voteData.vote === 'upVote' && voteData.change === 'decrease') {
    video.votes.upVotes = Math.max(0, video.votes.upVotes - 1);
  } else if (voteData.vote === 'downVote' && voteData.change === 'decrease') {
    video.votes.downVotes = Math.max(0, video.votes.downVotes - 1);
  }


  await video.save();
};
/**
 * Increase the viewCount value of a video by 1
 * @param {string} videoId - ID of the video to update views
 * @returns {Promise<void>}
 */
 const increaseViews = async (videoId) => {
  // if (!Video.isValidObjectId(videoId)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, '"videoId" must be a valid id');
  // }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Video not found');
  }

  video.viewCount += 1;

  await video.save();
};
module.exports = {
  getAllVideos,
  getVideoById,
  createVideo,
  updateVotes,
  increaseViews
};
