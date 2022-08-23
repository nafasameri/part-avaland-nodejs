const ProfileRepository = require("../repositories/profile.repository");
const profileRepository = new ProfileRepository();

const getAllProfiles = async (req, res) => {
  try {
    const profiles = await profileRepository.fetchAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(profiles));
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllProfiles,
};
