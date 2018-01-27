import { Component, OnInit } from '@angular/core';
import { ProviderDataService } from '../provider-data.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {

  constructor(private providerDataService: ProviderDataService, private notificationsService: NotificationsService) { }
  isShowLoader: boolean = false;
  showTbl: boolean = false;
  apiData: any;
  provObj: any;
  fld1Caption: string;
  fld2Caption: string;

  ngOnInit() {
    this.apiData = this.providerDataService.getApiData();
    let obj = this.providerDataService.getProvData();
    if (obj != undefined) {
      this.fld1Caption = obj.fld1Caption;
      this.fld2Caption = obj.fld2Caption;
    }

    //show tbl
    if (this.apiData.length > 0) {
      this.showTbl = true;
    }
  }

  //mapping array to common names
  mappingArray(arr, fld1, fld2, type): any {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
      var obj = { fld1: arr[i][fld1], fld2: arr[i][fld2], type: type };
      newArr.push(obj);
    }
    //console.log(newArr);
    return newArr;
  }

  sendNotification(srv, action, message): void {
    if (action == "success") {
      const toast = srv.success(message, '', {
        timeOut: 2000,
        showProgressBar: true,
      });
    }
    if (action == "error") {
      const toast = srv.error(message, '', {
        timeOut: 2000,
        showProgressBar: true,
      });
    }
  }

  //add to favourite
  addFav(i, item): void {
    const that = this;
    var isChecked = (<HTMLInputElement>document.getElementById("chk_" + i)).checked;
    let itemId = i + '_' + item.type;

    if (isChecked) {//clicked
      //is already exist
      let isExist = that.providerDataService.isFavItemExists(itemId);
      if (isExist) {
        //activate notification
        this.sendNotification(that.notificationsService, "error", 'Item exists!');
      } else {
        //get comment and item
        var comment = (<HTMLInputElement>document.getElementById("comment_" + i)).value;
        var obj = { id: itemId, type: item.type, fld1: item.fld1, fld2: item.fld2, comment: comment };

        this.providerDataService.saveFavourite(obj);

        //activate notification
        this.sendNotification(that.notificationsService, "success", 'Item added!');
      }
    }
  }

  //get provider by provider name
  getProvider(providerName) {
    const that = this;
    this.isShowLoader = true;
    this.provObj = this.providerDataService.getSingleProvider(providerName);
    this.providerDataService.storeProvData(this.provObj);
    this.fld1Caption = this.provObj.fld1Caption;
    this.fld2Caption = this.provObj.fld2Caption;

    this.providerDataService.getData(this.provObj.apiUrl).subscribe(
      data => {
        //console.log(data);
        switch (providerName) {
          case "countries":
            this.apiData = that.mappingArray(data, that.provObj.fld1, that.provObj.fld2, that.provObj.type);
            break;
          case "movies":
            this.apiData = that.mappingArray(data["results"], that.provObj.fld1, that.provObj.fld2, that.provObj.type);
            break;
          case "music":
            this.apiData = that.mappingArray(data["topalbums"].album, that.provObj.fld1, that.provObj.fld2, that.provObj.type);
            break;
          case "books":
            this.apiData = that.mappingArray(data.works, that.provObj.fld1, that.provObj.fld2, that.provObj.type);
            break;
        }

        that.providerDataService.saveApiArr(this.apiData);
        //hide loader
        this.isShowLoader = false;
        //show tbl
        this.showTbl = true;
      },
      err => console.error(err)
    );
  }
}
