import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { environment } from '../environments/environment';

@Injectable() export class ProviderDataService {
  constructor(private http: HttpClient) { }
  favArr:any = [];
  apiArr:any = [];
  providerObj : any;

  providerStore: any = [
    { type: "movies", fld1 : "title",fld2: "release_date",fld1Caption: "Movie title", fld2Caption: "Release date", apiUrl: "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ec59c58c9a2b672256f3bcdf97eccbeb" },
    { type: "music", fld1 : "name",fld2: "playcount",fld1Caption: "Album", fld2Caption: "Play count", apiUrl: "http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=elthon&api_key=1cc861736880df9008862f3f825e7717&format=json" },
    { type: "countries", fld1 : "name",fld2: "capital",fld1Caption: "Country", fld2Caption: "Capital",apiUrl: "https://restcountries.eu/rest/v2/region/europe" },
    { type:"books",fld1 : "title",fld2:"edition_count",fld1Caption:"book title",fld2Caption:"edition_count",apiUrl:"http://openlibrary.org/subjects/love.json?published_in=1500-1650"}
  ]

  getData(url) :any{
    //get providername data
    let apiUrl = url;
    return this.http.get(apiUrl);
  }

  getSingleProvider(providerName) :any[]{
    for (var i = 0; i < this.providerStore.length; i++) {
      if (this.providerStore[i].type === providerName) {
        return this.providerStore[i];
      }
    }
  }

  isFavItemExists(id) : boolean{
    let ret = false;
    for(var i = 0; i < this.favArr.length; i++) {
      var obj = this.favArr[i];
      if(obj.id === id){
        return true;
      }
    }
    return ret;
  }

  storeProvData(provObj){
    this.providerObj = provObj;
  }

  getProvData(){
    return this.providerObj;
  }

  saveFavourite(item) :void{
    this.favArr.push(item);
  }

  delFavourite(idx):void{
    for(var i = 0; i < this.favArr.length; i++) {
      var obj = this.favArr[i];
      if(obj.id == idx){
        this.favArr.splice(i, 1);
      }
    }
  }

  getFavorites():any[] {
      return this.favArr;
  }

  saveApiArr(arr):void{
    this.apiArr = arr;
  }

  getApiData():any[]{
    return this.apiArr;
  }
}
