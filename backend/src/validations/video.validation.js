const Joi = require("joi");
const createVideo = {
  body: Joi.object({
    videoLink: Joi.string()
      .pattern(/^(https:\/\/www\.youtube\.com\/embed\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)$/)
      .required(),
    title: Joi.string().required(),
    genre: Joi.string()
      .valid("Education", "Sports", "Movies", "Comedy", "Lifestyle", "All")
      .required(),
    contentRating: Joi.string()
      .valid("Anyone", "7+", "12+", "16+", "18+")
      .required(),
    releaseDate: Joi.date(),
    previewImage: Joi.string().required(),
  }),
};
const voteUpdateSchema = {
  body: Joi.object({
    vote: Joi.string().valid("upVote", "downVote").required(),
    change: Joi.string().valid("increase", "decrease").required(),
  }),
};
// const videoIdParamSchema = {
//   params: Joi.object({
//     videoId: Joi.string().objectId(),
//   }),
// };
module.exports = {
  createVideo,
  voteUpdateSchema,
};
