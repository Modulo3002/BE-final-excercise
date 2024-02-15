import { PrismaClient } from "@prisma/client";

const createBooking = async (
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  const prisma = new PrismaClient();

  const missingFields = [];
  if (!userId) {
    missingFields.push('userId');
    console.log("userId doesn't exist")
  }
  if (!propertyId) {
    missingFields.push('propertyId');
    console.log("propertyId doesn't exist")
  }
  if (!checkinDate) {
    missingFields.push('checkinDate');
    console.log("checkinDate doesn't exist")
  }
  if (!checkoutDate) {
    missingFields.push('checkoutDate');
    console.log("checkoutDate doesn't exist")
  }
  if (!numberOfGuests) {
    missingFields.push('numberOfGuests');
    console.log("numberOfGuests doesn't exist")
  }
  if (!totalPrice) {
    missingFields.push('totalPrice');
    console.log("totalPrice doesn't exist")
  }
  if (!bookingStatus) {
    missingFields.push('bookingStatus');
    console.log("bookingStatus doesn't exist")
  }
  
  console.log("ontbrekendeVelden:", missingFields)

 if (missingFields.length > 0) {
        throw new BadRequestError(`Het gaat fout bij: ${missingFields.join(', ')}`);
}
  const booking = await prisma.booking.create({
    data: {
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
      userId,
      propertyId,
    },
  });

  return booking;
};

export default createBooking;
