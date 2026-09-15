import "dotenv/config";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

const getLevelTitle = (level: number): string => {
  if (level >= 1 && level <= 10) return "Pemula";
  if (level >= 11 && level <= 20) return "Mayan sepuh lah";
  if (level >= 21 && level <= 30) return "Udah lumayan nih";
  if (level >= 31 && level <= 40) return "Mantap jiwa";
  if (level >= 41 && level <= 50) return "Pro player";
  if (level >= 51 && level <= 60) return "Legend";
  if (level >= 61 && level <= 70) return "Mythic";
  if (level >= 71 && level <= 80) return "Immortal";
  if (level >= 81 && level <= 90) return "Dewa";
  return "God Mode";
};

async function main() {
  console.log("🌱 Starting seed database...");

  // 1. Seed Levels (1 - 100)
  console.log("Seeding levels (1 - 100)...");
  const levelsData = [];
  let expRequired = 500;
  for (let i = 1; i <= 100; i++) {
    levelsData.push({
      level_number: i,
      exp_required: expRequired,
      title: getLevelTitle(i),
    });
    expRequired += 500;
  }

  // Insert levels sequentially or with createMany
  await prisma.level.createMany({
    data: levelsData,
    skipDuplicates: true,
  });

  const level1 = await prisma.level.findUnique({ where: { level_number: 1 } });
  const level3 = await prisma.level.findUnique({ where: { level_number: 3 } });

  // 2. Seed Level Milestones
  console.log("Seeding level milestones...");
  await prisma.levelMilestone.createMany({
    data: [
      { min_level: 10, title: "Rising Star", reward_desc: "Unlock Rising Star Profile Badge" },
      { min_level: 25, title: "Code Craftsman", reward_desc: "Unlock Custom Banner & Profile Flair" },
      { min_level: 50, title: "Senior Architect", reward_desc: "Ability to review and verify solutions" },
      { min_level: 75, title: "Grandmaster", reward_desc: "Exclusive Discord VIP Role & Valor Pin" },
      { min_level: 100, title: "Living Legend", reward_desc: "Golden Legend Avatar Border" },
    ],
    skipDuplicates: true,
  });

  // 3. Seed Tech Stacks
  console.log("Seeding tech stacks...");
  const stackNames = [
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "PostgreSQL",
    "Prisma",
    "Node.js",
    "Go",
    "Rust",
    "Python",
    "Docker",
    "GraphQL",
  ];

  await prisma.stack.createMany({
    data: stackNames.map((name) => ({ title: name })),
    skipDuplicates: true,
  });

  const tsStack = await prisma.stack.findUnique({ where: { title: "TypeScript" } });
  const nextStack = await prisma.stack.findUnique({ where: { title: "Next.js" } });
  const tailwindStack = await prisma.stack.findUnique({ where: { title: "Tailwind CSS" } });
  const pgStack = await prisma.stack.findUnique({ where: { title: "PostgreSQL" } });

  // 4. Seed Dummy Users (Password default: password123)
  console.log("Seeding dummy users...");
  const hashedPassword = await bcrypt.hash("QWErty123", 10);

  const userMicel = await prisma.user.upsert({
    where: { email: "micel@valor.dev" },
    update: {},
    create: {
      username: "miceldoang",
      email: "micel@valor.dev",
      password: hashedPassword,
      description: "Creator of Valor & Fullstack Developer",
      exp: 1500,
      level_id: level3?.id,
      email_verified_at: new Date(),
    },
  });

  const userJohn = await prisma.user.upsert({
    where: { email: "john@valor.dev" },
    update: {},
    create: {
      username: "johndoe",
      email: "john@valor.dev",
      password: hashedPassword,
      description: "Frontend Developer | React & UI Lover",
      exp: 500,
      level_id: level1?.id,
      email_verified_at: new Date(),
    },
  });

  // 5. Seed Initial Posts (Project & Problem)
  console.log("Seeding initial posts...");

  // Post 1: Project Post
  const projectPost = await prisma.post.create({
    data: {
      created_by: userMicel.id,
      type: "project",
      project: {
        create: {
          title: "Valor - Social Network for Developers",
          description: "Platform sosial media khusus untuk para developer berbagi proyek karya dan memecahkan masalah bug bersama.",
          demo_url: "https://valor.dev",
          repository_url: "https://github.com/micelvalensia/valor_refactor",
        },
      },
      stacks: {
        create: [
          ...(nextStack ? [{ stack_id: nextStack.id }] : []),
          ...(tsStack ? [{ stack_id: tsStack.id }] : []),
          ...(tailwindStack ? [{ stack_id: tailwindStack.id }] : []),
          ...(pgStack ? [{ stack_id: pgStack.id }] : []),
        ],
      },
      ratings: {
        create: {
          user_id: userJohn.id,
          score: 5,
        },
      },
      comments: {
        create: {
          user_id: userJohn.id,
          content: "Keren banget konsepnya! UI-nya juga sangat modern.",
        },
      },
    },
  });

  // Post 2: Problem Post
  await prisma.post.create({
    data: {
      created_by: userJohn.id,
      type: "problem",
      problem: {
        create: {
          title: "Hydration failed because the initial UI does not match server-rendered HTML in Next.js",
          description: "Muncul warning hydration error di console browser saat me-render komponen dark mode theme provider. Ada yang punya solusi best practice untuk Next.js 16?",
        },
      },
      stacks: {
        create: [
          ...(nextStack ? [{ stack_id: nextStack.id }] : []),
          ...(tsStack ? [{ stack_id: tsStack.id }] : []),
        ],
      },
      comments: {
        create: {
          user_id: userMicel.id,
          content: "Coba tambahkan `suppressHydrationWarning` pada tag `<html>` di layout root Anda, atau gunakan hook `useEffect` untuk memastikan komponen hanya me-render theme setelah mounted di client.",
        },
      },
    },
  });

  console.log("✅ Seed database finished successfully!");
  console.log("------------------------------------------");
  console.log("Akun Dummy Login:");
  console.log("1. Email: micel@valor.dev | Password: password123 (Username: QWErty123)");
  console.log("2. Email: john@valor.dev  | Password: password123 (Username: QWErty123)");
  console.log("------------------------------------------");
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
