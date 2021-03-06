import * as Turbo from '@hotwired/turbo'
window.Turbo = Turbo

document.addEventListener('turbo:before-fetch-request', event => {
  let xhr = event.detail.fetchOptions
  xhr.headers['Utc-Offset'] = (new Date).getTimezoneOffset()
  //xhr.headers['X-Csp-Nonce'] = Rails.cspNonce()
})

document.addEventListener('turbo:before-cache', event => {
  let modal = document.getElementById('modal')
  if (modal) {
    modal.removeAttribute('src')
  }
})

Object.defineProperties(customElements.get('turbo-stream').prototype, {
  targetElement: {
    get: function() {
      if (this.target === 'body') {
        return this.ownerDocument.body
      } else if (this.target) {
        return this.ownerDocument.getElementById(this.target)
      }
      this.raise('target attribute is missing')
    }
  }
})
