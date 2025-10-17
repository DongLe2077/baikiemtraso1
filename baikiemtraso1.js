class HocSinh {
  constructor(hoTen, lopHoc, diemTB, hanhKiem, maHS = null) {
    this.maHS = maHS;
    this.hoTen = hoTen;
    this.lopHoc = lopHoc;
    this.diemTB = diemTB;
    this.hanhKiem = hanhKiem;
  }
}

class SchoolSystem {
  constructor() {
    this.danhSach = [];
    this.soLuongHocSinh = 0;
  }

  khoiTao(data = []) {
    this.danhSach = data;
    this.soLuongHocSinh = data.length;
  }

  themHocSinh(hocSinh) {
    const namHienTai = new Date().getFullYear();
    const soThuTu = String(this.soLuongHocSinh).padStart(3, "0");
    const maHS = `ma${namHienTai}${soThuTu}`;

    hocSinh.maHS = maHS;
    this.danhSach.push(hocSinh);
    this.soLuongHocSinh++;

    return maHS;
  }

  timHocSinh(maHS) {
    const regexMaHS = /^ma\d{7}$/;
    if (!regexMaHS.test(maHS)) {
      return null;
    }

    return this.danhSach.find((hs) => hs.maHS === maHS) || null;
  }

  capNhatThongTin(maHS, duLieuMoi) {
    const index = this.danhSach.findIndex((hs) => hs.maHS === maHS);

    if (index === -1) {
      return false;
    }

    const { maHS: _, ...thongTinCapNhat } = duLieuMoi;

    this.danhSach[index] = { ...this.danhSach[index], ...thongTinCapNhat };

    return true;
  }

  xoaHocSinh(maHS) {
    const index = this.danhSach.findIndex((hs) => hs.maHS === maHS);

    if (index === -1) {
      return false;
    }

    this.danhSach.splice(index, 1);
    return true;
  }

  layDanhSachTheoLop(tenLop) {
    return this.danhSach.filter((hs) => hs.lopHoc === tenLop);
  }

  thongKeHocLuc() {
    const thongKe = {
      "Xuất Sắc": 0,
      Giỏi: 0,
      Khá: 0,
      "Trung Bình": 0,
      Kém: 0,
    };

    this.danhSach.forEach((hs) => {
      const { diemTB } = hs;

      if (diemTB >= 9.0) {
        thongKe["Xuất Sắc"]++;
      } else if (diemTB >= 8.0) {
        thongKe["Giỏi"]++;
      } else if (diemTB >= 6.5) {
        thongKe["Khá"]++;
      } else if (diemTB >= 5.0) {
        thongKe["Trung Bình"]++;
      } else {
        thongKe["Kém"]++;
      }
    });

    return thongKe;
  }

  sapXepTheoDiem(kieuSapXep = "tang") {
    const danhSachSaoChep = [...this.danhSach];

    return danhSachSaoChep.sort((a, b) => {
      if (kieuSapXep === "tang") {
        return a.diemTB - b.diemTB;
      } else if (kieuSapXep === "giam") {
        return b.diemTB - a.diemTB;
      }
      return 0;
    });
  }
}

const school = new SchoolSystem();

const duLieuBanDau = [
  new HocSinh("Nguyễn Văn A", "10A1", 8.5, "Tốt", "ma2025000"),
  new HocSinh("Trần Thị B", "10A1", 9.2, "Tốt", "ma2025001"),
  new HocSinh("Lê Văn C", "10A2", 6.8, "Khá", "ma2025002"),
  new HocSinh("Phạm Thị D", "10A2", 4.5, "Trung bình", "ma2025003"),
  new HocSinh("Nguyễn Thị X", "10A3", 5.5, "Trung bình", "ma2025004"),
  new HocSinh("Võ Văn H", "10A3", 4.0, "Yếu", "ma2025005"),
];

school.khoiTao(duLieuBanDau);

console.log("=== KHỞI TẠO HỆ THỐNG ===");
console.log(`Số lượng học sinh: ${school.soLuongHocSinh}`);
console.log("\nDanh sách học sinh ban đầu:");
school.danhSach.forEach((hs) => {
  console.log(
    `${hs.maHS} | ${hs.hoTen} | Lớp: ${hs.lopHoc} | Điểm TB: ${hs.diemTB} | Hạnh kiểm: ${hs.hanhKiem}`
  );
});

console.log("\n=== THÊM HỌC SINH MỚI ===");
const hsMoi = new HocSinh("Hoàng Văn E", "10A1", 7.5, "Tốt");
const maMoi = school.themHocSinh(hsMoi);
console.log(`Đã thêm học sinh với mã: ${maMoi}`);
const hsMoi2 = new HocSinh("Đặng Thị F", "10A2", 8.8, "Tốt");
const maMoi2 = school.themHocSinh(hsMoi2);
console.log(`Đã thêm học sinh với mã: ${maMoi2}`);

const hsMoi3 = new HocSinh("Bùi Văn G", "10A3", 6.2, "Khá");
const maMoi3 = school.themHocSinh(hsMoi3);
console.log(`Đã thêm học sinh với mã: ${maMoi3}`);

console.log("\n=== TÌM HỌC SINH ===");
const hsTimThay = school.timHocSinh("ma2025001");
console.log("Tìm thấy:", hsTimThay);

console.log("\n=== CẬP NHẬT THÔNG TIN ===");
const ketQuaCapNhat = school.capNhatThongTin("ma2025000", {
  diemTB: 9.0,
  hanhKiem: "Xuất sắc",
});
console.log(`Cập nhật thành công: ${ketQuaCapNhat}`);

console.log("\n=== DANH SÁCH LỚP  ===");
console.log("Danh sách lớp 10A1: ");
const lop10A1 = school.layDanhSachTheoLop("10A1");
console.log(lop10A1);
console.log("Danh sách lớp 10A2: ");
const lop10A2 = school.layDanhSachTheoLop("10A2");
console.log(lop10A2);

console.log("\n=== THỐNG KÊ HỌC LỰC ===");
const thongKe = school.thongKeHocLuc();
console.log(thongKe);

console.log("\n=== SẮP XẾP THEO ĐIỂM  ===");
console.log("Sắp xếp điểm tăng dần: ");
const dsSapXepTang = school.sapXepTheoDiem("tang");
dsSapXepTang.forEach((hs) => {
  console.log(`${hs.hoTen} - ${hs.lopHoc}: ${hs.diemTB} điểm`);
});

console.log("\nSắp xếp điểm giảm dần: ");
const dsSapXepGiam = school.sapXepTheoDiem("giam");
dsSapXepGiam.forEach((hs) => {
  console.log(`${hs.hoTen} - ${hs.lopHoc}: ${hs.diemTB} điểm`);
});

console.log("\n=== XÓA HỌC SINH ===");
const ketQuaXoa = school.xoaHocSinh("ma2025003");
console.log(`Xóa thành công: ${ketQuaXoa}`);
console.log(`Số lượng học sinh còn lại: ${school.danhSach.length}`);
