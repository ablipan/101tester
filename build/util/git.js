import jetpack from 'fs-jetpack'
import {execSync} from 'child_process'
import {format} from 'util'

/**
 * 执行命令行命令
 * @param command 命令
 * @private
 */
const _execSync = (command) => {
    try {
        execSync(command)
    } catch (e) {
        // logger.warning(e)
    }
}
export default {

    /**
     * git add .
     * @param relativePath 相对路径
     */
    addAll(relativePath) {
        const absPath = jetpack.inspect(relativePath, {absolutePath: true}).absolutePath
        _execSync(format('cd %s && git add .', absPath))
    },

    /**
     * git add
     * @param relativePath 当前脚本执行的相对路径
     */
    add(relativePath) {
        const absPath = jetpack.inspect(relativePath, {absolutePath: true}).absolutePath
        _execSync(format('git add %s', absPath))
    },

    /**
     * git rm -r --cached folder
     * @param relativePath 相对路径
     */
    rmAll(relativePath) {
        const absPath = jetpack.inspect(relativePath, {absolutePath: true}).absolutePath
        _execSync(format('git rm -r --cached %s', absPath))
    },

    /**
     * git rm
     * @param relativePath 相对路径
     */
    rm(relativePath) {
        const absPath = jetpack.inspect(relativePath, {absolutePath: true}).absolutePath
        _execSync(format('git rm --cached %s', absPath))
    },

    /**
     * 获取 git 的用户名和密码
     * @returns {*[]}
     */
    getUserNameAndEmail() {
        let userName, email
        try {
            userName = execSync('git config --get user.name')
            email = execSync('git config --get user.email')
        } catch (e) {
        }
        userName = userName ? userName.toString().trim() : ''
        email = email ? (' <' + email.toString().trim() + '>') : ''
        return [userName, email]
    }
}