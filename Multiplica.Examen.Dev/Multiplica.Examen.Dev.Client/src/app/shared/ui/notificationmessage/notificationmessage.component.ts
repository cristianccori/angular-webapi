import { Component, Pipe, PipeTransform, OnInit, HostListener, Input, ElementRef, Output, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DataService } from "../../../shared/services/data.service";
import { AsEnumerable } from "linq-es5";
import { NotificationMessage } from "./notificationmessage";
import { NotificationMessageCollection, NotificationMessageDisplayMode } from "./notificationmessagecollection";

declare var $: any;

@Component({
    selector: 'notificationmessage',
    styles: [`
		a { outline: none; }
	`],
    templateUrl: "./notificationmessage.component.html"
    , providers: [DataService]

})
export class NotificationMessageComponent implements OnInit {
    @Input() notificationMessage: NotificationMessage;

    private numSelected: number = 0;
    private isVisible: boolean = false;

    messageGroups: Array<NotificationMessageGroup>;

    constructor(
        private element: ElementRef
        , private dataService: DataService
    ) { }

    ngOnInit() {

        this.notificationMessage = Object.assign(new NotificationMessage(), this.notificationMessage);

        this.messageGroups = [
            new NotificationMessageGroup(this.notificationMessage.Errors, "list-group-item-danger", "btn-danger", "error"),
            new NotificationMessageGroup(this.notificationMessage.Warnings, "list-group-item-warning", "btn-warning", "warning"),
            new NotificationMessageGroup(this.notificationMessage.Information, "list-group-item-info", "btn-info", "info"),
            new NotificationMessageGroup(this.notificationMessage.Success, "list-group-item-success", "btn-success", "success")
        ];
        this.notificationMessage.refreshDisplayMessages(this.resizeWindows);
    }

    private resizeWindows() {
        setTimeout(() => { $(window).resize() }, 310);
    }
}

class NotificationMessageGroup {
    constructor(private collection: NotificationMessageCollection,
        private itemClass: string,
        private btnClass: string,
        private groupClass: string) {
    }

    get hasMessages(): boolean {
        return this.collection.Any();
    }

    get displayMessages(): Array<string> {
        return this.collection.displayMessages;
    }

    get hasMoreMessages() {
        return this.collection.AnyMoreToDisplay();
    }

    get hasLessMessages() {
        return this.collection.AnyLessToDisplay();
    }

    get hasMoreLessMessages() {
        return this.hasMoreMessages || this.hasLessMessages;
    }

    displayMoreMessages(): void {
        this.collection.IncreaseDisplay();
    }

    displayLessMessages(): void {
        this.collection.DecreaseDisplay();
    }
}