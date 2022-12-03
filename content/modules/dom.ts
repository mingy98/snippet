const styleNode = (node: Element, ...styles: string[]) => {
  const parentNode = node?.parentNode
  let clonedNode = node?.cloneNode(true) as any

  if (clonedNode !== undefined) {
    clonedNode.innerHTML = `<span class="${styles.join(" ")}">${node.innerHTML}</span>`
    parentNode?.replaceChild(clonedNode, node)
  }
}

export { styleNode }
