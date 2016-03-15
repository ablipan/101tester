/*
* @Author: Pan
* @Date:   2016-03-15 12:52:02
* @Last Modified by:   Pan
* @Last Modified time: 2016-03-15 14:11:54
*/

import AV from 'leanengine'
const APP_ID = process.env.LEANCLOUD_APP_ID
const APP_KEY = process.env.LEANCLOUD_APP_KEY
const MASTER_KEY = process.env.LEANCLOUD_APP_MASTER_KEY
AV.initialize(APP_ID, APP_KEY, MASTER_KEY)
// 如果不希望使用 masterKey 权限，可以将下面一行删除
// AV.Cloud.useMasterKey()
