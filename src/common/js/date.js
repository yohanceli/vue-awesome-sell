export function formatDate(date, fmt) {
  let dateObj = new Date(date)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (dateObj.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': dateObj.getMonth() + 1,
    'd+': dateObj.getDay(),
    'h+': dateObj.getHours(),
    'm+': dateObj.getMinutes(),
    's+': dateObj.getSeconds()
  }

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }

  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
