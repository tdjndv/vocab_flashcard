import { prisma } from "../../prisma.js";

export async function listVocabRows(userId) {
  return await prisma.vocabulary.findMany({
    where: { user_id: userId }
  });
}

export async function getVocabById(userId, vocabId) {
  return await prisma.vocabulary.findFirst({
    where: {
      id: vocabId,
      user_id: userId
    }
  });
}

export async function updateVocabById(userId, vocabId, { word, language, note }) {
  // Prisma update requires a unique key
  // Since id is unique already, we update by id
  // but still protect ownership by checking userId first

  const existing = await prisma.vocabulary.findFirst({
    where: { id: vocabId, userId }
  });

  if (!existing) return null;

  return await prisma.vocabulary.update({
    where: { id: vocabId },
    data: {
      word,
      language,
      note
    }
  });
}

export async function deleteVocabById(userId, vocabId) {
  const existing = await prisma.vocabulary.findFirst({
    where: { id: vocabId, user_id: userId }
  });

  if (!existing) return 0;

  await prisma.vocabulary.delete({
    where: { id: vocabId }
  });

  return 1;
}

export async function addVocab(userId, { word, language, note }) {
  return await prisma.vocabulary.create({
    data: {
      userId,
      word,
      language,
      note
    }
  });
}