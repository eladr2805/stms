import { Component, OnInit } from '@angular/core';
import { ProviderDataService } from '../provider-data.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favArr:any;
  constructor(private providerDataService: ProviderDataService,private notificationsService :NotificationsService) { }

  ngOnInit() {
    this.favArr = this.providerDataService.getFavorites();
  }

  delFav(i,item):void{
    if (window.confirm("Do you really want to delete?")) { 
      this.providerDataService.delFavourite(item.id);

      const toast = this.notificationsService.success('Item deleted!', '', {
        timeOut: 2000,
        showProgressBar: true,
      });
    }
  }

}
