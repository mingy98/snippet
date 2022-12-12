const styleNode = (node: Element, ...styles: string[]) => {
  const parentNode = node?.parentNode
  let clonedNode = node?.cloneNode(true) as any

  if (clonedNode !== undefined) {
    clonedNode.innerHTML = `<span class="${styles.join(" ")}">${node.innerHTML}</span>`
    parentNode?.replaceChild(clonedNode, node)
  }
}

const createXpath = (node: Element) => {
  const textContent = node.textContent ?? ""
  const quoteIndicies = [
    ...textContent.matchAll(new RegExp(`'|"`, "gi")),
  ].map((a) => a.index)
  let splitContent: string[] = []
  let lastIdx = 0

  const format = (quote: string, startIdx: number, endIdx: number) =>
    `contains(., ${quote}${textContent.slice(
      startIdx,
      endIdx + 1
    )}${quote})`

  quoteIndicies.forEach((quoteIdx, index) => {
    if (quoteIdx !== undefined) {
      let quote = textContent[quoteIdx] === "'" ? `\"` : `\'`
      splitContent.push(format(quote, lastIdx, quoteIdx))
      lastIdx = quoteIdx + 1

      if (index === quoteIndicies.length - 1) {
        splitContent.push(format(quote, lastIdx, textContent.length))
      }
    }
  })

  if(splitContent.length === 0) splitContent.push(format(`\"`, 0, textContent.length))

  return `//${node.nodeName.toLowerCase()}[${splitContent.join(
    " and "
  )}]`
}

export { styleNode, createXpath }
