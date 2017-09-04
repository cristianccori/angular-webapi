import { BrokenRulesCollection } from '../../common/brokenrulescollection';
import { NotificationMessageCollection } from './notificationmessagecollection';
import { EventEmitter } from '@angular/core';

export class NotificationMessage {
    private static successTimeout: number = 3000;
    public Errors: NotificationMessageCollection = new NotificationMessageCollection();
    public Warnings: NotificationMessageCollection = new NotificationMessageCollection();
    public Information: NotificationMessageCollection = new NotificationMessageCollection();
    public Success: NotificationMessageCollection = new NotificationMessageCollection(NotificationMessage.successTimeout);

    public addBrokenRules(brokenRulesCollection: Array<BrokenRulesCollection>) {
        let groups = [
            { Col: this.Errors, Sev: 0 },
            { Col: this.Warnings, Sev: 1 },
            { Col: this.Information, Sev: 2 },
            { Col: this.Success, Sev: 3 }
        ];
        groups.forEach(group => this.addMessage(group.Col,
            brokenRulesCollection.filter(br => br.severity === group.Sev)));
    }

    private addMessage(collection: NotificationMessageCollection, messages: Array<BrokenRulesCollection>) {
        collection.AddRange(Array.from(messages, msg => msg.description));
    }

    public clearAll() {
        [this.Errors, this.Warnings, this.Information, this.Success].forEach(col => col.Clear());
    }

    public refreshDisplayMessages(refresh: Function) {
        [this.Errors, this.Warnings, this.Information, this.Success].forEach(col => col.GetRefreshDisplayMessageChangeEmitter().subscribe(item => refresh()));
    }
}