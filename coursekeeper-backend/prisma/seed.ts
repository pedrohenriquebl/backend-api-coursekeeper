import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const achievements = [
    {
      code: 'FIRST_COURSE_COMPLETED',
      name: 'Primeiro Curso Concluído',
      description: 'Complete seu primeiro curso',
      icon: '🏆',
      condition: JSON.stringify({ type: 'COURSES_COMPLETED', target: 1 }),
    },
    {
      code: 'FRONTEND_5_COURSES',
      name: 'Frontend Master',
      description: 'Complete 5 cursos de Frontend',
      icon: '💻',
      condition: JSON.stringify({
        type: 'COURSES_COMPLETED',
        topic: 'FRONTEND',
        target: 5,
      }),
    },
    {
      code: 'FIRST_GOAL_ACHIEVED',
      name: 'Primeira Meta Concluída',
      description: 'Conclua sua primeira meta',
      icon: '🎯',
      condition: JSON.stringify({ type: 'GOALS_COMPLETED', target: 1 }),
    },
    {
      code: '10_COURSES_COMPLETED',
      name: 'Aprendiz Avançado',
      description: 'Complete 10 cursos',
      icon: '📚',
      condition: JSON.stringify({ type: 'COURSES_COMPLETED', target: 10 }),
    },
    {
      code: '100_HOURS_STUDIED',
      name: '100 Horas de Estudo',
      description: 'Estude 100 horas no total',
      icon: '⏱️',
      condition: JSON.stringify({ type: 'TOTAL_HOURS', target: 100 }),
    },
    {
      code: '5_DAY_STREAK',
      name: 'Streak de 5 Dias',
      description: 'Faça login 5 dias seguidos',
      icon: '🔥',
      condition: JSON.stringify({ type: 'STREAK', target: 5 }),
    },
    {
      code: 'BACKEND_5_COURSES',
      name: 'Backend Master',
      description: 'Complete 5 cursos de Backend',
      icon: '🖥️',
      condition: JSON.stringify({
        type: 'COURSES_COMPLETED',
        topic: 'BACKEND',
        target: 5,
      }),
    },
    {
      code: 'FULLSTACK_10_COURSES',
      name: 'Fullstack Expert',
      description: 'Complete 10 cursos de qualquer tipo',
      icon: '🌐',
      condition: JSON.stringify({ type: 'COURSES_COMPLETED', target: 10 }),
    },
    {
      code: '50_HOURS_STUDIED',
      name: '50 Horas de Estudo',
      description: 'Estude 50 horas no total',
      icon: '⏳',
      condition: JSON.stringify({ type: 'TOTAL_HOURS', target: 50 }),
    },
    {
      code: 'TOP_PERFORMER',
      name: 'Top Performer',
      description: 'Conclua todas as metas disponíveis',
      icon: '🏅',
      condition: JSON.stringify({ type: 'GOALS_COMPLETED_ALL' }),
    },
    {
      code: 'GOAL_HORAS_TOTAIS_50',
      name: '50 Horas em Metas',
      description: 'Complete 50 horas em metas do tipo HORAS_TOTAIS',
      icon: '⏱️',
      condition: JSON.stringify({ type: 'HORAS_TOTAIS', target: 50 }),
    },
    {
      code: 'GOAL_HORAS_TOPICO_20',
      name: '20 Horas em Topico',
      description: 'Complete 20 horas em metas do tipo HORAS_TOPICO',
      icon: '📘',
      condition: JSON.stringify({ type: 'HORAS_TOPICO', target: 20 }),
    },
    {
      code: 'GOAL_CURSOS_3',
      name: '3 Cursos Concluídos',
      description: 'Complete 3 metas do tipo CURSOS_CONCLUIDOS',
      icon: '🎓',
      condition: JSON.stringify({ type: 'CURSOS_CONCLUIDOS', target: 3 }),
    },
    {
      code: 'GOAL_PERIODO_ESTUDO_7',
      name: 'Estudo Contínuo',
      description: 'Mantenha streak de estudo por 7 dias (PERIODO_ESTUDO)',
      icon: '🔥',
      condition: JSON.stringify({ type: 'PERIODO_ESTUDO', target: 7 }),
    },
    {
      code: 'GOAL_PERIODO_ESTUDO_14',
      name: 'Estudo Hardcore',
      description: 'Mantenha streak de estudo por 14 dias (PERIODO_ESTUDO)',
      icon: '💪',
      condition: JSON.stringify({ type: 'PERIODO_ESTUDO', target: 14 }),
    },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { code: achievement.code },
      update: {
        condition: achievement.condition,
        name: achievement.name,
        description: achievement.description,
        icon: achievement.icon,
      },
      create: achievement,
    });
  }

  console.log('Achievements seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
