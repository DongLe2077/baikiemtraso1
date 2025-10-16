class HocSinh {
  constructor(maHS, hoTen, lopHoc, diemTB, hanhKiem) {
    this.maHS = maHS;
    this.hoTen = hoTen;
    this.lopHoc = lopHoc;
    this.diemTB = diemTB;
    this.hanhKiem = hanhKiem;
  }
}

class SchoolSystem {
  constructor(data = []) {
    this.khoiTao(data);
    console.log(`📋 Đã thêm ${this.soLuongHocSinh} học sinh.`);
  }

  khoiTao(data = []) {
    this.danhSach = data.map(hs => new HocSinh(hs.maHS, hs.hoTen, hs.lopHoc, hs.diemTB, hs.hanhKiem));
    this.soLuongHocSinh = this.danhSach.length || 0;
  }

  _sinhMaHS() {
    const namHienTai = new Date().getFullYear();
    this.soLuongHocSinh++;
    return `ma${namHienTai}${String(this.soLuongHocSinh).padStart(3, "0")}`;
  }

  _isValidMaHS(ma) {
    return typeof ma === "string" && /^ma\d{7}$/.test(ma);
  }

  _isValidLopHoc(lop) {
    return typeof lop === "string" && /^(10|11|12)[A-Z]\d{1}$/.test(lop);
  }

  _isValidDiem(diem) {
    return typeof diem === "number" && diem >= 0 && diem <= 10;
  }

  _isValidHanhKiem(hk) {
    const danhSachHK = ["Tốt", "Khá", "Trung bình", "Yếu"];
    return typeof hk === "string" && danhSachHK.includes(hk);
  }

  _isValidHoTen(hoTen) {
    return typeof hoTen === "string" && hoTen.trim().length >= 3;
  }

  themHocSinh(hocSinh) {
    if (!this._isValidHoTen(hocSinh.hoTen)) {
      console.error("❌ Họ tên không hợp lệ! (Phải có ít nhất 3 ký tự)");
      return null;
    }

    if (!this._isValidLopHoc(hocSinh.lopHoc)) {
      console.error(`❌ Lớp học "${hocSinh.lopHoc}" không hợp lệ! (Định dạng: 10A1, 11B2, 12C3,...)`);
      return null;
    }

    if (!this._isValidDiem(hocSinh.diemTB)) {
      console.error(`❌ Điểm trung bình "${hocSinh.diemTB}" không hợp lệ! (Phải từ 0 đến 10)`);
      return null;
    }

    if (!this._isValidHanhKiem(hocSinh.hanhKiem)) {
      console.error(`❌ Hạnh kiểm "${hocSinh.hanhKiem}" không hợp lệ! (Tốt/Khá/Trung bình/Yếu)`);
      return null;
    }

    const maHS = this._sinhMaHS();
    const newStudent = new HocSinh(maHS, hocSinh.hoTen, hocSinh.lopHoc, hocSinh.diemTB, hocSinh.hanhKiem);
    this.danhSach = [...this.danhSach, newStudent];
    return maHS;
  }

  timHocSinh(maHS) {
    if (!this._isValidMaHS(maHS)) {
      console.error(`❌ Mã học sinh "${maHS}" không hợp lệ!`);
      return null;
    }
    const result = this.danhSach.find(hs => hs.maHS === maHS) || null;
    if (!result) {
      console.warn(`⚠️ Không tìm thấy học sinh có mã "${maHS}"`);
    }
    return result;
  }

  capNhatThongTin(maHS, duLieuMoi = {}) {
    const idx = this.danhSach.findIndex(hs => hs.maHS === maHS);
    if (idx === -1) {
      console.error(`❌ Không tìm thấy học sinh có mã "${maHS}" để cập nhật!`);
      return false;
    }

    if (duLieuMoi.hoTen && !this._isValidHoTen(duLieuMoi.hoTen)) {
      console.error("❌ Họ tên không hợp lệ!");
      return false;
    }
    if (duLieuMoi.lopHoc && !this._isValidLopHoc(duLieuMoi.lopHoc)) {
      console.error(`❌ Lớp học "${duLieuMoi.lopHoc}" không hợp lệ!`);
      return false;
    }
    if (duLieuMoi.diemTB !== undefined && !this._isValidDiem(duLieuMoi.diemTB)) {
      console.error(`❌ Điểm trung bình "${duLieuMoi.diemTB}" không hợp lệ!`);
      return false;
    }
    if (duLieuMoi.hanhKiem && !this._isValidHanhKiem(duLieuMoi.hanhKiem)) {
      console.error(`❌ Hạnh kiểm "${duLieuMoi.hanhKiem}" không hợp lệ!`);
      return false;
    }

    const { maHS: _, ...dataToUpdate } = duLieuMoi;
    Object.keys(dataToUpdate).forEach(key => {
      if (this.danhSach[idx].hasOwnProperty(key)) {
        this.danhSach[idx][key] = dataToUpdate[key];
      }
    });
    return true;
  }

  xoaHocSinh(maHS) {
    if (!this._isValidMaHS(maHS)) {
      console.error(`❌ Mã học sinh "${maHS}" không hợp lệ!`);
      return false;
    }
    const lengthBefore = this.danhSach.length;
    this.danhSach = this.danhSach.filter(hs => hs.maHS !== maHS);
    if (this.danhSach.length === lengthBefore) {
      console.warn(`⚠️ Không tìm thấy học sinh có mã "${maHS}" để xóa!`);
      return false;
    }
    return true;
  }

  layDanhSachTheoLop(tenLop) {
    if (!this._isValidLopHoc(tenLop)) {
      console.error(`❌ Tên lớp "${tenLop}" không hợp lệ! (Định dạng: 10A1, 11B2, 12C3,...)`);
      return [];
    }
    const result = this.danhSach.filter(({ lopHoc }) => lopHoc === tenLop);
    if (result.length === 0) {
      console.warn(`⚠️ Không tìm thấy học sinh nào ở lớp "${tenLop}"`);
    }
    return result;
  }

  thongKeHocLuc() {
    if (this.danhSach.length === 0) {
      console.warn("⚠️ Danh sách học sinh trống!");
      return { xuatSac: 0, gioi: 0, kha: 0, trungBinh: 0, kem: 0 };
    }
    const thongKe = { xuatSac: 0, gioi: 0, kha: 0, trungBinh: 0, kem: 0 };
    this.danhSach.forEach(({ diemTB }) => {
      if (diemTB >= 9) thongKe.xuatSac++;
      else if (diemTB >= 8) thongKe.gioi++;
      else if (diemTB >= 6.5) thongKe.kha++;
      else if (diemTB >= 5) thongKe.trungBinh++;
      else thongKe.kem++;
    });
    return thongKe;
  }

  sapXepTheoDiem(kieuSapXep = "giam") {
    if (!["tang", "giam"].includes(kieuSapXep)) {
      console.error(`❌ Kiểu sắp xếp "${kieuSapXep}" không hợp lệ! (Chỉ chấp nhận: 'tang' hoặc 'giam')`);
      return [];
    }
    const banSao = [...this.danhSach];
    banSao.sort((a, b) => kieuSapXep === "tang" ? a.diemTB - b.diemTB : b.diemTB - a.diemTB);
    return banSao;
  }
}

const duLieuBanDau = [
  { maHS: "ma2025001", hoTen: "Nguyễn Văn An", lopHoc: "10A1", diemTB: 8.5, hanhKiem: "Tốt" },
  { maHS: "ma2025002", hoTen: "Trần Thị Bình", lopHoc: "10A1", diemTB: 9.2, hanhKiem: "Tốt" },
  { maHS: "ma2025003", hoTen: "Lê Văn Cường", lopHoc: "10A2", diemTB: 7.0, hanhKiem: "Khá" },
  { maHS: "ma2025004", hoTen: "Phan Thị Duyên", lopHoc: "10A2", diemTB: 5.5, hanhKiem: "Trung bình" },
  { maHS: "ma2025005", hoTen: "Võ Văn Hùng", lopHoc: "10A3", diemTB: 4.0, hanhKiem: "Yếu" },
  { maHS: "ma2025006", hoTen: "Đặng Thị Lan", lopHoc: "10A3", diemTB: 6.8, hanhKiem: "Khá" },
  { maHS: "ma2025007", hoTen: "Bùi Văn Minh", lopHoc: "10A1", diemTB: 8.0, hanhKiem: "Tốt" },
  { maHS: "ma2025008", hoTen: "Ngô Thị Nga", lopHoc: "10A2", diemTB: 7.5, hanhKiem: "Khá" },
];

const school = new SchoolSystem(duLieuBanDau);

const ma1 = school.themHocSinh({ hoTen: "Phạm Thị Dung", lopHoc: "10A1", diemTB: 9.5, hanhKiem: "Tốt" });
const ma2 = school.themHocSinh({ hoTen: "Hoàng Văn Em", lopHoc: "10A2", diemTB: 4.5, hanhKiem: "Trung bình" });
console.log(`✅ Đã thêm học sinh có mã: ${ma1}`);
console.log(`✅ Đã thêm học sinh có mã: ${ma2}`);
school.themHocSinh({ hoTen: "AB", lopHoc: "10A1", diemTB: 8.0, hanhKiem: "Tốt" });
school.themHocSinh({ hoTen: "Trần Văn Kiên", lopHoc: "13A1", diemTB: 8.0, hanhKiem: "Tốt" });
school.themHocSinh({ hoTen: "Nguyễn Văn Long", lopHoc: "10A1", diemTB: 11, hanhKiem: "Tốt" });
school.themHocSinh({ hoTen: "Lê Thị Mai", lopHoc: "10A1", diemTB: 8.0, hanhKiem: "Xuất sắc" });

console.log("\n📋 DANH SÁCH TẤT CẢ HỌC SINH:");
console.table(school.danhSach);

console.log(school.timHocSinh("ma2025001"));
school.timHocSinh("ma2025999");
school.timHocSinh("abc123");

school.capNhatThongTin("ma2025003", { diemTB: 8.0, hanhKiem: "Tốt" });
console.log("\n📝 THÔNG TIN SAU CẬP NHẬT:");
console.log(school.timHocSinh("ma2025003"));

school.capNhatThongTin("ma2025003", { diemTB: 15 });
school.capNhatThongTin("ma2025003", { lopHoc: "13A1" });

console.log("\n📚 DANH SÁCH THEO LỚP:");
console.log('Danh sach lớp "10A1":');
console.table(school.layDanhSachTheoLop("10A1"));
console.log('Danh sach lớp "13A1":');
school.layDanhSachTheoLop("13A1");
console.log('Danh sach lớp "10A2":');    
console.table(school.layDanhSachTheoLop("10A2"));

console.log("\n📊 THỐNG KÊ HỌC LỰC:");
console.log(school.thongKeHocLuc());

console.log("\n📉 SẮP XẾP THEO ĐIỂM:");
console.log("Sắp xếp giảm dần:");
console.table(school.sapXepTheoDiem("giam"));
console.log("Sắp xếp tăng dần:");
console.table(school.sapXepTheoDiem("tang"));
school.sapXepTheoDiem("khac");

const ketQuaXoa = school.xoaHocSinh("ma2025002");
console.log(ketQuaXoa ? "\n✅ Xóa thành công" : "\n❌ Không tìm thấy");
school.xoaHocSinh("ma2025999");
school.xoaHocSinh("abc123");

console.log("\n📋 DANH SÁCH SAU KHI XÓA:");
console.table(school.danhSach);