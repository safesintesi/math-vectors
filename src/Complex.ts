import { Vector2D } from "./2D";

/**
 * Represents a complex mnumber as a Vector on a plane.
 * 
 */
export class Complex extends Vector2D {
    constructor(...components: Array<number | Array<number>>) {
        super(...components);
    }

    /**
     * 
     * @returns The real part of the number.
     */
    Re(): number {
        return this.x;
    }

    /**
     * 
     * @returns The immaginary part of the number.
     */
    Im(): number {
        return this.y;
    }

    /**
     * Multiplies this number for another complex.
     * @param z A complex number.
     * @returns A new Complex.
     */
    multiply(z: Complex): Complex {
        let re = this.x * z.x - this.y * z.y;
        let im = this.x * z.y + this.y * z.x;
        return new Complex(re, im);
    }

    /**
     * Divides this number for another complex.
     * @param z A Complex.
     * @returns A new Complex.
     */
    divide(z: Complex): Complex {
        let re = this.x * z.x + this.y * z.y;
        let im = this.x * z.y - this.y * z.x;
        let n = z.norm();
        re /= n;
        im /= n;
        return new Complex(re, im);
    }

    /**
     * Returns the conjugate of this Complex.
     * @returns A new Complex.
     */
    conjugate(): Complex {
        return new Complex(this.x, -this.y);
    }
}
