import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.karyawan.createMany({
    data: [
      {
        nomorInduk: "IP06001",
        nama: "Agus",
        alamat: "Jln Gaja Mada no 12, Surabaya",
        tanggalLahir: new Date("1980-01-11"),
        tanggalBergabung: new Date("2005-08-07"),
      },
      {
        nomorInduk: "IP06002",
        nama: "Amin",
        alamat: "Jln Imam Bonjol no 11, Mojokerto",
        tanggalLahir: new Date("1977-09-03"),
        tanggalBergabung: new Date("2005-08-07"),
      },
      {
        nomorInduk: "IP06003",
        nama: "Yusuf",
        alamat: "Jln A Yani Raya 15 No 14 Malang",
        tanggalLahir: new Date("1973-08-09"),
        tanggalBergabung: new Date("2006-08-07"),
      },
      {
        nomorInduk: "IP06004",
        nama: "Alyssa",
        alamat: "Jln Bungur Sari V no 166, Bandung",
        tanggalLahir: new Date("1983-03-18"),
        tanggalBergabung: new Date("2006-09-06"),
      },
      {
        nomorInduk: "IP06005",
        nama: "Maulana",
        alamat: "Jln Candi Agung, No 78 Gg 5, Jakarta",
        tanggalLahir: new Date("1978-11-10"),
        tanggalBergabung: new Date("2006-09-10"),
      },
      {
        nomorInduk: "IP06006",
        nama: "Agfika",
        alamat: "Jln Nangka, Jakarta Timur",
        tanggalLahir: new Date("1979-02-07"),
        tanggalBergabung: new Date("2007-01-02"),
      },
      {
        nomorInduk: "IP06007",
        nama: "James",
        alamat: "Jln Merpati, 8 Surabaya",
        tanggalLahir: new Date("1989-05-18"),
        tanggalBergabung: new Date("2007-04-04"),
      },
      {
        nomorInduk: "IP06008",
        nama: "Octavanus",
        alamat: "Jln A Yani 17, B 08 Sidoarjo",
        tanggalLahir: new Date("1985-04-14"),
        tanggalBergabung: new Date("2007-05-19"),
      },
      {
        nomorInduk: "IP06009",
        nama: "Nugroho",
        alamat: "Jln Duren tiga 167, Jakarta Selatan",
        tanggalLahir: new Date("1984-01-01"),
        tanggalBergabung: new Date("2008-01-16"),
      },
      {
        nomorInduk: "IP06010",
        nama: "Raisa",
        alamat: "Jln Kelapa Sawit, Jakarta Selatan",
        tanggalLahir: new Date("1990-12-17"),
        tanggalBergabung: new Date("2008-08-16"),
      },
    ],
  });

  await prisma.cuti.createMany({
    data: [
      {
        nomorInduk: "IP06001",
        tanggalCuti: new Date("2020-08-02"),
        lamaCuti: 2,
        keterangan: "Acara Keluarga",
      },
      {
        nomorInduk: "IP06001",
        tanggalCuti: new Date("2020-08-18"),
        lamaCuti: 2,
        keterangan: "Anak Sakit",
      },
      {
        nomorInduk: "IP06006",
        tanggalCuti: new Date("2020-08-19"),
        lamaCuti: 1,
        keterangan: "Nenek Sakit",
      },
      {
        nomorInduk: "IP06007",
        tanggalCuti: new Date("2020-08-23"),
        lamaCuti: 1,
        keterangan: "Sakit",
      },
      {
        nomorInduk: "IP06004",
        tanggalCuti: new Date("2020-08-29"),
        lamaCuti: 5,
        keterangan: "Menikah",
      },
      {
        nomorInduk: "IP06003",
        tanggalCuti: new Date("2020-08-30"),
        lamaCuti: 2,
        keterangan: "Acara Keluarga",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
