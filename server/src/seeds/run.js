require("dotenv").config();
const mongoose = require("mongoose");
const { mongoUri } = require("../config/env");
const { Track, Section, Topic, Subtopic, Test } = require("../models");
const mernData = require("./mern");
const dsaData = require("./dsa");

async function seed() {
  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB for seeding");

  // Clear existing data
  await Promise.all([
    Track.deleteMany({}),
    Section.deleteMany({}),
    Topic.deleteMany({}),
    Subtopic.deleteMany({}),
    Test.deleteMany({}),
  ]);
  console.log("Cleared existing data");

  for (const trackData of [mernData, dsaData]) {
    const track = await Track.create({
      name: trackData.name,
      slug: trackData.slug,
      description: trackData.description,
    });
    console.log(`Created track: ${track.name}`);

    for (const levelData of trackData.levels) {
      for (const sectionData of levelData.sections) {
        const section = await Section.create({
          track: track._id,
          level: levelData.level,
          title: sectionData.title,
          description: sectionData.description,
          order: sectionData.order,
        });

        for (const topicData of sectionData.topics) {
          const topic = await Topic.create({
            section: section._id,
            title: topicData.title,
            description: topicData.description || "",
            order: topicData.order,
          });

          for (const subtopicData of topicData.subtopics) {
            await Subtopic.create({
              topic: topic._id,
              title: subtopicData.title,
              description: subtopicData.description || "",
              resources: subtopicData.resources || [],
              order: subtopicData.order,
            });
          }
        }

        // Create test for this section
        if (sectionData.test) {
          await Test.create({
            section: section._id,
            title: sectionData.test.title,
            questions: sectionData.test.questions,
          });
        }

        console.log(`  [${levelData.level}] Section: ${section.title}`);
      }
    }
  }

  console.log("\nSeeding complete!");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
