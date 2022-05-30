import $ from 'jquery'

$.when($.ready).then(() => {
  const duration = 300
  const attr = 'role="t-dailog"'
  $('body').on('click', `[${attr}]`, function () {
    const eleAttr = $(this).attr('role-ele') as string
    const ele = $(eleAttr)
    const content = ele.find('.dailog-content')
    content.css({
      opacity: 0,
      transform: 'scale(0)',
      transition: `all ${duration}ms ease`
    })
    ele.addClass('show')
    setTimeout(() => {
      content.css({
        opacity: 1,
        transform: 'scale(1)'
      })
      const inputAutofocus = ele.find('[autofocus]').eq(0)
      if (inputAutofocus[0]) {
        inputAutofocus.trigger('focus')
      }
    }, 0)
  })

  $('body').on('click', '.dailog-hide-button', function () {
    const ele = $(this).closest('.dailog-mask')
    const content = ele.find('.dailog-content')
    content.css({
      opacity: 0,
      transform: 'scale(0)',
    })
    setTimeout(() => {
      ele.removeClass('show')
    }, 200)
  })

  $('body').on('click', '.dailog-mask', function (event) {
    if ($(event.target).hasClass('dailog-mask')) {
      const ele = $(this).closest('.dailog-mask')
      const content = ele.find('.dailog-content')
      content.css({
        opacity: 0,
        transform: 'scale(0)',
      })
      setTimeout(() => {
        ele.removeClass('show')
      }, 120)
    }
  })
})
