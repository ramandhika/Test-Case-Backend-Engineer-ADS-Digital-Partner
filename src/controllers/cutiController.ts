import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCuti = async (req: Request, res: Response) => {
  const { nomorInduk, tanggalCuti, lamaCuti, keterangan } = req.body;
  try {
    const cutiBaru = await prisma.cuti.create({
      data: {
        nomorInduk,
        tanggalCuti: new Date(tanggalCuti),
        lamaCuti,
        keterangan,
      },
    });
    res.json({ pesan: "Cuti berhasil ditambahkan", data: cutiBaru });
  } catch (error) {
    res
      .status(400)
      .json({ pesan: "Gagal menambahkan cuti", error: (error as any).message });
  }
};

export const updateCuti = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { tanggalCuti, lamaCuti, keterangan } = req.body;
  try {
    const cutiDiperbarui = await prisma.cuti.update({
      where: { id: parseInt(id) },
      data: { tanggalCuti: new Date(tanggalCuti), lamaCuti, keterangan },
    });
    res.json({ pesan: "Cuti berhasil diperbarui", data: cutiDiperbarui });
  } catch (error) {
    res
      .status(400)
      .json({ pesan: "Gagal memperbarui cuti", error: (error as any).message });
  }
};

export const deleteCuti = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.cuti.delete({
      where: { id: parseInt(id) },
    });
    res.json({ pesan: "Cuti berhasil dihapus" });
  } catch (error) {
    res
      .status(400)
      .json({ pesan: "Gagal menghapus cuti", error: (error as any).message });
  }
};

export const getAllCuti = async (req: Request, res: Response) => {
  try {
    const { sortBy } = req.query;

    let orderBy = {};
    if (sortBy === "tanggalCuti") {
      orderBy = { tanggalCuti: "asc" };
    }

    const cuti = await prisma.cuti.findMany({
      orderBy: orderBy,
    });

    res.status(200).json({ message: "Data Cuti berhasil diambil", data: cuti });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat mengambil data Cuti", error });
  }
};
