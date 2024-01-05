const mongoose = require('mongoose');
const Joi = require('joi');

const videoSchema = new mongoose.Schema({
  videoLink: {
    type: String,
    required: true,
    // validate: {
    //   validator: function (value) {
    //     // regex pattern to validate the youtube.com/embed/<youtube-video-id> format
    //     return /^(https:\/\/www\.youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})$/.test(value);
    //   },
    //   message: props => `${props.value} is not a valid youtube.com/embed/<youtube-video-id> link!`,
    // },
  },
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    enum: ['Education', 'Sports', 'Movies', 'Comedy', 'Lifestyle', 'All'],
    required: true,
  },
  contentRating: {
    type: String,
    enum: ['Anyone', '7+', '12+', '16+', '18+'],
    required: true,
  },
  releaseDate: {
    type: Date,
    default: Date.now, 
  },
  previewImage: {
    type: String,
    required: true,
  },
  votes: {
    upVotes: {
      type: Number,
      default: 0,
    },
    downVotes: {
      type: Number,
      default: 0,
    },
  },
  viewCount: {
    type: Number,
    default: 0,
  },
});


// const validateVideo = (video) => {
//   const schema = Joi.object({
//     videoLink: Joi.string().pattern(/^(https:\/\/www\.youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})$/)
//       .required(),
//     title: Joi.string().required(),
//     genre: Joi.string().valid('Education', 'Sports', 'Movies', 'Comedy', 'Lifestyle', 'All').required(),
//     contentRating: Joi.string().valid('Anyone', '7+', '12+', '16+', '18+').required(),
//     releaseDate: Joi.date(),
//     previewImage: Joi.string().required(),
//   });

//   return schema.validate(video);
// };

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;

