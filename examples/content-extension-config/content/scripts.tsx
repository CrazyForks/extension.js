import ReactDOM from 'react-dom/client'
import ContentApp from './ContentApp'
import './styles.css?inline_style'

if (document.readyState === 'complete') {
  initial()
} else {
  document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') initial()
  })
}

function initial() {
  // Create a new div element and append it to the document's body
  const rootDiv = document.createElement('div')
  rootDiv.id = 'extension-root'
  document.body.appendChild(rootDiv)

  // Injecting content_scripts inside a shadow dom
  // prevents conflicts with the host page's styles.
  // This way, styles from the extension won't leak into the host page.
  const shadowRoot = rootDiv.attachShadow({mode: 'open'})

  // Inform Extension.js that the shadow root is available.
  window.__EXTENSION_SHADOW_ROOT__ = shadowRoot

  const shadowStyle = document.createElement('style')
  shadowStyle.textContent = `
      :host {
        all: initial; /* Reset all styles */
      }
    `
  shadowRoot.appendChild(shadowStyle)

  const root = ReactDOM.createRoot(shadowRoot)
  root.render(
    <div className="content_script">
      <ContentApp />
    </div>
  )
}
