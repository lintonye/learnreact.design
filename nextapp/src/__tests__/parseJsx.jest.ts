import { parseJsx } from '../lib/parseJsx'

console.log = (s) => {
  process.stdout.write(s + '\n')
}

describe('parseHtml', () => {
  it('should parse simple empty tag', () => {
    const tree = parseJsx('<div/>')
    expect(tree).toEqual({ type: 'div' })
  })
  it('should parse empty tag with attrs', () => {
    const tree = parseJsx('<div id="hello" className="p-3"/>')
    expect(tree).toEqual({
      type: 'div',
      attrs: { id: 'hello', className: 'p-3' },
    })
  })
  it('should parse embedded tags', () => {
    const tree = parseJsx('<div><img /><br /></div>')
    expect(tree).toEqual({
      type: 'div',
      children: [{ type: 'img' }, { type: 'br' }],
    })
  })
  it('should parse text content in a tag', () => {
    const tree = parseJsx('<div>abc</div>')
    expect(tree).toEqual({
      type: 'div',
      children: ['abc'],
    })
  })
  it('should ignore white spaces', () => {
    const tree = parseJsx('    <div id="hello"     className="p-3"/>')
    expect(tree).toEqual({
      type: 'div',
      attrs: { id: 'hello', className: 'p-3' },
    })
  })
  it('should ignore white spaces in embedded tags', () => {
    const tree = parseJsx(`<div>
      <img />
      <br />
    </div>
    
    `)
    expect(tree).toEqual({
      type: 'div',
      children: [{ type: 'img' }, { type: 'br' }],
    })
  })

  it('should parse a simple string', () => {
    expect(parseJsx('  abc ddegeeg   ')).toEqual('abc ddegeeg')
  })

  it('should throw error when tag is not closed', () => {
    expect(() => parseJsx(`<div`)).toThrow(/Invalid content:.+/)
  })

  it('should throw error when embedded tag is not closed', () => {
    expect(() => parseJsx(`<div><div</div>`)).toThrow(/Invalid content:.+/)
  })
  it('should throw error for invalid end tag', () => {
    expect(() => parseJsx('</div')).toThrow(/Invalid content:.+/)
  })
  it('should throw error for mismatched tags', () => {
    expect(() => parseJsx('<div><a></b></div>')).toThrow(
      /Mismatching start and end tags:.+/,
    )
  })
})
