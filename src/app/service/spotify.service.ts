import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';

export type Track = {
  mbid: string
  artist: {
    "#text"?: string
    name?: string
  }
  image: {
    size: string
    "#text": string
  }[]
  album: {
    "#text": string
  }
  name: string
  url: string
  date: {
    uts: string
  }
  "@attr": {
    nowplaying?: string
    rank?: string
  }
  playcount?: string
}

type LastFmResponse = {
  recenttracks: {
    track: Track[]
  }
}

/**
 * All credits go to {@link https://github.com/itswilliboy/itswilli.vue/blob/master/server/api/spotify.ts}
 */
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {}

  BASE_URL = "https://198.186.130.147:2239/api";

  getRecentTracks(limit: number = 15): Observable<Track[]> {
    const clampedLimit = Math.max(1, Math.min(limit, 100));

    const url = `${this.BASE_URL}/lastfm/tracks?limit=${clampedLimit}`;

    return this.http.get<Track[]>(url).pipe(
      map(response => {
        return response;
      })
    );
  }


}
