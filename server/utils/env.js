import os from 'os'

const isDevelopment = process.env.DEVELOPMENT === '1' || process.env.NODE_ENV === 'development'

/**
 * 本机 IP 地址
 * @returns {*}
 */
const getLocalIp = () => {
    let ip
    for (let i = 0; i < os.networkInterfaces().en0.length; i++) {
        if (os.networkInterfaces().en0[ i ].family === 'IPv4') {
            ip = os.networkInterfaces().en0[ i ].address
        }
    }
    return ip
}

export {
  isDevelopment,
  getLocalIp,
}