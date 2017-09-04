import { AsEnumerable } from "linq-es5";
import { EventEmitter } from '@angular/core';

declare var $: any;
export enum NotificationMessageDisplayMode {
    Top = 1,
    All = 2
}

export class NotificationMessageCollection {
    public static defaultTopCount: number = 5;

    private messages: Array<string> = [];
    private _displayMode: NotificationMessageDisplayMode = NotificationMessageDisplayMode.Top;
    private _displayMessages: Array<string> = [];
    private topCount: number = NotificationMessageCollection.defaultTopCount;
    private refreshDisplayMessageChange = new EventEmitter();

    constructor(private removeTimeout?: number) {
    }

    get displayMessages(): Array<string> {
        return this._displayMessages;
    }

    get displayMode(): NotificationMessageDisplayMode {
        return this._displayMode;
    }
    set displayMode(value: NotificationMessageDisplayMode) {
        if (this._displayMode === value)
            return;

        this._displayMode = value;

        if (this.messages.length) {
            this.RefreshDisplayMessages();
        }
    }

    private RefreshDisplayMessages() {
        switch (this._displayMode) {
            case NotificationMessageDisplayMode.Top:
                this._displayMessages = this.messages.slice(0, this.topCount);
                break;
            default:
                this._displayMessages = this.messages;
                break;
        }

        this.OnRefreshDisplayMessageChangeEvent();
    }

    public OnRefreshDisplayMessageChangeEvent() {
        this.refreshDisplayMessageChange.emit();
    }

    public GetRefreshDisplayMessageChangeEmitter() {
        return this.refreshDisplayMessageChange;
    }

    private AddInternal(message: string) {
        this.messages.push(message);

        if (this.removeTimeout > 0) {
            setTimeout(() => this.RemoveFirst(), this.removeTimeout);
        }
    }

    public RemoveFirst() {
        if (!this.messages.length)
            return;

        this.messages = this.messages.slice(1);
        this.RefreshDisplayMessages();
    }

    public Add(message: string) {
        this.AddInternal(message);
        this.RefreshDisplayMessages();
    }

    public Get(): Array<string> {
        return this.messages;
    }

    public Any(): boolean {
        return Boolean(this.messages.length);
    }

    public AnyMoreToDisplay() {
        return this.displayMode === NotificationMessageDisplayMode.Top && this.messages.length > this.topCount;
    }

    public AnyLessToDisplay() {
        return this.displayMode === NotificationMessageDisplayMode.All && this.messages.length > this.topCount;
    }

    public Clear() {
        this.messages = [];
        this.displayMode = NotificationMessageDisplayMode.Top;
        this.RefreshDisplayMessages();
    }

    public AddRange(messages: Array<string>) {
        if (messages && messages.length) {
            messages.forEach(message => this.AddInternal(message));
            this.RefreshDisplayMessages();
        }
    }

    public Reset(messages: Array<string> = []) {
        this.Clear();

        if (messages && messages.length) {
            this.AddRange(messages);
        }
    }

    public IncreaseDisplay(): void {
        if (this._displayMode < NotificationMessageDisplayMode.All) {
            this.displayMode++;
        }
    }

    public DecreaseDisplay(): void {
        if (this._displayMode > NotificationMessageDisplayMode.Top) {
            this.displayMode--;
        }
    }
}