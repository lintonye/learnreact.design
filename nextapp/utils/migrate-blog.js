const matter = require('gray-matter')
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const { Readable } = require('stream')
const camelCase = require('camelcase')
const sharp = require('sharp')

function fn2var(filename) {
  return `img${camelCase(filename, { pascalCase: true })}`
}

async function measureImage(imagePath) {
  const image = sharp(imagePath)
  const { width, height } = await image.metadata()
  console.log({ imagePath, width, height })
  return { imagePath, width, height }
}

function getAllImageInfo(basePath, readInterface) {
  return new Promise((resolve, reject) => {
    const metadataPromises = []
    const imagePattern = /^!\[(.*)\]\((.*)\)/
    readInterface
      .on('line', (line) => {
        const matchImg = line.match(imagePattern)
        if (matchImg) {
          const imgPath = matchImg[2]
          const imgFullPath = `${basePath}/${imgPath}`
          metadataPromises.push(measureImage(imgFullPath))
        }
      })
      .on('close', () => {
        // resolve(imageInfos)
        Promise.all(metadataPromises).then((mds) => {
          const infos = new Map()
          mds.forEach((md) =>
            infos.set(md.imagePath, { width: md.width, height: md.height }),
          )
          resolve(infos)
        })
      })
  })
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
  getAllImageInfo(path.dirname(filePath), readInterface)
    .then((imageInfos) => {
      // console.log(imageInfos)
      const readInterface = readline.createInterface({
        input: Readable.from(content),
      })
      readInterface
        .on('line', (line) => {
          const imagePattern = /^!\[(.*)\]\((.*)\)/
          const headingPattern = /^(#+)(\s+.+)$/
          const toDeletePatterns = [/^<a\s+name=".+">\s*<\/a>/]
          const matchImg = line.match(imagePattern)
          const matchHeading = line.match(headingPattern)
          if (matchImg) {
            const imgAlt = matchImg[1]
            const imgPath = matchImg[2]
            const imgVar = fn2var(path.basename(imgPath))
            const { width, height } = imageInfos.get(
              path.dirname(filePath) + '/' + imgPath,
            )
            imageImports.add(`import ${imgVar} from "${imgPath}"`)
            newContent.push(
              `<img src={${imgVar}} alt={\`${imgAlt}\`} width={${width}} height={${height}} />`,
            )
          } else if (matchHeading) {
            newContent.push(`#${matchHeading[1]}${matchHeading[2]}`)
          } else if (!toDeletePatterns.some((p) => line.match(p))) {
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
              `<!--excerpt-->\n${
                frontMatter.excerpt || ''
              }\n<!--/excerpt-->\n` +
              newContent.join('\n')
            fs.writeFile(filePath, newFileContent, () => console.log(filePath))
          }
        })
    })
    .catch((e) => console.error(e))
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
