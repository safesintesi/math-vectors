export interface GeneralVector {
    components? : number[];
    setComponents?: (newcomps: number[]) => void;
    set?: (id: number, value: number) => void;
    clone(): GeneralVector;
    toArray(): Array<number>;
    toString(): string;
    toObject(): object;
    add(v:GeneralVector, inPlace:boolean): GeneralVector;
    dot(v: GeneralVector): number;
    sub(v:GeneralVector, inPlace: boolean): GeneralVector;
    scalar(n:number, inPlace:boolean): GeneralVector;
    opposite(inPlace:boolean): GeneralVector;
    cross?(): number;
    equals(v:GeneralVector): boolean;
    norm(l:number): number;
    normalize(inPlace: boolean): GeneralVector;
    isNormal(v: GeneralVector): boolean;
}