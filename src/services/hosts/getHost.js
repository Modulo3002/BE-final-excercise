import { PrismaClient } from "@prisma/client";

const getHost = async (name) => {
  const prisma = new PrismaClient();

  return prisma.host.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });
};

export default getHost;
