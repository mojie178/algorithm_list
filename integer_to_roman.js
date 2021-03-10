/*
 * @Title: 整数转罗马数字
 * @Descripttion: https://leetcode-cn.com/problems/integer-to-roman/
 * @Question: 
 * 罗马数字包含以下七种字符： I， V， X， L，C，D 和 M，将整数转化为罗马数字
 * 字符    数值
 * I       1
 * V       5
 * X       10
 * L       50
 * C       100
 * D       500
 * M       1000
 */

/**
 * @name: integer_to_roman
 * @param {number} num
 * @return {string}
 */
function integer_to_roman(num) {
  // 列出罗马数字最佳组合可能
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const symbols = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  let str = ''; // 存储拼接罗马字符串
  for (let i = 0; i < values.length && num >= 0; i++) {
    while (values[i] <= num) {
      num -= values[i]; // num 减去目前最佳组合对应的值
      str += symbols[i]; // str 添加最佳组合
    }
  }
  return str;
}

/**
 * 解题思路：为了表示一个给定的整数，我们寻找适合它的最大符号。我们减去它，然后寻找适合余数的最大符号，
 * 依此类推，直到余数为0。我们取出的每个符号都附加到输出的罗马数字字符串上
 */

/**
 * 时间复杂度：O(1)，由于有一组有限的罗马数字，循环可以迭代多少次有一个硬上限。因此，我们说时间复杂度是常数的，即 O(1)
 * 空间复杂度：O(1)，使用的内存量不会随输入整数的大小而改变，因此是常数的。
 */