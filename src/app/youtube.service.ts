import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private apiKey = 'AIzaSyCWbJbrrLeB_s0Wn0Zwu2ClmJY3bWAH8us';

  constructor(private http: HttpClient) { }

  getVideoFromChannel(channel: string, maxResults): Observable<any[]> {
    const url = 'https://www.googleapis.com/youtube/v3/search?key='
      + this.apiKey + '&channelId=' + channel + '&order=date&part=snippet &type=video,id&maxResults=' + maxResults;

    /*return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }));*/



    return this.http.get<UsuarioYT>(url)
      .pipe(map((res: UsuarioYT) => {
        return res.items;
      }));
  }
}

interface UsuarioYT {
  items: any[];
}
