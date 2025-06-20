import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private sounds: Record<string, HTMLAudioElement> = {
    wind: new Audio('assets/audio/wind.mp3'),
    revWind: new Audio('assets/audio/wind-reverse.mp3'),
    tick: new Audio('assets/audio/tick.mp3'),
  };

  constructor() {
    // Preload audio files
    Object.values(this.sounds).forEach((sound) => sound.load());
  }

  play(sound: 'wind' | 'revWind' | 'tick'): void {
    const audio = this.sounds[sound];
    audio.currentTime = 0; // Reset to start
    audio.play().catch((error) => console.error(`Error playing ${sound}:`, error));
  }
}
