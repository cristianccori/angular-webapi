import { Injectable } from '@angular/core';


export interface ILoader {
    isLoading: boolean;
}

@Injectable()
export class NotificationService {

    loader: ILoader = { isLoading: false };

    constructor() {
    }

    showLoader() {
        this.loader.isLoading = true;
    }

    hideLoader() {
        this.loader.isLoading = false;
    }
}