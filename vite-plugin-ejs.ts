import { relative, extname, dirname, resolve } from 'path'
import ejs from 'ejs'
import { Plugin } from 'vite'

interface IOptionType<T> {
  data?: T
}

export default function ejsPlugin<T> (option: IOptionType<T> = {}): Plugin {
  let config

  const pageData = option.data || {}
  const regExp = /\<\%\-(.*?)include\(\'(.*?)\'(.*?)\)(.*?)\%\>/gmi
  const includeRelationMap = new Map<string, string[]>()
  const myExtnames = ['.html', '.svg']

  return {
    name: 'vite-plugin-ejs',
    configResolved(resolvedConfig) {
      config = resolvedConfig
    },
    handleHotUpdate (ctx) {
      const { file, server } = ctx
      if (!myExtnames.includes(extname(file))) {
        return
      }
      const relationIds = (includeRelationMap.get(file) || []) as string[]
      server.ws.send({
        type: 'custom',
        event: 'ejs-include-update',
        data: [...relationIds]
      })
    },
    transformIndexHtml: {
      enforce: 'pre',
      transform (html, ctx) {
        const filename = ctx.filename
        if (extname(filename) === '.html') {
          const list = html.match(regExp)
          list?.map(item => {
            // 找到include文件的绝对路径
            const fileRelativePath = item.replace(regExp, '$2')
            const fileDir = dirname(filename)

            let filePath = resolve(fileDir, fileRelativePath)
            filePath = filePath.replace(/\\/g, '/')

            const values = includeRelationMap.get(filePath) || []

            let relationFilename = relative(process.cwd(), filename)
            relationFilename = '/' + relationFilename.replace(/\\/g, '/')

            const index = values.findIndex(item => item === relationFilename)
            if (index === -1) {
              values.push(relationFilename)
            }
            includeRelationMap.set(filePath, [...values])
          })
        }

        let template = ejs.render(html, pageData, {
          filename: relative(process.cwd(), filename)
        })

        // 注入热更新事件
        if (config.command === 'serve') {
          template += `<script type="module">
            if (import.meta.hot) {
              import.meta.hot.on('ejs-include-update', (data) => {
                const pagePath = decodeURI(location.pathname)
                for (const payloadPath of data) {
                  if (pagePath === payloadPath || (pagePath.endsWith('/') && pagePath + 'index.html' === payloadPath)) {
                    location.reload()
                    break
                  }
                }
              })
            }
          </script>`
        }
        return template
      }
    }
  }
}
