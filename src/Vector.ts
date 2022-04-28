/**
 * Represtens a mathematical Vector.
 */
export class Vector {
    /** Contains all the components of the Vector.*/
    components: number[];

    /**Constructor.*/
    public constructor(...components:Array<number | Array<number> | ReadonlyArray<number>>) {
        let newcomps = new Array<number>(0);
        components.forEach(x => {
                newcomps = newcomps.concat(x);
        });
        this.components = newcomps;
    }
    
    /**Reset the components.*/
    setComponents(newcomps: number[]) {
        this.components = newcomps;
    }

    /**Sets a single entry of the vector to a new value.*/
    set(id: number, value: number) {
        if (id < 0 || id >= this.components.length) { throw new RangeError("Index out of bound"); }
        this.components[id] = value;
    }

    /**
     * Create a new vector of size n with all entries set as zero.
     * @param n Size of the new vector of zeros.
     * @returns The new Vector created.
     */
    static zeros(n:number): Vector {
        let v = new Array<number>(n);
        return new Vector([...v].map((el,id) => {return 0}));
    }

    /**
     * Create a new vector of size n with all entries set as zero.
     * @param n Size of the new vector of ones.
     * @returns The new Vector created.
     */
    static ones(n:number): Vector {
        let v = new Array<number>(n);
        return new Vector([...v].map((el,id) => {return 1}));
    }

    /**
     * Clone this Vector.
     * @returns A copy of this Vector.
     */
    clone(): Vector{
        return new Vector(this.components);
    }

    /**
     * Create an Array containing the components.
     * @returns An Array<number> containing the components.
     */
    toArray(): Array<number> {
        return [...this.components];
    }

    /**
     * Create a string describing the Vector.
     * @returns A string describing the vector.
     * @beta
     * @experimental
     */
    toString(): string {
        let s: string = this.constructor.name +" ([ ";
        this.components.forEach((el, id) => {
            s = s + el
            if (id != this.components.length - 1 ) { s = s + ","}
            s = s + " "
        })
        s = s + "])"
        return s;
    }

    /**
     * Create a new Vector with all entries from this Vector and the passed one.
     * @param v Vector to be combined.
     * @returns The new Vector.
     */
    combine(v:Vector): Vector {
        return new Vector(this.components,v.components);
    }

    /**
     * @returns The number of entries in this Vector.
     */
    size(): number {
        return this.components.length;
    }
    
    /**
     * Sets all entries with opposite sign of this Vector's.
     * 
     * @remarks
     * 
     * This method creates new components and returns an Array with them.
     * If `inPlace` is set as true, the method modifies this array.
     * 
     * @param inPlace Set as true to save the results in this Vector.
     * @returns A Vector that has all entries opposite to this' ones.
     */
    opposite(inPlace:boolean = false): Vector {
        let newcomps = this.components.map(it => -it);
        if (inPlace) {
            this.setComponents(newcomps);
            return this;
        }
        return new Vector(newcomps);
    }

    /**
     * Sums all entries of this Vector with those of the passed one.
     * 
     * @remarks
     * 
     * This method creates new components and returns an Array with them.
     * If `inPlace` is set as true, the method modifies this array.
     * 
     * @param v The Vector with the addends.
     * @param inPlace Set as true to save the results in this Vector.
     * @returns A Vector containing the results.
     */
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

    /**
     * Subtracts all entries of this Vector with those of the passed one.
     * 
     * @remarks
     * 
     * This method creates new components and returns an Array with them.
     * If `inPlace` is set as true, the method modifies this array.
     * 
     * @param v The Vector with the minuends.
     * @param inPlace Set as true to save the results in this Vector.
     * @returns A Vector containing the differences.
     */
    sub(v:Vector, inPlace: boolean = false): Vector {
        return this.add(v.opposite(true), inPlace);
    }

    /**
     * Scalar multiplication, scales this Vector by the given number.
     * 
     * @param n Scalar number
     * @param inPlace Set as true to save the results in this Vector.
     * @returns A scaled Vector.
     */
    scalar(n:number, inPlace:boolean = false): Vector {
        let newcomps = this.components.map(it => it*n);
        if (inPlace) {
            this.components = newcomps;
            return this;
        }
        return new Vector(newcomps);
    }

    /**
     * Returns the dot product of two Vectors.
     * 
     * @param v A Vector.
     * @returns The dot product.
     */
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

    /**
     * Returns true if the Vectors are equal.
     * 
     * @remarks
     * 
     * This method takes in consideration the safe number precision of doubles.
     * 
     * @param v A Vector.
     * @returns A boolean.
     * @beta
     * @experimental
     */
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

    /**
     * Return the required norm. By default return the length of the Vector.
     * 
     * @remarks
     * 
     * If l = 1, return the l1-norm (a.k.a. the Manhattan norm).
     * If l = 2, return the l2-norm (a.k.a. the Euclidian norm).
     * If you have no idea what these are you probably just want the default value for the distance between two points.
     * 
     * @param l The type of norm.
     * @returns The value of the required norm.
     */
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

    /**
     * Scales this Vector so that its lenght is equal to one.
     * @param inPlace Set as true to save the results in this Vector.
     * @returns The normalized Vector.
     */
    normalize(inPlace: boolean = false): Vector {
        return this.scalar((1/this.norm()), inPlace);
    }

    /**
     * Return true if the Vectors are normal (a.k.a. perpendicular) to each other.
     * @param v A Vector.
     * @returns A boolean.
     */
    isNormal(v: Vector): boolean {
        return (this.dot(v) < Number.EPSILON);
    }
}
