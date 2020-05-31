class User {
  constructor(
    id,
    name,
    companyId,
    department,
    birthDay,
    position,
    description,
    imageUri,
    startDate,
    homeAddress,
    email,
    password,
    userType
  ) {
    this.id = id;
    this.name = name;
    this.companyId = companyId;
    this.department = department;
    this.birthDay = birthDay;
    this.position = position;
    this.description = description;
    this.imageUri = imageUri;
    this.startDate = startDate;
    this.homeAddress = homeAddress;
    this.email = email;
    this.password = password;
    this.userType = userType;
  }
}

export default User;
