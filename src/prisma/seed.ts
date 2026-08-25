import "dotenv/config";
import prisma from "@/lib/prisma";

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
  console.log("Start seeding levels...");

  const levels = [];
  let expRequired = 500; // Level 1 butuh 500 exp
  
  for (let i = 1; i <= 100; i++) {
    levels.push({
      level_number: i,
      exp_required: expRequired,
      title: getLevelTitle(i),
    });
    expRequired += 500; // Setiap level naik +500 exp
  }

  await prisma.level.createMany({
    data: levels,
    skipDuplicates: true,
  });

  console.log(`Seeded ${levels.length} levels successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
