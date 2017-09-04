import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/map'
import { environment } from "../../../environments/environment";
@Injectable()
export class DataService {
    public _baseUri: string;
    private headers = new Headers({ "Content-Type": "application/json" });

    constructor(public http: Http) {
    }

    set(baseUri: string): void {
        this._baseUri = environment.serviceUrl + baseUri;
    }

    get(searchCriteria?: any) {
        if (searchCriteria != null)
            return this.http.get(this._baseUri, { search: searchCriteria, headers: this.headers })
                .map(response => (<Response>response));
        else
            return this.http.get(this._baseUri, { headers: this.headers })
                .map(response => (<Response>response));
    }

    post(data?: any, mapJson: boolean = true) {
        if (mapJson) {
            return this.http.post(this._baseUri, data, { headers: this.headers })
                .map(response => <any>(<Response>response).json());
        }
        else
            return this.http.post(this._baseUri, data, { headers: this.headers });
    }

    put(data?: any, mapJson: boolean = true) {
        if (mapJson) {
            return this.http.put(this._baseUri, data, { headers: this.headers })
                .map(response => <any>(<Response>response).json());
        }
        else
            return this.http.put(this._baseUri, data, { headers: this.headers });
    }

    delete(key: string) {
        return this.http.delete(this._baseUri + '/' + key, { headers: this.headers })
            .map(response => <any>(<Response>response).json())
    }
}