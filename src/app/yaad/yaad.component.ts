import {  TreeTableModule , InputTextModule } from 'primeng/primeng';


import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { File1 } from '../model/product';

@Component({
  selector: 'app-yaad',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './yaad.component.html',
  styleUrls: [
    '../../../node_modules/font-awesome/css/font-awesome.min.css',
    '../../../node_modules/primeng/resources/themes/omega/theme.css',
    '../../../node_modules/primeng/resources/primeng.min.css',  
    './yaad.component.css']
})
export class YaadComponent implements OnInit {


public yaadim : any;

  constructor() { }


  public cols: any;

  ngOnInit() {



    this.cols = [
        {field: 'name', header: 'שם מדד'},
        {field: 'size', header: 'Size'},
        {field: 'type', header: 'Type'}
    ];

    var json = 
    `
    {
        "data":
        [  
            {  
                "data":{  
                    "name":"Documents",
                    "size":"75kb",
                    "type":"Folder"
                },
                "children":[
                    {  
                        "data":{  
                            "name":"Work",
                            "size":"55kb",
                            "type":"Folder"
                        },
                        "children":[  
                            {  
                                "data":{  
                                    "name":"Expenses.doc",
                                    "size":"30kb",
                                    "type":"Document"
                                }
                            },
                            {  
                                "data":{  
                                    "name":"Resume.doc",
                                    "size":"25kb",
                                    "type":"Resume"
                                }
                            }
                        ]
                    },
                    {  
                        "data":{  
                            "name":"Home",
                            "size":"20kb",
                            "type":"Folder"
                        },
                        "children":[  
                            {  
                                "data":{  
                                    "name":"Invoices",
                                    "size":"20kb",
                                    "type":"Text"
                                }
                            }
                        ]
                    }
                ]
            },
            {  
                "data":{  
                    "name":"Pictures",
                    "size":"150kb",
                    "type":"Folder"
                },
                "children":[  
                    {  
                        "data":{  
                            "name":"barcelona.jpg",
                            "size":"90kb",
                            "type":"Picture"
                        }
                    },
                    {  
                        "data":{  
                            "name":"primeui.png",
                            "size":"30kb",
                            "type":"Picture"
                        }
                    },
                    {  
                        "data":{  
                            "name":"optimus.jpg",
                            "size":"30kb",
                            "type":"Picture"
                        }
                    }
                ]
            }
        ]
    }
    
    `;


  this.yaadim =  <File1[]>JSON.parse(json).data; //JSON.parse(json);

  console.log(this.yaadim );

  }


  public valuechange(d,c)
  {
        console.log(d);
        console.log(c);
        
  }

}
