import { GeneralVector } from "./General.js";
import { Vector } from "./Vector.js";

/**
 * Represtens a mathematical Vector on a Plane.
 * The Vector must have only two components.
 */
export class Vector2D extends Vector {
    /**Constructor. */
    constructor(...components: Array<number | Array<number> | ReadonlyArray<number>>) {
        super();
        let newcomps: number[] = new Array<number>(0);
        components.forEach(x => {
                newcomps= newcomps.concat(x);
        });
        if (newcomps.length != 2) {throw new Error('Not the expected amount of arguments');}
        this.components = newcomps;
    }

    get x():number {
        return this.components[0];
    }

    get y():number {
        return this.components[1];
    }

    set x(value: number) {
        this.components[0] = value;
    }

    set y(value: number) {
        this.components[1] = value;
    }
    
    /**
     * Returns the cross products between two vectors.
     * @param v A Vector2D
     * @returns The scalar number result of the cross product.
     */
    cross(v: Vector2D): number {
        return ((this.x * v.y) - (this.y * v.x));
    }

    static fromPolar(v:PolarVector2D) {
        let x = v.radius*Math.cos(v.angle);
        let y = v.radius*Math.sin(v.angle);
        return new Vector2D(x,y);
    }

    toPolar(): PolarVector2D {
        return new PolarVector2D(this.norm(), Math.atan2(this.y, this.x))
    }

    toObject(): object {
        return {
            x:this.x,
            y:this.y
        }
    }
}

/**
 * Represents a Polar Vecrtor: radius and angle in radiants.
 */
export class PolarVector2D implements GeneralVector{
    /**Radius > 0.*/
    _radius:number = 0;
    /**Angle between 0 and 2π.*/
    _angle:number = 0;
    /**Constructor.*/
    constructor(radius: number, angle:number) {
        this.angle = angle;
        this.radius = radius;
    }

    static from2D(v:Vector2D): PolarVector2D {
        return new PolarVector2D(v.norm(), Math.atan2(v.y, v.x));
    }

    to2D(): Vector2D {
        let x = this.radius*Math.cos(this.angle);
        let y = this.radius*Math.sin(this.angle);
        return new Vector2D(x,y);
    }
    
    get radius() {
        return this._radius;
    }
    
    set radius(radius: number) {
        if (radius < 0) {
            radius = -radius;
            this.angle = this.angle - Math.PI;
        }
        this._radius = radius;
    }

    get angle() {
        return this._angle;
    }
    
    set angle(angle:number) {
        angle = angle % (2*Math.PI)
        if (angle < 0) {angle += 2*Math.PI}
        this._angle = angle;
    }

    clone(): PolarVector2D {
        return new PolarVector2D(this.radius, this.angle);
    }

    toArray(): number[] {
        return new Array<number>(this.radius, this.angle);
    }

    toObject(): object {
        return {
            radius: this.radius,
            angle: this.angle
        }
    }

    opposite(inPlace: boolean = false): PolarVector2D {
        let newangle = this.angle + Math.PI;
        if (inPlace) {
            this.angle = newangle;
            return this;
        }
        return new PolarVector2D(this.radius, newangle);
    }

    add(v: PolarVector2D, inPlace: boolean = false): PolarVector2D {
        let a = this.to2D().add(v.to2D()) as Vector2D;
        let d = a.toPolar();
        if (inPlace) {
            this.angle = d.angle;
            this.radius = d.radius;
            return this;
        }
        return d;
    }

    sub(v: PolarVector2D, inPlace: boolean): PolarVector2D {
        return this.add(v.opposite());
    }

    dot(v: PolarVector2D): number {
        return this.radius*v.radius*Math.cos(this.angle - v.angle);
    }

    scalar(n: number, inPlace: boolean = false): PolarVector2D {
        if (inPlace) {
            this.radius *= n;
            return this;
        }
        return new PolarVector2D(this.radius*n, this.angle);
    }

    equals(v: PolarVector2D): boolean {
        if (Math.abs(this.radius - v.radius) > Number.EPSILON) return false;
        if (Math.abs(this.angle - v.angle) > Number.EPSILON) return false;
        return true;
    }

    norm(l: number = 2): number {
        if (l == 2) {
            return this.radius;
        }
        return this.to2D().norm(l);
    }

    normalize(inPlace: boolean = false): PolarVector2D {
        if (inPlace) {
            this.radius = 1;
            return this;
        }
        return new PolarVector2D(1,this.angle);
    }

    isNormal(v: PolarVector2D): boolean {
        return (Math.abs(Math.abs(this.angle - v.angle) - Math.PI/2) < Number.EPSILON);
    }
}