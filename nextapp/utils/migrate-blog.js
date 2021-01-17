const matter = require('gray-matter')
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const { Readable } = require('stream')
const camelCase = require('camelcase')

function fn2var(filename) {
  return `img${camelCase(filename, { pascalCase: true })}`
}

function processFile(filePath) {
  const { content, data: frontMatter } = matter.read(filePath)
  const readInterface = readline.createInterface({
    input: Readable.from(content),
  })
  const meta =
    frontMatter.title &&
    `export const meta = ${JSON.stringify(frontMatter, null, 2)}`
  const imageImports = new Set()
  const newContent = []
  readInterface
    .on('line', (line) => {
      const imagePattern = /^!\[(.*)\]\((.*)\)/
      const headingPattern = /^(#+)(\s+.+)$/
      const matchImg = line.match(imagePattern)
      const matchHeading = line.match(headingPattern)
      if (matchImg) {
        const imgAlt = matchImg[1]
        const imgPath = matchImg[2]
        const imgVar = fn2var(path.basename(imgPath))
        imageImports.add(`import ${imgVar} from "${imgPath}"`)
        newContent.push(`<img src={${imgVar}} alt={\`${imgAlt}\`} />`)
      } else if (matchHeading) {
        newContent.push(`#${matchHeading[1]}${matchHeading[2]}`)
      } else {
        newContent.push(line)
      }
    })
    .on('close', () => {
      if (meta || imageImports.size > 0) {
        const newFileContent =
          (imageImports.size > 0
            ? Array.from(imageImports).join('\n') + '\n\n'
            : '') +
          (meta ? meta + '\n\n' : '') +
          `<!--excerpt-->\n${frontMatter.excerpt || ''}\n<!--/excerpt-->\n` +
          newContent.join('\n')
        fs.writeFile(filePath, newFileContent, () => console.log(filePath))
      }
    })
}

const postRoot = 'src/pages/posts'

function processAllFiles(dirPath) {
  fs.readdirSync(dirPath).forEach(function (file) {
    let filepath = path.join(dirPath, file)
    let stat = fs.statSync(filepath)
    if (stat.isDirectory()) {
      processAllFiles(filepath)
    } else {
      // console.info(filepath + '\n')
      if (path.extname(filepath) === '.mdx') {
        processFile(filepath)
      }
    }
  })
}

processAllFiles(postRoot)

// processFile(`${postRoot}/what-is-react-native/index.mdx`)
