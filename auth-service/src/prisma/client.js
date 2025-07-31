// Centralized Prisma Client instance to ensure a single and global connection 
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = prisma;
