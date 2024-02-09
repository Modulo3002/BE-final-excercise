import { PrismaClient } from "@prisma/client";

const getAmenity = async () => {
  const prisma = new PrismaClient();

  return prisma.amenity.findMany({});
};

export default getAmenity;
