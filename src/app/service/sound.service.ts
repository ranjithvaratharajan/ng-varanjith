import { Injectable, OnInit, Renderer2, RendererFactory2 } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  wind: any
  revWind: any
  tick: any
  private renderer?: Renderer2
  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null)
    this.wind = this.renderer?.createElement('audio')
    this.renderer?.setAttribute(this.wind, 'src', 'assets/audio/wind.mp3')

    this.revWind = this.renderer?.createElement('audio')
    this.renderer?.setAttribute(
      this.revWind,
      'src',
      'assets/audio/wind-reverse.mp3'
    )

    this.tick = this.renderer?.createElement('audio')
    this.renderer?.setAttribute(this.tick, 'src', 'assets/audio/tick.mp3')
  }
}
