import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-box-weather',
  templateUrl: './box-weather.component.html',
  styleUrls: ['./box-weather.component.css']
})
export class BoxWeatherComponent implements OnInit {
	public dataWeather;
  constructor( private http: HttpClient) { }

  ngOnInit() {
  	this.getWeatherData();
  }

  getWeatherData(){
  	return this.http.get(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22hanoi%2C%20vn%22)%20%20and%20u%3D'c'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`)
  	.subscribe(
  		data=>{this.dataWeather = data['query'].results.channel;
      console.log(this.dataWeather);
    },
  		error=>{console.log(error)}
  		);
  }
}
