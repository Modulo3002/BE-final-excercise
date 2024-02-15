import { PrismaClient } from "@prisma/client";

const createReview = async (userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();
  const missingFields = [];
  if (!userId) {
    missingFields.push("userId");
    console.log("userId doesn't exist");
  }
  if (!propertyId) {
    missingFields.push("propertyId");
    console.log("propertyId doesn't exist");
  }
  if (!rating) {
    missingFields.push("rating");
    console.log("rating doesn't exist");
  }
  if (!comment) {
    missingFields.push("comment");
    console.log("comment doesn't exist");
  }
  console.log("ontbrekendeVelden:", missingFields);

  if (missingFields.length > 0) {
    throw new BadRequestError(`Het gaat fout bij: ${missingFields.join(", ")}`);
  }
  const review = await prisma.review.create({
    data: {
      rating,
      comment,
      userId,
      propertyId,
    },
  });

  return review;
};

export default createReview;
