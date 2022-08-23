const Profile = require("../models/profile.model");
const profilesDataStore = require("./profiles.json");

class ProfileRepository {
  async fetchAll() {
    const profiles = [];
    for (let profile of profilesDataStore) {
      let profileModel = new Profile(
        profile.id,
        profile.firstname,
        profile.lastname,
        profile.imageUrl
      );
      profiles.push(profileModel);
    }
    return profiles;
  }
}

module.exports = ProfileRepository;
