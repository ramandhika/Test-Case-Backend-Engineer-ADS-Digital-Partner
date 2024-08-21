import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createKaryawan = async (req: Request, res: Response) => {
  const { nomorInduk, nama, alamat, tanggalLahir, tanggalBergabung } = req.body;
  try {
    const karyawanBaru = await prisma.karyawan.create({
      data: {
        nomorInduk,
        nama,
        alamat,
        tanggalLahir: new Date(tanggalLahir),
        tanggalBergabung: new Date(tanggalBergabung),
      },
    });
    res.json({ pesan: "Karyawan berhasil ditambahkan", data: karyawanBaru });
  } catch (error) {
    res.status(400).json({
      pesan: "Gagal menambahkan karyawan",
      error: (error as any).message,
    });
  }
};

export const updateKaryawan = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nama, alamat, tanggalLahir, tanggalBergabung } = req.body;
  try {
    const karyawanDiperbarui = await prisma.karyawan.update({
      where: { id: parseInt(id) },
      data: {
        nama,
        alamat,
        tanggalLahir: new Date(tanggalLahir),
        tanggalBergabung: new Date(tanggalBergabung),
      },
    });
    res.json({
      pesan: "Karyawan berhasil diperbarui",
      data: karyawanDiperbarui,
    });
  } catch (error) {
    res.status(400).json({
      pesan: "Gagal memperbarui karyawan",
      error: (error as any).message,
    });
  }
};

export const deleteKaryawan = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.karyawan.delete({
      where: { id: parseInt(id) },
    });
    res.json({ pesan: "Karyawan berhasil dihapus" });
  } catch (error) {
    res.status(400).json({
      pesan: "Gagal menghapus karyawan",
      error: (error as any).message,
    });
  }
};

export const getAllKaryawan = async (req: Request, res: Response) => {
  try {
    const { sortBy } = req.query;

    let orderBy = {};
    if (sortBy === "nama") {
      orderBy = { nama: "asc" };
    } else if (sortBy === "tanggalLahir") {
      orderBy = { tanggalLahir: "asc" };
    }

    const karyawan = await prisma.karyawan.findMany({
      orderBy: orderBy,
    });

    res
      .status(200)
      .json({ message: "Data Karyawan berhasil diambil", data: karyawan });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil data Karyawan",
      error,
    });
  }
};

export const getKaryawanWithCuti = async (req: Request, res: Response) => {
  const { nomorInduk } = req.params;
  try {
    const karyawan = await prisma.karyawan.findUnique({
      where: { nomorInduk },
      include: { cuti: true },
    });
    if (karyawan) {
      res.json({ pesan: "Data karyawan berhasil diambil", data: karyawan });
    } else {
      res.status(404).json({ pesan: "Karyawan tidak ditemukan" });
    }
  } catch (error) {
    res.status(400).json({
      pesan: "Gagal mengambil data karyawan",
      error: (error as any).message,
    });
  }
};
