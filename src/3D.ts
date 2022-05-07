import { Vector } from "./Vector.js";

/**
 * Represtens a mathematical Vector in a 3D space.
 * The Vector must have only three components.
 */
export class Vector3D extends Vector {
    constructor(...components: Array<number | Array<number> | ReadonlyArray<number>>) {
        super();
        let newcomps: number[] = new Array<number>(0);
        components.forEach(x => {
                newcomps = newcomps.concat(x);
        });
        if (newcomps.length != 3) {throw new Error('Not the expected amount of arguments');}
        this.components = newcomps;
    }

    get x():number {
        return this.components[0];
    }

    get y():number {
        return this.components[1];
    }

    get z():number {
        return this.components[2];
    }

    set x(value: number) {
        this.components[0] = value;
    }

    set y(value: number) {
        this.components[1] = value;
    }

    set z(value: number) {
        this.components[2] = value;
    }

    /**
     * Returns the cross products between two vectors.
     * @param v A Vector3D
     * @returns A Vector3D result of the cross product.
     */
    cross(v: Vector3D): Vector3D {
        let a = new Array<number>(3);
        let b = this.components;
        let c = v.components;
        if (c.length != 3) throw new TypeError('Dimension not allowed');
        a[0] = b[1]*c[2] - b[2]*c[1];
        a[1] = b[2]*c[0] - b[0]*c[2];
        a[2] = b[0]*c[1] - b[1]*c[0];
        return new Vector3D(a);
    }

    toObject(): object {
        return {
            x: this.x,
            y: this.y,
            z: this.z
        }
    }
}
