import stickybits from 'stickybits'
import { Controller } from 'stimulus'

// data-controller="menu"
class StickyController extends Controller {

  connect() {
    console.debug('connected:', this.identifier)
    stickybits(this.element)
  }

}

application.register('sticky', StickyController)
