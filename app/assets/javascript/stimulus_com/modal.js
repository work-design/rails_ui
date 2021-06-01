import { Controller } from 'stimulus'

// data-controller="modal"
class ModalController extends Controller {
  static values = {
    urls: Array
  }

  connect() {
    console.debug(this.identifier, 'connected!')
    console.debug('modal refer:', document.referrer)
    this.observer = new MutationObserver(this.loaded)
    this.observer.observe(this.modal, { childList: true })
  }

  close() {
    this.element.classList.remove('is-active')
    document.documentElement.classList.remove('is-clipped')
    this.urlsValue = this.urlsValue.slice(0, this.urlsValue.length - 1)
    let url = this.urlsValue.pop()
    if (url) {
      this.urlsValue = this.urlsValue.slice(0, this.urlsValue.length - 1)
      this.modal.src = url
    } else {
      this.modal.removeAttribute('src')
    }
  }

  disconnect() {
    console.debug(this.identifier, 'disconnected!')
    this.observer.disconnect()
    delete this.observer
  }

  // NOTICE: here this becomes observer
  loaded(list, observer) {
    let item = list[0]
    let ele = item.target.parentNode.parentNode
    let con = application.getControllerForElementAndIdentifier(ele, 'modal')
window.xxx = con
    console.log(con.urlsValue)
    switch(item.type) {
      case 'childList':
        if (typeof item.target.src === 'undefined' || item.target.src === null) {
          break
        }
        ele.classList.add('is-active')
        con.urlsValue = con.urlsValue.concat(item.target.src)
    }
  }

  get modal() {
    return document.getElementById('modal')
  }

}

application.register('modal', ModalController)
