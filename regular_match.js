/*
 * @Title: 正则表达式匹配
 * @Descripttion: https://leetcode-cn.com/problems/regular-expression-matching/
 * @Author: shaojihao
 * @Date: 2021-01-22 14:44:23
 * @LastEditTime: 2021-01-22 16:45:07
 */

/**
 * @name: regular_match
 * @qus: 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
 * 所谓匹配，是要涵盖 整个 字符串 s 的，而不是部分字符串。
 * @param {string} str
 * @param {string} regx
 * @return {boolean}
 */
function regular_match(str, regx) {
  let strLen = str.length, regxLen = regx.length; // 获取 str，regx 的字符串长度
  let dp = new Array(strLen + 1).fill('').map(() => new Array(regxLen).fill(false)); // 创建二维数组来记录
  dp[0][0] = true; // 因为 str[-1]，regx[-1] 都不存在，所以默认相等返回 true
  // 能够真实反馈 dp[i][j] 的匹配情况，其实是从 [1, 1] 开始。[0, *] 和 [*, 0] 只是作为辅助作用
  for (let i = 0; i <= strLen; ++i) { // 遍历 str 每个字符
    for (let j = 1; j <= regxLen; ++j) { // 遍历 regx 每个字符，j 从 1 开始
      if (regx.charAt(j - 1) == '*') { // regx[j] 字符是否为 *
        dp[i][j] = dp[i][j - 2]; // 采用 * 前一个字符的第一次在 str 出现的匹配结果
        // 如果 str[i - 1] 与 regx[j - 2] 依旧匹配，则将返回
        if (matches(str, regx, i, j - 1)) dp[i][j] = dp[i][j] || dp[i - 1][j]; // dp[i - 1][j] * 前一个字符在 str 多次出现的匹配结果
      } else { // 非 * 重复字符的情况
        if (matches(str, regx, i, j)) dp[i][j] = dp[i - 1][j - 1]; // 如果上个字符匹配成功，则默认当前字符也匹配
        else dp[i][j] = false;
      }
    }
  }
  return dp[strLen][regxLen];
}

/**
 * @name: matches
 * @description: 用于返回 dp[i - 1][j - 1] 的状态
 * @param {string} str
 * @param {string} regx
 * @param {number} i
 * @param {number} j
 * @return {boolean}
 */
function matches(str, regx, i, j) {
  if (i == 0) return false; // 因为 str[-1] 不存在，所以默认返回 false
  if (regx.charAt(j - 1) == '.') return true; // 如果 regx[j - 1] 为 . ，匹配任何 str[i - 1]，默认 true
  return str.charAt(i - 1) == regx.charAt(j - 1); // 否则返回 dp[i][j] 的上个字符 dp[i - 1][j - 1] 的状态
}