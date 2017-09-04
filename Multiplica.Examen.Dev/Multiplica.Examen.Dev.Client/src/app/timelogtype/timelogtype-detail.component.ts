import { Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChange } from "@angular/core";
import { Http, URLSearchParams, Headers } from "@angular/http";
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { OperationResult } from "../shared/common/operationresult";
import { ValidationMessage } from "../shared/common/validationmessage";
import { NotificationService, ILoader } from "../shared/services/notification.service";
import { NotificationMessage } from "../shared/ui/notificationmessage/notificationmessage";
import { plainToClass } from "class-transformer";
import { DataService } from "../shared/services/data.service";
import { TimeLogTypeDto } from "./shared/timelogtypedto";

declare var $: any;

@Component({
    selector: "timelogtype-detail",
    templateUrl: "./timelogtype-detail.component.html",
    providers: [NotificationService]
})

export class TimeLogTypeDetailComponent implements OnInit {
    private timeLogTypeUrl: string = "timelogtypes";
    timeLogTypeForm: FormGroup;
    notificationMessage: NotificationMessage = new NotificationMessage();
    loader: ILoader;
    uniqueMessagesErrors: Array<string>;
    validationMessages: any;
    @Input() pageTitle: string;
    @Input() timeLogTypeDto: TimeLogTypeDto;
    @Input() isEdit: boolean;
    @Output() onSaved = new EventEmitter();
    submitted = false;
    
    constructor(
        private dataService: DataService,
        private fb: FormBuilder,
        public notificationService: NotificationService) {}

    ngOnInit() {
        this.validationMessages = this.validation();
        this.loader = this.notificationService.loader;
        this.notificationService.showLoader();
        this.uniqueMessagesErrors = new Array<string>();
        this.buildForm();
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        this.removeMessages();
    }

    formErrors = {
        'type': '',
        'budget': ''
    };

    assignMessagesValidation() {
        for (let m of this.uniqueMessagesErrors)
            if (m)
                this.notificationMessage.Errors.Add(m);
    }

    onValueChanged(data?: any) {
        const form = this.timeLogTypeForm;
        this.uniqueMessagesErrors = new Array<string>();
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            let control = form.get(field);
            if (control && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    //prevent duplicate
                    if (this.uniqueMessagesErrors.indexOf(messages[key]) == -1)
                        this.uniqueMessagesErrors.push(messages[key]);
                }
            }
        }
    }

    removeMessages(): void {
        this.notificationMessage.clearAll();
    }

    save(): void {
        this.removeMessages();
        if (!this.timeLogTypeForm.valid) {
            this.assignMessagesValidation();
            return;
        }
        var _registrationResult: OperationResult = new OperationResult(false, "");
        if (this.isEdit) {
            this.notificationService.showLoader();
            this.dataService.set(this.timeLogTypeUrl);
            this.dataService.put(JSON.stringify(this.timeLogTypeDto)).subscribe(
                result => {
                    _registrationResult.Succeeded = result.isValid;
                    this.notificationMessage.addBrokenRules(result.brokenRulesCollection);
                    this.notificationService.hideLoader();
                },
                error => {
                    this.notificationMessage.Errors.Add(ValidationMessage.errorGeneral);
                    this.notificationService.hideLoader();
                },
                () => {
                    if (_registrationResult.Succeeded) {
                        this.notificationMessage.Success.Add(ValidationMessage.updateSuccessfully);
                        this.onSaved.emit();
                    }     
                });
        }
        else {
            this.notificationService.showLoader();
            this.dataService.set(this.timeLogTypeUrl);
            this.dataService.post(JSON.stringify(this.timeLogTypeDto)).subscribe(
                result => {
                    _registrationResult.Succeeded = result.isValid;
                    this.notificationMessage.addBrokenRules(result.brokenRulesCollection);
                    this.notificationService.hideLoader();
                },
                error => {
                    this.notificationMessage.Errors.Add(ValidationMessage.errorGeneral);
                    this.notificationService.hideLoader();
                },
                () => {
                    if (_registrationResult.Succeeded) {
                        this.notificationMessage.Success.Add(ValidationMessage.updateSuccessfully);
                        this.timeLogTypeForm.reset();
                        this.onSaved.emit();
                    } 
                });
        }
    }

    buildForm(): void {
        var rules =
            {
                'type': [this.timeLogTypeDto.TimelogType, [
                    Validators.required,
                    Validators.maxLength(20)
                ]],
                'budget': [this.timeLogTypeDto.Budget, [
                    Validators.required,
                    Validators.maxLength(5),
                    Validators.pattern("^[0-9]*$")
                ]]
            };
        this.timeLogTypeForm = this.fb.group(rules);
        this.timeLogTypeForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();     
        this.notificationService.hideLoader();
    }

    validation(): any {
        return {
            'type': {
                'required': ValidationMessage.typeIsRequired,
                'maxlength': ValidationMessage.typeMaxLength
            },
            'budget': {
                'required': ValidationMessage.budgetIsRequired,
                'maxlength': ValidationMessage.budgetMaxLength,
                'pattern': ValidationMessage.budgetPattern
            }
        }
    };
}