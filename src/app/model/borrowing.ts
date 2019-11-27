export class Borrowing {
    id: number;
    location: string;
    type: string;
    start: number;
    end: number;
    date_res: string;
    number: number;
    id_user: number;
    email: string;
    first_name: string;
    last_name: string;

    constructor(id: number, location: string, type: string, start: number, end: number, date_res: string, number: number, id_user: number, email: string, first_name: string, last_name: string){
        this.id = id;
        this.location = location;
        this.type = type;
        this.start = start;
        this.end = end;
        this.date_res = date_res;
        this.number = number;
        this.id_user = id_user;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
    }
  }
