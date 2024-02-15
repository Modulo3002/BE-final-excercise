import { PrismaClient } from "@prisma/client";

const createAmenity = async (name) => {
  const prisma = new PrismaClient();
  const missingFields = [];
  if (!name) {
    missingFields.push('userId');
    console.log("userId doesn't exist")
  }
  console.log("ontbrekendeVelden:", missingFields)

  return await prisma.amenity.create({
    data: {
      name,
    },
  });
};

export default createAmenity;
