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
    res.status(201).json({
      pesan: "Cuti berhasil ditambahkan",
      data: cutiBaru,
    });
  } catch (error) {
    res.status(400).json({
      pesan: "Gagal menambahkan cuti",
      error: (error as any).message,
    });
  }
};

export const updateCuti = async (req: Request, res: Response) => {
  const { nomorInduk } = req.params;
  const { tanggalCuti, lamaCuti, keterangan } = req.body;

  try {
    const cutiDiperbarui = await prisma.cuti.updateMany({
      where: { nomorInduk },
      data: {
        tanggalCuti: new Date(tanggalCuti),
        lamaCuti,
        keterangan,
      },
    });

    if (cutiDiperbarui.count === 0) {
      return res.status(404).json({
        pesan: "Cuti dengan nomorInduk ini tidak ditemukan",
      });
    }

    res.json({ pesan: "Cuti berhasil diperbarui", data: cutiDiperbarui });
  } catch (error) {
    res.status(400).json({
      pesan: "Gagal memperbarui cuti",
      error: (error as any).message,
    });
  }
};

export const deleteCuti = async (req: Request, res: Response) => {
  const { nomorInduk } = req.params;

  try {
    const cutiDihapus = await prisma.cuti.deleteMany({
      where: { nomorInduk },
    });

    if (cutiDihapus.count === 0) {
      return res.status(404).json({
        pesan: "Cuti dengan nomorInduk ini tidak ditemukan",
      });
    }

    res.status(200).json({
      pesan: "Cuti berhasil dihapus",
    });
  } catch (error) {
    res.status(400).json({
      pesan: "Gagal menghapus cuti",
      error: (error as any).message,
    });
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

    res.status(200).json({
      message: "Data Cuti berhasil diambil",
      data: cuti,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil data Cuti",
      error,
    });
  }
};
