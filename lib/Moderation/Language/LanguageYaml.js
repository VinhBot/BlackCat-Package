"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Language = void 0;
const Ho_tro_1 = __importDefault(require("yaml"));
const Ho_tro_2 = __importDefault(require("fs"));
const Duong_dan = __importDefault(require("path"));
class Language {  
    constructor(options) {
        this.directory = Duong_dan.default.resolve(options.directory ? options.directory : "./locales");
        this.defaultLocale = options.defaultLocale;
        this.locales = new Map();
        const Mang_dia_phuong = Ho_tro_2.default.readdirSync(this.directory).filter((file) => Ho_tro_2.default.statSync(Duong_dan.default.join(this.directory, file)).isDirectory());
        Mang_dia_phuong.forEach((locale) => {
            const Ban_do = new Map();
            const fileArray = Ho_tro_2.default.readdirSync(Duong_dan.default.join(this.directory, locale)).filter((file) => !Ho_tro_2.default.statSync(Duong_dan.default.join(this.directory, locale, file)).isDirectory()).filter((file) => file.endsWith(".yaml"));
            fileArray.forEach((section) => {
                const Duong_dan_tep = Duong_dan.default.join(this.directory, locale, section);
                const Tep = Ho_tro_2.default.readFileSync(Duong_dan_tep, "utf8");
                const Doi_tuong_tep = Ho_tro_1.default.parse(Tep);
                Ban_do.set(section.replace(".yaml", ""), Doi_tuong_tep);
            });
            this.locales.set(locale, Ban_do);
        });
        if (Ho_tro_2.default.existsSync(Duong_dan.default.join(this.directory, "constants.yaml"))) {
            const Duong_dan_tep = Duong_dan.default.join(this.directory, "constants.yaml");
            const Tep = Ho_tro_2.default.readFileSync(Duong_dan_tep, "utf8");
            const Doi_tuong_tep = Ho_tro_1.default.parse(Tep);
            this.constants = Doi_tuong_tep;
        }
    }
  
    resolveString(Ngon_ngu, Tiet_dien, Khoa) {
        const Ban_do = this.locales.get(Ngon_ngu) || this.locales.get(this.defaultLocale);
        if (!Ban_do) return `Không tìm thấy ngôn ngữ '${Ngon_ngu}'.`;
        const Phan_ban_do = Ban_do.get(Tiet_dien);
        if (!Phan_ban_do) return `Tiết diện '${Tiet_dien}' không tìm thấy trong ngôn ngữ '${Ngon_ngu}'`;
        const Chuoi_tu_khoa = Phan_ban_do[Khoa];
        if (!Chuoi_tu_khoa) return `Chìa khóa '${Khoa}' không tìm thấy trong phần ${Tiet_dien} trong ngôn ngữ '${Ngon_ngu}'`;
        return Chuoi_tu_khoa;
    }
  
    replace(Noi_dung, args) {
        if(args) {
            for (const arg in args) {
                const Ma_thong_bao = new RegExp(`%{${arg}}`, "gm");
                if (Array.isArray(Noi_dung)) {
                    Noi_dung = Noi_dung.map((str) => str.replace(Ma_thong_bao, args[arg]));
                } else {
                    Noi_dung = Noi_dung.replace(Ma_thong_bao, args[arg]);
                }
            }
        }
        const Tat_ca_cac_hang_so = this.constants;
        if(Tat_ca_cac_hang_so) {
            for (const Khong_thay_doi in Tat_ca_cac_hang_so) {
                const Ma_thong_bao = new RegExp(`%{${Khong_thay_doi}}`, "gm");
                if (Array.isArray(Noi_dung)) {
                    Noi_dung = Noi_dung.map((str) => str.replace(Ma_thong_bao, Tat_ca_cac_hang_so[Khong_thay_doi]));
                } else {
                    Noi_dung = Noi_dung.replace(Ma_thong_bao, Tat_ca_cac_hang_so[Khong_thay_doi]);
                }
            }
        }
        return Noi_dung;
    }
    getLocales() {
        return Array.from(this.locales.keys());
    }
    getConstant(Khong_thay_doi) {
        if(Khong_thay_doi)
            return this.constants ? this.constants[Khong_thay_doi] : undefined;
        else
            return this.constants;
    }
    toJSON(args) {
        const payload = { constants: this.constants };
        const localeIterator = this.getLocales();
        localeIterator.forEach((locale) => {
            const localeObj = {};
            const file = this.locales.get(locale);
            const sectionIterator = Array.from(file.keys());
            sectionIterator.forEach((section) => {
                const stringObject = file.get(section);
                for (const str in stringObject) {
                    stringObject[str] = this.replace(stringObject[str], args);
                }
                localeObj[section] = stringObject;
            });
            payload[locale] = localeObj;
        });
        return payload;
    }
    get(Ngon_ngu, Tiet_dien, Khoa, args) {
        const Giai_quyet = this.resolveString(Ngon_ngu, Tiet_dien, Khoa);
        const Da_giai_quyet = this.replace(Giai_quyet, args);
        return Da_giai_quyet;
    }
}
exports.Language = Language;