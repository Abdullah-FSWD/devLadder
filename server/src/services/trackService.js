const { Track, Section } = require("../models");
const cache = require("../utils/cache");

const TTL_TRACKS = 3600; // 1 hour — track/section structure rarely changes

async function getAllTracks() {
  const key = "tracks:all";
  const hit = await cache.get(key);
  if (hit) return hit;

  const data = await Track.find().lean();
  await cache.set(key, data, TTL_TRACKS);
  return data;
}

async function getTrackBySlug(slug) {
  const key = `track:${slug}`;
  const hit = await cache.get(key);
  if (hit) return hit;

  const track = await Track.findOne({ slug }).lean();
  if (!track) return null;

  const sections = await Section.find({ track: track._id })
    .sort({ level: 1, order: 1 })
    .lean();

  const data = { ...track, sections };
  await cache.set(key, data, TTL_TRACKS);
  return data;
}

module.exports = { getAllTracks, getTrackBySlug };
