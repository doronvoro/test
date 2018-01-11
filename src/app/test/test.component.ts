import { Component, OnInit } from '@angular/core';
import {TreeModule,TreeNode} from 'primeng/primeng';
 
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: [
    
    '../../../node_modules/font-awesome/css/font-awesome.min.css',
    '../../../node_modules/primeng/resources/themes/omega/theme.css',
    '../../../node_modules/primeng/resources/primeng.min.css',
    
    './test.component.css'
  ]
})
export class TestComponent implements OnInit {


  filesTree2: TreeNode[];

  constructor() { }

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


  }

}
