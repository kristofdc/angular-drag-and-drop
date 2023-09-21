import { CdkDragMove, CdkDragRelease, CdkDropList } from "@angular/cdk/drag-drop";
import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";

@Injectable()
export class DragDropService {
  dropLists: CdkDropList[] = [];
  currentHoverDropListId?: string;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  public register(dropList: CdkDropList) {
    this.dropLists.push(dropList);
  }

  dragMoved(event: CdkDragMove<any>) {

     if(event.pointerPosition.x >= 200 && event.pointerPosition.y >= 80) {
       console.log('check');
     }

    // let elementFromPoints = this.document.elementsFromPoint(
    //   event.pointerPosition.x,
    //   event.pointerPosition.y
    // );

    let elementFromPoint = this.document.elementFromPoint(
        event.pointerPosition.x,
        event.pointerPosition.y
      );

    if (!elementFromPoint) {
      this.currentHoverDropListId = undefined;
      return;
    }

    // if(elementFromPoint.id !== 'CAT2' && elementFromPoint.id !== 'CAT1'){
    //   console.log('no cat2');
    // }


    let dropList = elementFromPoint.classList.contains('cdk-drop-list')
      ? elementFromPoint
      : elementFromPoint.closest('.cdk-drop-list');

    if (!dropList) {
      console.log('no drop lists');
      this.currentHoverDropListId = undefined;
      return;
    }

    this.currentHoverDropListId = dropList.id;
    console.log('--------------' + this.currentHoverDropListId);
  }

  dragReleased(event: CdkDragRelease) {
    this.currentHoverDropListId = undefined;
  }
}
