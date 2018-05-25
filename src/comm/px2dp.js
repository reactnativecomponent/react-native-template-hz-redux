/*
 * @Author: huangjun
 * @Date: 2018-05-25 14:51:46
 * @Last Modified by:   huangjun
 * @Last Modified time: 2018-05-25 14:51:46
 */

import { Dimensions } from 'react-native'

const basePixelWidth = 375
const px2dp = px => px * Dimensions.get('window').width / basePixelWidth

export default px2dp
