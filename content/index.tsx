import React from "react"
import Root from "./components"
import { injectReact } from "./modules/inject"

import "./index.css"

injectReact(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
