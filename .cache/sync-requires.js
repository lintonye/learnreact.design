// prefer default export if available
const preferDefault = m => m && m.default || m


exports.layouts = {
  "layout---index": preferDefault(require("/Users/lintonye/git-repos/learnreact.design/.cache/layouts/index.js"))
}

exports.components = {
  "component---cache-dev-404-page-js": preferDefault(require("/Users/lintonye/git-repos/learnreact.design/.cache/dev-404-page.js")),
  "component---src-templates-blog-post-js": preferDefault(require("/Users/lintonye/git-repos/learnreact.design/src/templates/blog-post.js"))
}

exports.json = {
  "dev-404-page.json": require("/Users/lintonye/git-repos/learnreact.design/.cache/json/dev-404-page.json"),
  "layout-index.json": require("/Users/lintonye/git-repos/learnreact.design/.cache/json/layout-index.json"),
  "2017-05-09-react-course-for-designers-anyone.json": require("/Users/lintonye/git-repos/learnreact.design/.cache/json/2017-05-09-react-course-for-designers-anyone.json"),
  "layout-index.json": require("/Users/lintonye/git-repos/learnreact.design/.cache/json/layout-index.json"),
  "2017-06-08-what-is-react.json": require("/Users/lintonye/git-repos/learnreact.design/.cache/json/2017-06-08-what-is-react.json"),
  "layout-index.json": require("/Users/lintonye/git-repos/learnreact.design/.cache/json/layout-index.json"),
  "2017-06-20-what-is-react-native.json": require("/Users/lintonye/git-repos/learnreact.design/.cache/json/2017-06-20-what-is-react-native.json"),
  "layout-index.json": require("/Users/lintonye/git-repos/learnreact.design/.cache/json/layout-index.json"),
  "2017-08-16-components-props-and-state.json": require("/Users/lintonye/git-repos/learnreact.design/.cache/json/2017-08-16-components-props-and-state.json"),
  "layout-index.json": require("/Users/lintonye/git-repos/learnreact.design/.cache/json/layout-index.json"),
  "2018-01-02-react-sketch-app-backstory-and-full-vision.json": require("/Users/lintonye/git-repos/learnreact.design/.cache/json/2018-01-02-react-sketch-app-backstory-and-full-vision.json")
}