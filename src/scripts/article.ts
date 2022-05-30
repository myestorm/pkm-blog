import '@/scripts/vendor'
import '@/scss/blocks/github-markdown.scss'
import '@/scss/blocks/article-nav.scss'
import '@/scss/article.scss'

import Prism from 'prismjs'

import $ from 'jquery'

import { createApp } from 'vue'
import Discuss from '@/components/discuss/index.vue'

$.when( $.ready ).then(() => {
  Prism.highlightAll()

  const siteHeader = $('#site-header')
  const siteHeaderHeight = siteHeader.outerHeight() || 0

  const main = $('#main')
  const mainOffset = main.offset()
  const spaceWidth = 32
  let top = mainOffset?.top || 0
  let left = mainOffset?.left || 0

  const articleNav = $('#article-nav')
  const articleNavWidth = 150
  const articleNavStyle = {
    width: `${articleNavWidth}px`,
    top: 0,
    left: `${(articleNavWidth + spaceWidth) * -1}px`,
    position: 'absolute'
  }

  const articleHgroups = $('#article-hgroups')
  const articleHgroupsWidth = 150
  const articleHgroupsStyle = {
    width: `${articleHgroupsWidth}px`,
    height: `calc(100vh - ${siteHeaderHeight + 20}px)`,
    top: 0,
    right: `${(articleHgroupsWidth + spaceWidth) * -1}px`,
    position: 'absolute'
  }
  
  let isShow = false

  if (left >= articleNavWidth ) {
    articleNav.css(articleNavStyle).show()
    articleHgroups.css(articleHgroupsStyle).show()
    isShow = true
  }

  const hgroups = main.find('.markdown-body').find('h1, h2, h3, h4, h5, h6')
  const navItems = articleHgroups.find('li a')
  navItems.on('click', function (event: JQuery.Event) {
    event.preventDefault()
    const index = navItems.index(this)
    const top = hgroups.eq(index).offset()?.top || 0
    $(this).parent('li').addClass('current').siblings().removeClass('current')
    $('html, body').animate({ scrollTop: top - 80 }, 260);
  })
  const scrollSetIndex = (scrollTop: number) => {
    let idx = 0
    let offsetTop = 0
    $.each(hgroups, function (index) {
      const top = $(this).offset()?.top || 0
      const _offsetTop = Math.abs(top - scrollTop)
      if (_offsetTop < offsetTop) {
        idx = index
      }
      offsetTop = _offsetTop
    })
    navItems.eq(idx).parent('li').addClass('current').siblings().removeClass('current')
  }

  $(document).on('scroll', function () {
    if (!isShow) {
      return false
    }

    const scrollTop = $(this).scrollTop() || 0
    scrollSetIndex(scrollTop)
    if (scrollTop > top) {
      articleNav.css({
        width: `${articleNavWidth}px`,
        top: `${siteHeaderHeight + 20 }px`,
        left: `${left - articleNavWidth - spaceWidth}px`,
        position: 'fixed'
      })
      articleHgroups.css({
        width: `${articleHgroupsWidth}px`,
        height: `calc(100vh - ${siteHeaderHeight + 20}px)`,
        top: `${siteHeaderHeight + 20 }px`,
        right: `${left - articleHgroupsWidth - spaceWidth}px`,
        position: 'fixed'
      })
    } else {
      articleNav.css(articleNavStyle)
      articleHgroups.css(articleHgroupsStyle)
    }
  })
  $(window).on('resize', function () {
    const offset = main.offset()
    top = offset?.top || 0
    left = offset?.left || 0

    if (left >= articleNavWidth + spaceWidth) {
      articleNav.show()
      articleHgroups.show()
      isShow = true
    } else {
      articleNav.hide()
      articleHgroups.hide()
      isShow = false
    }
  })

  const discuss = createApp(Discuss)
  discuss.mount('#totonoo-discuss')
})
