import bcrypt from "bcryptjs";
import prisma from "./prisma.js";

async function main() {
  const args = process.argv.slice(2);
  const email = args[0];
  const password = args[1];
  const name = args[2] || "Salon Administrator";

  if (!email || !password) {
    console.log("Usage: npm run admin:create <email> <password> [name]");
    console.log("Example: npm run admin:create manager@themirrorr.com MySecurePass123! \"Studio Manager\"");
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("Error: Password must be at least 8 characters long.");
    process.exit(1);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.error("Error: Please provide a valid email address.");
    process.exit(1);
  }

  console.log(`Hashing password and creating/updating admin user for: ${email}...`);
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.adminUser.upsert({
    where: { email },
    update: {
      passwordHash,
      name,
    },
    create: {
      email,
      name,
      passwordHash,
      role: "admin",
    },
  });

  console.log("Admin account saved successfully!");
  console.log(`ID: ${user.id}`);
  console.log(`Email: ${user.email}`);
  console.log(`Name: ${user.name}`);
  console.log(`Role: ${user.role}`);
}

main()
  .catch((e) => {
    console.error("Error creating admin:", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
