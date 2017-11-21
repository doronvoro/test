import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
    ProgressBarModule,
    SpinnerModule,
    DataTableModule,
    SharedModule,
    ButtonModule,
    DialogModule,
    CalendarModule,
    CheckboxModule,
    GrowlModule,
    ConfirmDialogModule,
    ConfirmationService
} from 'primeng/primeng';//PrimeNg

import { InventoryService } from '../service/dataService';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Skil } from '../model/Skil';
import { validateConfig } from '@angular/router/src/config';
import { Message } from 'primeng/components/common/api';
//import {MessageService} from 'primeng/components/common/messageservice';

@Component({
    selector: 'app-skil',
    templateUrl: './skil.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [

        '../../../node_modules/font-awesome/css/font-awesome.min.css',
        '../../../node_modules/primeng/resources/themes/omega/theme.css',
        '../../../node_modules/primeng/resources/primeng.min.css',
        './skil.component.css'
    ],
    providers: [InventoryService]
})
export class SkilComponent implements OnInit {

    msgs: Message[] = [];
    skils: Skil[];
    skilsToSave: Skil[];
    skilsToDlete: number[];

    skil: Skil;
    newSkil: boolean;
    selectedSkil: Skil;
    displayDialog: boolean;
    isLoadingData: boolean;
    statuses: any[];

    constructor(private http: Http,
        private apiService: InventoryService,
        private fb: FormBuilder,
        private spinner: SpinnerModule,
        private progressBar: ProgressBarModule,
        private confirmationService: ConfirmationService
    ) {

        
    }
    en: any;
    ngOnInit() {

        this.skilsToSave = [];
        this.skilsToDlete = [];
        this.statuses = [
            { label: 'הכל', value: null },
            { label: 'פעיל', value: 'true' },
            { label: 'לא פעיל', value: 'false' }

        ];

        this.en = {
            firstDayOfWeek: 0,
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            today: 'Today',
            clear: 'Clear'
        };
        this.getAllSkilss();



    }



   
   

    showSuccess() {
        this.msgs = [];
        this.msgs.push({severity:'success', summary:'נשמר בהצלחה', detail:' '});
    }
    
    statusChange(value, skil) {

        if (skil.Code > 0) {
            this.skilsToSave.push(skil);
        }
        //  skil.Status = value;
    }


    public onStatusFilterChange(value, field, dt) {
        if (value == null) {
            dt.filter(value, field, "equals");
            //  this.skils =  [...this.skils];
            return;
        }

        let b = (value.toLowerCase() === 'true');

        // this.gridSkils =   this.skils.filter(f => f.Status == b)

        //  console.log(value, field, dt);
        dt.filter(b, field, "equals");

        //console.log(value,field,filterMatchMode);
    }



    public showDialogToAdd() {
        this.newSkil = true;
        this.skil = new Skil();
        this.displayDialog = true;
    }



    save() {
        let skils = [...this.skils];
        if (this.newSkil) {

            var minid = 0;

            this.skils.map(function (obj) {
                if (obj.Code < minid) minid = obj.Code;
            });

            this.skil.Code = minid >= 0 ? -1 : minid - 1;

            skils.push(this.skil);

            console.log(this.skil);

            this.skilsToSave.push(this.skil);
        }
        // else
        // {
        //     skils[this.findSelectedSkilIndex()] = this.skil;
        // }


        this.skils = skils;
        this.skil = null;



        this.displayDialog = false;
    }







    saveAll() {

        console.log('saveAll');

        this.apiService.saveAllSkils(this.skilsToSave, this.skilsToDlete);
        this.showSuccess();

    }

    cellEdit(event) {
        console.log('cellEdit', event);
    }
    onEditInit(event) {
        var skil = event.data;

        if (skil.Code > 0) {
            this.skilsToSave.push(skil);
        }

        console.log('onEditInit', event);
    }

    delete(skil: Skil) {


        this.confirmationService.confirm({
            message: "  האם למחוק את '" + skil.Name + "'?",
            header: '',
            icon: 'fa fa-trash',
            accept: () => {

                if (skil.Code > 0) {
                    this.skilsToDlete.push(skil.Code);
                }
        
                this.skil = null;
                this.displayDialog = false;
        
                this.skils = this.skils.filter((val, i) => val.Code != skil.Code);

                this.msgs = [{severity:'info', summary:   skil.Name +' נמחק בהצלחה ', detail:' '}];
            },
            reject: () => {
              //  this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
            }
        });


        // if (!confirm("  האם למחוק את '" + skil.Name + "'?")) {

        //     console.log('confirm');
        //     return;
        // }

     

    }


    cellDirty(event) {
        console.log('cellDirty', event);
    }


    onRowSelect(event) {
        this.newSkil = false;
        this.skil = this.cloneSkil(event.data);
        this.displayDialog = true;
    }


    cloneSkil(c: Skil): Skil {
        let skil = new Skil();
        for (let prop in c) {
            skil[prop] = c[prop];
        }
        return skil;
    }


    findSelectedSkilIndex(): number {
        return this.skils.indexOf(this.selectedSkil);
    }



    public getAllSkilss() {
        this.isLoadingData = true;

        this.apiService.getAllSkils()
            .subscribe(
            data => {
                this.skils = data;

                this.skils.forEach(element => {
                    element.EndAt = new Date(element.EndAt);
                    element.StartAt = new Date(element.StartAt);


                });

                //  this.gridSkils = [...this.skils];

                console.log(data);
                console.log(this.skils);


            },
            error => {
                console.log(error),
                    this.isLoadingData = false;
            },
            () => {
                this.isLoadingData = false;
            });
    }

}
