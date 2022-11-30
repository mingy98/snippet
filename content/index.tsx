import React from "react"
import App from "./components/App"
import { injectReact } from "./modules/inject"

injectReact(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
