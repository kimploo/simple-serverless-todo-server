import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.create({
    data: {
      id: 1,
      name: "test-user",
    },
  });

  const todos = await prisma.todo.createMany({
    data: [
      {
        id: 1,
        userId: user.id,
        msg: "eat",
        status: "DONE",
        createdAt: new Date("2023-11-01T17:06:08.126Z"),
        finishedAt: new Date("2023-11-11T17:06:08.126Z"),
      },
      {
        id: 2,
        userId: user.id,
        msg: "sleep",
        status: "IN_PROGRESS",
        createdAt: new Date("2023-11-02T17:06:08.126Z"),
      },
      {
        id: 3,
        userId: user.id,
        msg: "make",
        status: "IN_PROGRESS",
        createdAt: new Date("2023-11-02T17:06:08.126Z"),
      },
      {
        id: 4,
        userId: user.id,
        msg: "relax",
        status: "CANCELED",
        createdAt: new Date("2023-11-03T17:06:08.126Z"),
        canceledAt: new Date("2023-11-11T16:06:08.126Z"),
      },
    ],
  });

  console.log({ user, todos });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
