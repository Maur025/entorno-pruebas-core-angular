import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit, AfterViewInit {
  @ViewChild('iFrameId') iFrameId: ElementRef<HTMLInputElement>;
  codehtml = `
  p { color: red; }
  body { background-color: #eee; }`  ;
  constructor(
    private router: Router) { }
  ngOnInit(): void {

  }
  ngAfterViewInit() {

  }
  verCode(){
    let obj:any = this.iFrameId.nativeElement;
    console.log(this.iFrameId);
    console.log(obj);
    console.log(obj.contentWindow.location.href);
  }

}
