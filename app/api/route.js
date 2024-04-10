'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllPatients() {
  return await prisma.patient.findMany();
}

export async function getPatient(patientName) {
  return await prisma.patient.findUnique({
    where: {
      name: patientName,
    },
  });
}

export async function updatePatient(patientName, fieldAndNewEntryObject) {
  await prisma.patient.update({
    where: {
      name: patientName,
    },
    data: fieldAndNewEntryObject,
  });
}
