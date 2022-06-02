import '@/scss/document.scss'
import '@/scripts/vendor'

import $ from 'jquery'

const readRowHtml = (html: string) => {
  const res: string[] = []
  const arr = html.split(/\n|\r/)
  arr.forEach(item => {
    const text = item.trim()
    if (text) {
      res.push(text)
    }
  })
  return res
}

$.when( $.ready ).then(() => {
  const items = $('.item')
  $.each(items, function () {
    const demo = $(this).find('.demo')
    const code = $(this).find('.code')
    const html = demo.html()
    const rows = readRowHtml(html)
    code.attr('rows', rows.length > 6 ? 6 : rows.length).val(rows.join('\n'))
  })
})
