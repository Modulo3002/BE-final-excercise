import { PrismaClient } from "@prisma/client";

const getProperty = async (location, pricePerNight) => {
  const prisma = new PrismaClient();
  const properties = await prisma.property.findMany({
    where: {
      location: {
        contains: location,
      },
      pricePerNight,
    },
  });

  return properties;
};

export default getProperty;
