import { Transform, Exclude, Expose, Type } from "class-transformer";

@Exclude()
export class TimeLogTypeDto {

    @Expose()
    private timelogType: string;

    @Expose()
    private budget: number;

    constructor(timelogType: string, budget: number) {
        this.timelogType = timelogType;
        this.budget = budget;
    }

    get TimelogType(): string {
        return this.TimelogType;
    }
    set TimeLogType(value: string) {
        this.timelogType = value;
    }

    get Budget(): number {
        return this.budget;
    }
    set Budget(value: number) {
        this.budget = value;
    }
}
