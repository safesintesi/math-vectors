import { Vector2D } from "./2D";

export class Complex extends Vector2D {
    constructor(...components: Array<number | Array<number>>) {
        super(...components);
    }

    Re(): number {
        return this.x;
    }

    Im(): number {
        return this.y;
    }

    multiply(z: Complex): Complex {
        let re = this.x * z.x - this.y * z.y;
        let im = this.x * z.y + this.y * z.x;
        return new Complex(re, im);
    }

    divide(z: Complex): Complex {
        let re = this.x * z.x + this.y * z.y;
        let im = this.x * z.y - this.y * z.x;
        let n = z.norm();
        re /= n;
        im /= n;
        return new Complex(re, im);
    }

    conjugate(): Complex {
        return new Complex(this.x, -this.y);
    }
}
