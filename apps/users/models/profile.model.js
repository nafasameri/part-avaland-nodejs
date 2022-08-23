class Profile {
  id;
  firstname;
  lastname;
  imageUrl;
  constructor(id, firstname, lastname, imageUrl) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.imageUrl = imageUrl;
  }
}

module.exports = Profile;
