import { Controller } from 'stimulus'

// data-controller="visit"
class VisitController extends Controller {
  static values = { url: String }

  connect() {
    console.debug('Common Controller works!')

    if (this.hasUrlValue) {
      Turbo.visit(this.urlValue, { action: 'replace' })
    } else {
      Turbo.visit(location.href, { action: 'replace' })
    }

    Turbo.clearCache()
    document.documentElement.classList.remove('is-clipped')


    this.element.remove()
  }

}

application.register('visit', VisitController)
