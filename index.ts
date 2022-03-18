import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // type safe queries, nice
  const allManufacturers = await prisma.vehicle_manufacturers.findMany();
  allManufacturers.forEach((x) => console.log(x.name));

  getModelsByManufacturerName("Lotus");
}

async function getModelsByManufacturerName(name: string) {
  const manufacturer = await prisma.vehicle_manufacturers.findFirst({
    where: {
      name: name,
    },
    select: {
      id: true,
    },
  });

  if (manufacturer !== null) {
    const modelsForManufacturer = await prisma.vehicle_manufacturers.findUnique({
      where: { id: manufacturer.id },
      include: {
        vehicle_models: true,
      },
    });

    console.log(modelsForManufacturer);
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
