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
  const dirName = path.basename(filePath).replace(path.extname(filePath), '')
  const dirPath = path.join(tipsRoot, dirName)
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath)
  const imageImports = new Set()

  // move thumbnail and video; add imports
  const migrateThumbnail = (filename, varName) => {
    const newThumbnail = path.join(dirName, filename)
    frontMatterRest[varName] = varName
    const oldThumbnailPath = path.join(tipsRoot, 'media', filename)
    const newThumbnailPath = path.join(tipsRoot, newThumbnail)
    if (fs.existsSync(oldThumbnailPath) && !fs.existsSync(newThumbnailPath))
      fs.renameSync(oldThumbnailPath, newThumbnailPath)
    imageImports.add(`import ${varName} from "${newThumbnail}"`)
  }
  const { thumbnail, video, ...frontMatterRest } = frontMatter
  if (thumbnail) migrateThumbnail(thumbnail, 'thumbnailImage')
  if (video) migrateThumbnail(video, 'thumbnailVideo')

  const meta =
    frontMatter.title &&
    `export const meta = ${JSON.stringify(frontMatterRest, null, 2)}`.replace(
      /"(thumbnail(Image|Video))": "\1"/g,
      '$1',
    )

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
              `import { TipLayout } from "@/components/TipLayout"\n\n` +
              (meta ? meta + '\n\n' : '') +
              `export default TipLayout\n\n` +
              newContent.join('\n')
            const newFilePath = path.join(tipsRoot, dirName, 'index.mdx')
            fs.writeFile(newFilePath, newFileContent, () => {
              console.log(newFilePath)
              fs.unlinkSync(filePath)
            })
          }
        })
    })
    .catch((e) => console.error(e))
}

const tipsRoot = 'src/pages/tips'

function processAllFiles(dirPath) {
  fs.readdirSync(dirPath).forEach(function (file) {
    let filepath = path.join(dirPath, file)
    let stat = fs.statSync(filepath)
    if (stat.isDirectory()) {
      processAllFiles(filepath)
    } else {
      // console.info(filepath + '\n')
      if (path.extname(filepath) === '.md') {
        processFile(filepath)
      }
    }
  })
}

processAllFiles(tipsRoot)

// processFile(`${postRoot}/what-is-react-native/index.mdx`)
