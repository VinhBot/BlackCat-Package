const Du_lieu = require("mongoose");
/*==================================
# Cập nhật/thêm role tự động cho thành viên mới gia nhập
==================================*/
const AddRoles = function(member, role = {}) {
  if(!member.guild) return;
  let roles = role.Roles;
  for(let i = 0; i < roles.length; i++ )
  member.roles.add(roles[i]).then(() => {
    console.log(`Đã thêm role ${role.Roles} cho thành viên`.blue);
  }).catch(() => {});
  /*-------------------------
  # Tự động thêm role khi có thành viên mới vào máy chủ
  # Automatically add role when new members join the server
  # Thí dụ: 
  client.on("guildMemberAdd", async(member) => {
      AddRoles(member, {
          Roles: ["Roles ID"],
      });
  });
  --------------------------*/
};
/*==================================
# Kết nối với mongoose
==================================*/
const setMongoURL = function(Mat_Khau, Dang_nhap = true) {
    try {
    if (!Mat_Khau.startsWith("mongodb"));
    } catch(e) {
      console.log("MongoURL không hợp lệ hoặc bạn chưa thêm mongourl vui lòng check lại giúp mình nhé 😜".red);
    };
    const kiem_tra_ket_noi = function(Cung_co, Dang_nhap = true, Mat_Khau) {
       let Ket_noi = true;
       Du_lieu.connect(Cung_co, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
       }).catch((e) => {
          Ket_noi = false;
          console.log(e);
       }).then(() => {
          if(Ket_noi && Dang_nhap);
       });
       process.mongoURL = Mat_Khau;
    };
    kiem_tra_ket_noi(Mat_Khau, Dang_nhap);
};
/*==================================
# Cập nhật phiên bản mới nhất
==================================*/
const NewUpdate = function(Dinh_dang = true) {
    if (Dinh_dang) kiem_tra_update();
    async function kiem_tra_update() {
      if (!require("node-fetch")) return;
      const Du_lieu_goi = await require("node-fetch")(`https://registry.npmjs.com/blackcat-club`).then((van_ban) => van_ban.json());
      if (require("../package.json").version !== Du_lieu_goi["dist-tags"].latest) {
        console.log("\n\n");
        console.log("\x1b[32m" + "---------------------------------------");
        console.log("\x1b[32m" + "|          @blackcat-club      - [] X |");
        console.log("\x1b[32m" + "---------------------------------------");
        console.log("\x1b[33m" + `|         Mô-đun đã lỗi thời!\x1b[33m         |`);
        console.log("\x1b[35m" + "|       Phiên bản mới đã có sẵn!      |");
        console.log("\x1b[34m" + `|          ${require("../package.json").version} --> ${Du_lieu_goi["dist-tags"].latest}           |`);
        console.log("\x1b[36m" + '|       Chạy "npm i blackcat-club"    |');
        console.log("\x1b[36m" + "|            để cập nhật!             |");
        console.log("\x1b[37m" + `|   Xem lại thay đổi trong hướng dẫn  |`);
        console.log("\x1b[32m" + "--------------------------------------\x1b[37m");
        console.log("\n\n");
       };
   };
};
/*==================================
# 
==================================*/
module.exports = { AddRoles, NewUpdate, setMongoURL };