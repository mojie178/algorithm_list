/*
 * @Title: Z 字形变化
 * @Descripttion: https://leetcode-cn.com/problems/zigzag-conversion/
 * @Question: 
 * 将一个给定字符串 s 根据给定的行数 numRows，以从上往下、从左到右进行 Z 字形排列
 * 比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：
 * P   A   H   N
 * A P L S I I G
 * Y   I   R
 * 之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"
 */

/**
 * @name: convert_z
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
function convert_z(s, numRows) {
  if (numRows == 1) return s; // 如果是单行，则返回自身
  let rows = new Array(Math.min(numRows, s.length)).fill(''); // 创建存放 Math.min(numRows, s.length) 个空字符串的数组
  let curRow = 0; // 当前所处行数
  let goingDown = false; // 插值顺序 false: 向上，true：向下
  for (item in s.split('')) {
    rows[curRow] += s[item]; // 将对应的值存储
    if (curRow == 0 || curRow == numRows - 1)
      goingDown = !goingDown; // 处于最上行或者最下行则调转方向
    curRow += goingDown ? 1 : -1; // 修改当前行
  }
  return rows.join(''); // 返回重拼的数组
}

/**
 * 解题思路：
 * 可以使用 min(numRows, len(s)) 个字符串来表示 Z 字形图案中的非空闲
 * 从左到右迭代 s，将每个字符添加到合适的行。可以使用当前行 curRow 和当前方向 goingDown 这两个变量
 * 对合适的行进行跟踪。只有当我们向上移动到最上面的行或向下移动到最下面的行时，当前方向发生改变
 */

/**
 * 复杂度分析：
 * 时间复杂度：O(N)，其中 N == len(s)
 * 空间复杂度：O(N)
 */