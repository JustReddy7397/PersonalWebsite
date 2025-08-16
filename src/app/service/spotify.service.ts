import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { environment} from '../../environments/environment';

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

  BASE_URL = 'http://ws.audioscrobbler.com/2.0';

  getRecentTracks(limit: number = 15): Observable<Track[]> {
    const clampedLimit = Math.max(1, Math.min(limit, 100));

    const url = `${this.BASE_URL}/?method=user.getrecenttracks&user=${environment.lastFmUser}&api_key=${environment.lastFmApiKey}&format=json&limit=${clampedLimit}`;

    return this.http.get<LastFmResponse>(url).pipe(
      map(response => {
        const tracks = response.recenttracks.track;

        // Handle current playing track
        const maybeCurrent = tracks[0];
        const isCurrent = Boolean(maybeCurrent?.["@attr"]?.nowplaying);
        if (isCurrent) {
          maybeCurrent.date = { uts: "0" };
        }

        return tracks.slice(0, clampedLimit);
      })
    );
  }


}
