/*
 * @Title: 最长回文子串
 * @Descripttion: https://leetcode-cn.com/problems/longest-palindromic-substring/
 * @Author: shaojihao
 * @Date: 2021-01-18 13:57:53
 * @LastEditTime: 2021-01-25 10:48:18
 */

/**
 * @name: longest_substring
 * @question: 给你一个字符串 s，找到 s 中最长的回文子串。(正序逆序相同的字符串是回文)
 * @param {string} s
 * @return {string}
 */
function longest_substring(s) {
  const len = s.length; // 获取字符串长度
  let dp = new Array(len).fill('').map(() => new Array(len).fill(false)); // 创建二维数组来记录
  /**
   * let dp = new Array(len).fill(new Array(len).fill(false));
   * 不可用此方法。Array.prototype.fill() 填充值是对象类型的时候，是创建一个对象的引用而不是拷贝对象，会触发浅拷贝问题。
   * 此时赋值 dp[0][0] = true，实际效果为 dp[0] 中所有项都赋值 true。
   * 而 new Array(len).fill('').map(() => new Array(len).fill(false)) 中的 map() 是把函数每次运行的结果，组成新数组并返回。
   */
  let ans = '';
  for (let k = 0; k < len; ++k) { // 最长回文的最后字符的下标
    for (let i = 0; i + k < len; ++i) { // 最长回文的起始下标
      let j = i + k; // 最长回文的最后字符
      switch(k) {
        case 0: // 长度为 1，返回自身
          dp[i][j] = true;
          break;
        case 1: // 长度为 2，判断自两个字符是否相等
          dp[i][j] = s.charAt(i) == s.charAt(j);
          break;
        default: // 否则自身头尾字符相同，且它的去除头尾的子串为回文串
          dp[i][j] = s.charAt(i) == s.charAt(j) && dp[i + 1][j - 1];
          break;
      }
      if (dp[i][j] && k + 1 > ans.length) { // 如果当前字符串为目前最长回文串，暂存 ans 中
        ans = s.substring(i, j + 1);
      }
    }
  }
  return ans;
}

/**
 * 解题思路：动态规划
 * 对于 'ababa'，如果我们已知 'bab' 是回文串，那么 'ababa' 一定是回文串，这是因为它的首尾两个字母都是 'a'
 * 根据这样的思路，我们就可以用动态规划解决本题。我们用 P(i,j) 表示字符串 S 的第 i 到 j 个字母组成的串是否为回文串
 * P(i,j) 为 true：子串 Si 到 Sj 是回文串；为 false，子串不是回文串
 * 这里的「其它情况」包含两种可能性：S[i,j] 本身不是一个回文串；i > j，此时 S[i,j] 本身不合法
 * 我们就可以写出动态规划的状态转移方程：P(i,j)=P(i+1,j−1)&&(Si​==Sj​)
 * 也就是说，只有 P(i+1:j−1) 是回文串，并且 S 的第 i 和 j 个字母相同时，P(i,j) 才会是回文串
 * 上文的所有讨论是建立在子串长度大于 2 的前提之上的,对于长度为 1 的子串，它显然是个回文串；对于长度为 2 的子串，只要它的两个字母相同，它就是一个回文串。
 * 根据这个思路，我们就可以完成动态规划了，最终的答案即为所有 P(i,j) = true 中的 j−i+1（即子串长度）的最大值。
 */

/**
 * 复杂度分析：
 * 时间复杂度：O(N^2)，其中 N 是字符串的长度。动态规划的状态总数为 O(N^2)，对于每个状态我们需要转移的时间为 O(1)
 * 空间复杂度：O(N^2)，即存储动态规划状态需要的空间
 */

/**
 * @name: longest_substring_two
 * @msg：中心扩展算法
 * @param {string} s
 * @return {string}
 * 解题思路：方法 longest_substring 的状态转移链：P(i,j) <- P(i+1,j-1) <- P(i+2,j-2)...<- 某一边界情况
 * 可以发现，所有的状态在转移的时候的可能性都是唯一的，也就是说可以从任一边界情况扩展
 * 我们枚举所有的“回文中心”并尝试“扩展”，直至无法扩展为止，此时的回文串长度即为“回文中心”下的最长回文串长度
 * 多所有的长度求出最大值，即可。
 */
function longest_substring_two(s) {
  const len = s.length; // 获取字符串长度
  if (len < 1) return ''; // 长度为小于 1，返回自身
  let start = 0, end = 0; // 定义最长回文子串开始下标和结尾下标
  for (let i = 0; i < len; ++i) { // 遍历所有“回文中心点”
    let log1 = expand_around_center(s, i, i); // 若 len 为奇数获取最长
    let log2 = expand_around_center(s, i, i + 1); // 若 len 为偶数获取最长
    let log = Math.max(log1, log2); // 获取两种情况最长情况
    if (log > end - start) { // 存储当前最长回文子串开始结尾下标
      start = i - parseInt((log - 1) / 2);
      end = i + parseInt(log / 2);
    }
  }
  return s.substring(start, end + 1);
}

/**
 * @name: expand_around_center
 * @msg: 中心拓展方法，返回可拓展最长长度
 * @param {string} s
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
function expand_around_center(s, left, right) {
  while (left >= 0 && right < s.length && s.charAt(left) == s.charAt(right)) {
    --left; // 左下标左移
    ++right; // 右下标右移
  }
  return right - left - 1;
}

/**
 * 复杂度分析：
 * 时间复杂度：O(N^2)，其中 N 是字符串的长度。长度为 1 和 2 的回文中心分别有 N 和 N - 1 个，每个回文中心最多会扩展 O(N) 次
 * 空间复杂度：O(1)
 */