import { TreeTableModule, InputTextModule ,InputMaskModule,BlockUIModule} from 'primeng/primeng';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TreeNode } from 'primeng/components/common/treenode';
import { InventoryService } from '../service/dataService';
import 'rxjs/add/operator/map';
import { when } from 'q';
import { element } from 'protractor';

@Component({
    selector: 'app-yaad',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './yaad.component.html',
    styleUrls: [
        '../../../node_modules/font-awesome/css/font-awesome.min.css',
        '../../../node_modules/primeng/resources/themes/omega/theme.css',
        '../../../node_modules/primeng/resources/primeng.min.css',
        './yaad.component.css'],
    providers: [InventoryService]
})
export class YaadComponent implements OnInit {

    selectedNode: TreeNode;
    isLoadingData: boolean;
    selectedYear: number;
    selectedMonth: number;
    skilsToSave:any[];
    months: any[];
    years: any[];
    yaadim: any;
    cols: any;

    constructor(private apiService: InventoryService) { }

    ngOnInit() {
        this.cols = [];
        this.months = [];
        this.years = [];
        this.skilsToSave = [];

        this.loadDates();
        this.search();
    }



    loadDates() {
        for (var n = 0; n <= 11; n++) {
            let prif =(n +1) < 10 ? "0" : "";
            this.months.push({ label: prif + (n +1), value: n });
        }

        let date = new Date();
        let currentYear =date.getFullYear();

        for (var n = 0; n <= 10; n++) {
            let val = currentYear - n;
            this.years.push({ label: val, value: val })
        }

        this.selectedYear = currentYear;
        this.selectedMonth = date.getMonth() ;
    }


    public search() {

        if(this.skilsToSave.length > 0)
        {
            //TODO:
        }
        this.skilsToSave =[];

        this.isLoadingData = true;

        let d = new Date(this.selectedYear,this.selectedMonth,1);

        this.apiService.getAllYaadim(d)
            .subscribe(
            data => {

                this.yaadim = <any[]>data.data.data;

                this.cols = (<any[]>data.skils).map(function (x) { return { field: "skil_" + x.id, header: x.name } });

                this.cols.splice(0, 0, { field: 'name', header: 'שם מדד' });

            },
            error => {
                console.log(error)//,
                this.isLoadingData = false;
            },
            () => {
                this.isLoadingData = false;
            });
    }


    saveAll()
    {
        if(this.skilsToSave.length == 0)
        {
            return;
        }

        this.apiService.saveAllYaadim(this.skilsToSave);

        console.log(this.skilsToSave);

        this.skilsToSave =[];
    }

    public valuechange(value ) {

       let arr = this.skilsToSave.filter(function(s){

            if(s.skilId == value.skilId &&  s.kvId == value.kvId  && s.mId == value.mId)
            {
                return s;
            }

        });

        if(arr.length > 0)
        {
            arr[0] = value;
        }
        else
        {
            this.skilsToSave.push(value);
        }

    }

}




