import {
    Component,
    OnInit,
    AfterViewInit,
    ViewEncapsulation,
    ElementRef,
    Renderer,
    ViewChild
} from '@angular/core';

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
    ConfirmationService,
    DataTable
} from 'primeng/primeng';//PrimeNg

import { InventoryService } from '../service/dataService';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Skil } from '../model/Skil';
import { validateConfig } from '@angular/router/src/config';
import { Message } from 'primeng/components/common/api';
import { element } from 'protractor';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';

import {TreeModule,TreeNode} from 'primeng/primeng';


//import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';


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
export class SkilComponent implements OnInit, AfterViewInit {

    @ViewChild('dt') dt: ElementRef;
    @ViewChild('someInput') someInput: ElementRef;

    en: any;
    skil: Skil;
    newSkil: boolean;
    selectedSkil: Skil;
    displayDialog: boolean;
    isLoadingData: boolean;

    skilsToDlete: number[];
    msgs: Message[] = [];
    skils: Skil[];
    skilsToSave: Skil[];
    statuses: any[];

    newSkilStatus : boolean;
    filesTree2: TreeNode[];
    
    constructor(private http: Http,
        private rd: Renderer,
        private fb: FormBuilder,
        private spinner: SpinnerModule,
        private apiService: InventoryService,
        private progressBar: ProgressBarModule,
        private confirmationService: ConfirmationService,

    ) {


    }

    value = 11;
    items: TreeviewItem[];
    config = TreeviewConfig.create({
        hasFilter: true,
        hasCollapseExpand: true
    });

    ngOnInit() {




        this.filesTree2 = [
            {
              label: 'Folder 1',
              collapsedIcon: 'fa-folder',
              expandedIcon: 'fa-folder-open',
              children: [
                {
                  label: 'Folder 2',
                  collapsedIcon: 'fa-folder',
                  expandedIcon: 'fa-folder-open',
                  children: [
                    {
                      label: 'File 2',
                      icon: 'fa-file-o'
                    }
                  ]
                },
                {
                  label: 'Folder 2',
                  collapsedIcon: 'fa-folder',
                  expandedIcon: 'fa-folder-open'
                },
                {
                  label: 'File 1',
                  icon: 'fa-file-o'
                }
              ]
            }
          ];

        this.items = [new TreeviewItem({
            text: 'ABC',
            value: 123456
        })];


        this.skil = new Skil();
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



    tableChange()
    {
        console.log("tableChange");
    }

    ngAfterViewInit() {
        // let count = 0;
        // var myInterval = setInterval(function() {
        //     // count++;
        //     // if(count > 100)
        //     // {
        //     //     clearInterval(myInterval);
        //     // }
        //     console.log("this.dt",this.dt);
        //         // if(this.dt)
        //         // {
                    
        //         // }
        //     // console.log("setInterval", this.dt);
        //     // if (this.dt){
        //     //       clearInterval(myInterval);
        //     //  } 
        //   }, 50);
        //console.log("dt....", this.someInput.nativeElement);

         // this.someInput.nativeElement.value = "Anchovies! 🍕🍕";
        // this.dt.nativeElement.style.background = "blue";
    }


    showSuccess() {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'נשמר בהצלחה', detail: ' ' });
    }

    statusChange(value, skil) {

        if (skil.Code > 0) {
            this.skilsToSave.push(skil);
        }
        //  skil.Status = value;
    }

    newSkilstatusChange(value ,skil) {
        console.log(value,skil);

      //  let s = new Skil();
       // skil.Status = value;
        // this.skil = s;
        // if (this.skil.Status) {
        //   //  this.skil.Status = !this.skil.Status;
        // }
        // else {
        //   //  this.skil.Status = true;
        //   skil.Status = true;
          
        // }

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



    save(dt: DataTable) {

        console.log("save..", dt);
        let skils = [...this.skils];
        // if (this.newSkil) {

        var minid = 0;

        this.skils.map(function (obj) {
            if (obj.Code < minid) minid = obj.Code;
        });

        this.skil.Code = minid >= 0 ? -1 : minid - 1;

        this.skil.Status = this.newSkilStatus; // TODO:

        skils.push(this.skil);

        console.log(this.skil);

        this.skilsToSave.push(this.skil);



        // }
        // else
        // {
        //     skils[this.findSelectedSkilIndex()] = this.skil;
        // }

        this.msgs = [{ severity: 'info', summary: this.skil.Name + ' נשמר בהצלחה ', detail: ' ' }];

        this.skils = skils;
        this.skil = new Skil();

        if (dt) {
            dt.sortColumn = dt.columns.find(col => col.field.toLowerCase() === "code");
            dt.sortField = "Code";// paginationOptions.SortColumn;
            dt.sortOrder = 1;//(paginationOptions.SortOrder == "ASC" ? 1 : -1);
            dt.sortSingle();
        }

        this.displayDialog = false;
    }


    saveAll() {

        console.log('saveAll');

        this.apiService.saveAllSkils(this.skilsToSave, this.skilsToDlete);
this.skilsToDlete =[];
this.skilsToSave = [];

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
                else
                {
                    this.skilsToSave = this.skilsToSave.filter(function(item) { 
                        return item.Code !== skil.Code
                    })
                }

                this.skil = new Skil();
                this.displayDialog = false;

                this.skils = this.skils.filter((val, i) => val.Code != skil.Code);

                this.msgs = [{ severity: 'info', summary: skil.Name + ' נמחק בהצלחה ', detail: ' ' }];
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

                //console.log(data);
                //console.log(this.skils);


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
