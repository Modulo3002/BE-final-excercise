import { PrismaClient } from "@prisma/client";

const createProperty = async (
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  hostId,
  rating
) => {
  const prisma = new PrismaClient();
  const missingFields = [];
  if (!title) {
    missingFields.push('title');
    console.log("title doesn't exist")
  }
  if (!description) {
    missingFields.push('description');
    console.log("description doesn't exist")
  }
  if (!location) {
    missingFields.push('location');
    console.log("location doesn't exist")
  }
  if (!pricePerNight) {
    missingFields.push('pricePerNight');
    console.log("pricePerNight doesn't exist")
  }
  if (!bedroomCount) {
    missingFields.push('bedroomCount');
    console.log("bedroomCount doesn't exist")
  }
  if (!bathRoomCount) {
    missingFields.push('bathRoomCount');
    console.log("bathRoomCount doesn't exist")
  }
  if (!maxGuestCount) {
    missingFields.push('maxGuestCount');
    console.log("maxGuestCount doesn't exist")
  }
  if (!hostId) {
    missingFields.push('hostId');
    console.log("hostId doesn't exist")
  }  
  if (!rating) {
    missingFields.push('rating');
    console.log("rating doesn't exist")
  }
  console.log("ontbrekendeVelden:", missingFields)

  return await prisma.property.create({
    data: {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    },
  });
};

export default createProperty;
