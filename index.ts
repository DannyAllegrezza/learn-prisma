import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // type safe queries, nice
  const allManufacturers = await prisma.vehicle_manufacturers.findMany();
  allManufacturers.forEach((x) => console.log(x.name));
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
