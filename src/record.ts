declare var moment: any;

class record {
    player: number;
    x: number;
    y: number;
    stone: number;
    rotate: number;
}

class game_records {
    records: record[];

    constructor() {
        this.records = new Array<record>();
    }

    append = (r: record) => {
        this.records.push(r);
    }

    pop = () => {
        this.records.pop();
    }

    clear = () => {
        this.records.length = 0;
    }

    load = (json: record[]) => {
        this.records = json;
    }

    data = () => {
        return this.records;
    }

    save = () => {
        let a = document.createElement("a");
        a.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(JSON.stringify(this.records, undefined, 4)));
        a.setAttribute("download", "block-go-" + moment().format("MMMM-Do-hh-mm-ss") + ".json");
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}


export { game_records };
