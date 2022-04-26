export class Vector {
    components: number[];

    public constructor(...components:Array<number | Array<number> | ReadonlyArray<number>>) {
        let newcomps = new Array<number>(0);
        components.forEach(x => {
                newcomps = newcomps.concat(x);
        });
        this.components = newcomps;
    }
    
    setComponents(comps: number[]) {
        this.components = comps;
    }

    set(id: number, value: number) {
        if (id < 0 || id >= this.components.length) { throw new RangeError("Index out of bound"); }
        this.components[id] = value;
    }

    static zeros(n:number) {
        let v = new Array<number>(n);
        return new Vector([...v].map((el,id) => {return 0}));
    }

    static ones(n:number) {
        let v = new Array<number>(n);
        return new Vector([...v].map((el,id) => {return 1}));
    }

    clone(): Vector{
        return new Vector(this.components);
    }

    toArray(): Array<number> {
        return [...this.components];
    }

    // toString(): string {
    //     let s: string = this.constructor.name +" ([ ";
    //     this.components.forEach((el, id) => {
    //         s = s + el
    //         if (id != this.components.length - 1 ) { s = s + ","}
    //         s = s + " "
    //     })
    //     s = s + "])"
    //     return s;
    // }

    combine(v:Vector): Vector {
        return new Vector(this.components,v.components);
    }

    size(): number {
        return this.components.length;
    }

    opposite(inPlace:boolean = false): Vector {
        let newcomps = this.components.map(it => -it);
        if (inPlace) {
            this.setComponents(newcomps);
            return this;
        }
        return new Vector(newcomps);
    }

    add(v:Vector, inPlace:boolean = false): Vector {
        let a = v.components;
        let b = this.components;
        let newcomps: number [] = new Array<number>(0);
        if (a.length != b.length) {
            throw new TypeError("Dimension Mismatch");
        }
        for (let i = 0; i < a.length; i++) {
            newcomps[i] = a[i] + b[i];
        }
        if (inPlace) {
            this.setComponents(newcomps);
            return this;
        }
        return new Vector(newcomps);
    }

    sub(v:Vector, inPlace: boolean = false): Vector {
        return this.add(v.opposite(true), inPlace);
    }

    scalar(n:number, inPlace:boolean = false): Vector {
        let newcomps = this.components.map(it => it*n);
        if (inPlace) {
            this.components = newcomps;
            return this;
        }
        return new Vector(newcomps);
    }

    dot(v: Vector): number {
        let a = v.toArray();
        let b = this.components;
        if (a.length != b.length) {
            throw new TypeError("Dimension Mismatch");
        }
        for (let i = 0; i < a.length; i++) {
            a[i] = a[i]*b[i];
        }
        return a.reduce((x,y) => x+y);
    }

    equals(v:Vector): boolean {
        let a = v.components;
        let b = this.components;
        if (a.length != b.length) {
            throw new TypeError("Dimension Mismatch");
        }
        for (let i = 0; i < a.length; i++) {
            if (Math.abs(a[i] - b[i]) > Number.EPSILON)
                return false;
        }
        return true;
    }

    norm(l:number = 2): number {
        switch (l) {
            case 1:
                return this.components.reduce((a,b) => a+b);
            case 2:
            default:
                let newcomps = this.components.map(x => x*x);
                return Math.sqrt(newcomps.reduce((a,b) => a+b));
        }
    }

    normalize(inPlace: boolean = false): Vector {
        return this.scalar((1/this.norm()), inPlace);
    }
}
