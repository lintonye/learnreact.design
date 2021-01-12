import { JsxNode } from '@/types'

// tagName: group 1, attrs: group 2, selfClosed?: group 6
const startTagRegex = /^\s*<(\w+)((\s+\w+\s*=\s*("|')([^"]*)\4)*)\s*(\/)?>\s*/m
// attrName: group 1, attrValue: group 3
const attrRegex = /(\w+)\s*=\s*("|')([^"]*)\2/gm
// tagName: group 1
const endTagRegex = /^<\/(\w+)\s*>\s*/m
// content: group 1
const textContentRegex = /^\s*([^<]*)/m

function addChild(parent: JsxNode, child: JsxNode) {
  if (Array.isArray(parent.children)) parent.children.push(child)
  else parent.children = [child]
}

function matchFirstChar(match: RegExpMatchArray | null) {
  return Boolean(match && match.index === 0)
}

/*
-
  - type: 'div'
  - attrs:
    - [name]: value
  - children:
    - 'some string'
    - type: 'SearchBar'
    ...
*/
export function parseJsx(code: string) {
  let root: JsxNode
  const nodeStack: JsxNode[] = []
  let c = code
  while (c.length > 0) {
    // start tag
    const matchStart = c.match(startTagRegex)
    // console.log({ matchStart })

    if (matchStart && matchFirstChar(matchStart)) {
      let parent = nodeStack[nodeStack.length - 1]
      const node: JsxNode = { type: matchStart[1] }
      if (!parent) root = node
      else {
        addChild(parent, node)
      }
      // attrs
      if (matchStart[2]) {
        const attrMatches = matchStart[2].matchAll(attrRegex)
        node.attrs = Array.from(attrMatches).reduce<{ [n: string]: string }>(
          (result, m) => {
            result[m[1]] = m[3]
            return result
          },
          {},
        )
      }
      if (matchStart[6] !== '/') nodeStack.push(node)
      c = c.slice(matchStart[0].length)
      continue
    }
    // end tag
    const matchEnd = c.match(endTagRegex)
    // console.log({ matchEnd })
    if (matchEnd && matchFirstChar(matchEnd)) {
      const tag = matchEnd[1]
      const n = nodeStack.pop()
      if (n === undefined || typeof n === 'string') {
        throw `No matching start tag for ${tag}`
      }
      if (n.type !== tag) {
        throw `Mismatching start and end tags: "${n.type}" and "${tag}"`
      }
      c = c.slice(matchEnd[0].length)
      continue
    }
    // text content
    const matchText = c.match(textContentRegex)
    // console.log({ matchText })
    if (matchText && matchFirstChar(matchText) && matchText[0].length > 0) {
      const text = matchText[1].trim() // TODO maybe should update regex for this
      if (!root) root = text
      else addChild(nodeStack[nodeStack.length - 1], text)
      c = c.slice(matchText[0].length)
      continue
    }
    throw `Invalid content: ${c}`
  }
  return root
}
