import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Product } from '../model/product';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Skil } from '../model/Skil';

@Injectable()
export class InventoryService {

    baseUrl: string;

    constructor(private http: Http) {
        this.baseUrl = "http://localhost:61665/api/";
    }

    public getAllSkils() {
        return this.http.get(this.baseUrl + 'skils').map((res: Response) => <Skil[]>res.json());
        // return this.http.get( this.baseUrl +'skils').map((res: Response) => res.json()).map(({code,name,satus ,startAt,endAt}) => new Skil(code,name,satus ,new Date(startAt),new Date(endAt)));
    }

    public getAllYaadim(date: Date) {
        // let params = new URLSearchParams();
        // params.set('date', 'aaaa');
        // let headers = new Headers({  'Content-Type': 'application/x-www-form-urlencoded' });
        // let options = new RequestOptions({ headers: headers, params: params });
        // console.log(options);

        let url = this.baseUrl + 'Yaadim?date=' + date.toISOString();

        return this.http.get(url).map((res: Response) => res.json());
    }

    public  saveAllYaadim(yaadim: any[]) {
       

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(yaadim);

        const req = this.http.post(this.baseUrl + 'Yaadim/SaveAll', body, options
        )
            .subscribe(
            res => {
                console.log(res);
            },
            err => {
                console.log("Error occured");
            }
            );
    }

    saveAllSkils(skils: Skil[], deleteIds: number[]) {
        var obj =
            {
                "Skils": skils,
                "deleteIds": deleteIds
            };

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(obj);

        const req = this.http.post(this.baseUrl + 'skils/SaveAll', body, options
        )
            .subscribe(
            res => {
                console.log(res);
            },
            err => {
                console.log("Error occured");
            }
            );
    }

    // addProduct(product) {
    //     let headers = new Headers({ 'Content-Type': 'application/json' });
    //     let options = new RequestOptions({ headers: headers });
    //     let body = JSON.stringify(product);
    //     return this.http.post(this.baseUrl + 'Product/', body, options).map((res: Response) => res.json());
    // }

    // updateProduct(product) {
    //     let headers = new Headers({ 'Content-Type': 'application/json' });
    //     let options = new RequestOptions({ headers: headers });
    //     let body = JSON.stringify(product);
    //     return this.http.put('/api/Product/' + product.Id, body, options).map((res: Response) => res.json());
    // }

    // deleteProduct(product) {
    //     return this.http.delete(this.baseUrl + '/Product/' + product.Id);
    // }
}
