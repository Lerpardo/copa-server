import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Jhon Wick",
      email: "jhonwick2023@gmail.com",
      avatarUrl: "https://github.com/Lerpardo.png",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: "Example Pool",
      code: "GHT657",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-17T00:14:45.908Z",
      firstTeamCountryCode: "DE",
      secondTeamCountryCode: "FR",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-25T00:43:21.908Z",
      firstTeamCountryCode: "NZ",
      secondTeamCountryCode: "IT",

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 3,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });
}

main();
