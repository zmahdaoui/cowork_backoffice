export class OpenSpaceReq {
    id: number;
    location: string;
    wifi: boolean;
    drink: boolean;
    plateau_repas: boolean;
    conf_room: number;
    call_room: number;
    cosy_room: number;
    printers: number;
    laptops: number;
    schedule_mt_s: number;
    schedule_mt_e: number;
    schedule_f_s: number;
    schedule_f_e: number;
    schedule_we_s: number;
    schedule_we_e: number;
    adresse: string;

    constructor(id: number, location: string, wifi: boolean, drink: boolean, plateau_repas: boolean, conf_room: number, call_room: number, cosy_room: number, printers: number, laptops: number, schedule_mt_s: number, schedule_mt_e: number, schedule_f_s: number, schedule_f_e: number, schedule_we_s: number, schedule_we_e: number, adresse: string){
        this.id = id;
        this.location = location;
        this.wifi = wifi;
        this.drink = drink;
        this.plateau_repas = plateau_repas;
        this.conf_room = conf_room;
        this.call_room = call_room;
        this.cosy_room = cosy_room;
        this.printers = printers;
        this.laptops = laptops;
        this.schedule_mt_s = schedule_mt_s;
        this.schedule_mt_e = schedule_mt_e;
        this.schedule_f_s = schedule_f_s;
        this.schedule_f_e = schedule_f_e;
        this.schedule_we_s = schedule_we_s;
        this.schedule_we_e = schedule_we_e;
        this.adresse = adresse;
    }
  }
