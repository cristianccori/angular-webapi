import { BrokenRulesCollection } from "./brokenrulescollection";

export class OperationResult {
    Succeeded: boolean;
    Message: string;

    constructor(succeeded: boolean = false, message: string = "") {
        this.Succeeded = succeeded;
        this.Message = message;
    }
}