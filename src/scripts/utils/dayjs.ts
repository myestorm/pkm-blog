import _dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh'

_dayjs.extend(relativeTime)
_dayjs.locale('zh')

export const dayjs = _dayjs
export const formatDatetime = (datetime: number | Date) => {
  return dayjs(datetime).format('YYYY-MM-DD HH:mm:ss')
}
export const formatDate = (datetime: number | Date) => {
  return dayjs(datetime).format('YYYY-MM-DD')
}
export const timeAgo = (datetime: number | Date) => {
  const n = dayjs()
  const t = dayjs(datetime)
  return n.to(t)
}
