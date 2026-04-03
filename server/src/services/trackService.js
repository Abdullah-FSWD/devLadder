const { Track, Section } = require("../models");

async function getAllTracks() {
  return Track.find().lean();
}

async function getTrackBySlug(slug) {
  const track = await Track.findOne({ slug }).lean();
  if (!track) return null;

  const sections = await Section.find({ track: track._id })
    .sort({ level: 1, order: 1 })
    .lean();

  return { ...track, sections };
}

module.exports = { getAllTracks, getTrackBySlug };
