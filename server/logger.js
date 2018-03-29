import winston from 'winston'

const colors = {
  emerg  : 'red',
  alert  : 'red',
  crit   : 'red',
  error  : 'red',
  warning: 'yellow',
  notice : 'blue',
  info   : 'green',
  debug  : 'gray'
}

winston.addColors(colors)

const logger = winston.createLogger({
  level     : process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format    : winston.format.simple(),
  transports: [new winston.transports.Console()]
})


export default logger