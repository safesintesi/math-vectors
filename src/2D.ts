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
}