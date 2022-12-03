import React from "react"
import Comment from "./components/comment"
import { injectReact } from "./modules/inject"

import "./index.css"

injectReact(
  <React.StrictMode>
    <Comment />
  </React.StrictMode>
)
