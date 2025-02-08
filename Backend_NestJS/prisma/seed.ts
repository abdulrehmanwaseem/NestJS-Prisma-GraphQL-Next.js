import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  await createUsers();
  await createTags();
  await createPosts();
  console.log('Database seeded successfully!');
}

async function createUsers() {
  await prisma.user.create({
    data: {
      username: 'john_doe',
      email: 'johndoe@example.com',
      password: 'password123',
      role: 'USER',
    },
  });
  await prisma.user.create({
    data: {
      username: 'admin_user',
      email: 'admin@example.com',
      password: 'adminpassword',
      role: 'ADMIN',
    },
  });
}

async function createPosts() {
  const users = await prisma.user.findMany();
  const tags = await prisma.tag.findMany();

  await prisma.post.create({
    data: {
      title: 'Hello World',
      content: 'This is the first post!',
      userId: users[0].id,
      tags: {
        connect: [{ id: tags[0].id }, { id: tags[1].id }],
      },
    },
  });
}

async function createTags() {
  await prisma.tag.create({
    data: {
      name: 'NestJS',
    },
  });
  await prisma.tag.create({
    data: {
      name: 'GraphQL',
    },
  });
  await prisma.tag.create({
    data: {
      name: 'Prisma',
    },
  });
}

seed()
  .catch((err) => {
    console.error('Error during seeding:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
