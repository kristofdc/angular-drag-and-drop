import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Category, Item } from './models';
import { CdkDrag, CdkDragMove, CdkDragRelease, CdkDropList } from '@angular/cdk/drag-drop';
import { DragDropService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit  {
  title = 'testapp';

  @ViewChild(CdkDropList) dropList?: CdkDropList;

  constructor(
    public dragDropService: DragDropService
  ) {}

  ngAfterViewInit(): void {
    if (this.dropList) {
      console.log('register droplist');
      this.dragDropService.register(this.dropList);
    }
  }

  testPredicate = (drag: CdkDrag, drop: CdkDropList) => {
    console.log(drop.id);
    return true;
  };

  // testPredicate(/*drag: CdkDrag, drop: CdkDropList*/) {
  //   return (item: CdkDrag<any>)=>{
  //     console.log('TEST'); //drop);
  //     return true;
  //   }
  // }

  enterDropList(name: string) {
    console.log(name);
  }



  cdkDropListConnectedToCategories = ['CAT1', 'CAT2'];

  categories: Category[] = [
    new Category('CAT1', [
      new Item('IT1', [
        new Item('IT1-SUB1'),
        new Item('IT1-SUB2')
      ]),

      new Item('IT2', [
        new Item('IT2-SUB1'),
        new Item('IT2-SUB2')
      ])
    ]),

    new Category('CAT2', [
      new Item('IT3', [
        new Item('IT3-SUB1'),
        new Item('IT3-SUB2')
      ]),

      new Item('IT4', [
        new Item('IT4-SUB1'),
        new Item('IT4-SUB2')
      ])
    ])
  ];

  drop(event: any, origin: string) {
    console.log(origin);
    console.log(event);
    console.log('--------');
  }

  getConnectedListForItems(): string[] {
    const result : string[] = [];

    this.categories.forEach(c => {
      result.push(...c.items.map(i => i.key));
    })

    return result;
  }

  getConnectedListForItemsAndCategories(): string[] {
    const result : string[] = [];

    result.push(...this.getConnectedListForItems());
    result.push(...this.getConnectedListForCategories());

    return result;
  }

  getConnectedListForItemsAndChildren(): string[] {
    const result : string[] = [];

    this.categories.forEach(c => {
      result.push(...c.items.map(i => i.key));

      c.items.forEach(i => {
        if(i.children !== null) {
          result.push(...i.children.map(ci => ci.key));
        }
      });
    })

    return result;
  }

  getConnectedListForCategories(): string[] {
    const result = this.categories.map(i => i.key);

    return result;
  }

  dragMoved(event: CdkDragMove<any>) {
    console.log('moved');
    this.dragDropService.dragMoved(event);
  }

  dragReleased(event: CdkDragRelease) {
    console.log('released');
    this.dragDropService.dragReleased(event);
  }

  onClick(event: MouseEvent) {
    let elementFromPoint = document.elementFromPoint(
      event.clientX,
      event.clientY
    );
  }
}
