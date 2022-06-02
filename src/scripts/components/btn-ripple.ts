import $ from 'jquery'

$.when($.ready).then(() => {
  const className = '.btn--ripple'
  const duration = 600
  $('body').on('click', className, function (e) {
    const btn = $(this)
    const rect = this.getBoundingClientRect()
    const circle = $('<div class="ripple" />')
    const radius = Math.max(rect.width, rect.height)
    circle.css({
      top: e.clientY - rect.top - (radius / 2) + 'px',
      left: e.clientX - rect.left - (radius / 2) + 'px',
      animation: `ripple ${duration}ms linear`
    }).width(radius).height(radius)
    btn.append(circle)
    setTimeout(() => {
      circle.remove()
    }, duration)
  })
})
