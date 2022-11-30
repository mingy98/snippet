import { createRoot } from "react-dom/client"

const injectReact = (component: JSX.Element) => {
  const body = document.querySelector("body")
  const app = document.createElement("div")
  const id = "snippet-root"

  app.id = id
  if (body) body.prepend(app)

  const container = document.getElementById(id)
  const root = createRoot(container!)
  root.render(component)
}

export { injectReact }
