import { PrismaClient } from "@prisma/client";

const createHost = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  const prisma = new PrismaClient();
  const missingFields = [];
  if (!username) {
    missingFields.push('username');
    console.log("username doesn't exist")
  }
  if (!password) {
    missingFields.push('password');
    console.log("password doesn't exist")
  }
  if (!name) {
    missingFields.push('name');
    console.log("name doesn't exist")
  }
  if (!email) {
    missingFields.push('email');
    console.log("email doesn't exist")
  }
  if (!phoneNumber) {
    missingFields.push('phoneNumber');
    console.log("phonenumber doesn't exist")
  }
  if (!profilePicture) {
    missingFields.push('profilepicture');
    console.log("profilepicture doesn't exist")
  }
  
  console.log("ontbrekendeVelden:", missingFields)

 if (missingFields.length > 0) {
        throw new BadRequestError(`Het gaat fout bij: ${missingFields.join(', ')}`);
}
  return await prisma.host.create({
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    },
  });
};

export default createHost;
