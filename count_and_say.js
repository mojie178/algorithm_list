/*
 * @Title: 外观数列
 * @Descripttion: https://leetcode-cn.com/problems/count-and-say/
 * @Question: 
 * 给定一个正整数 n ，输出外观数列的第 n 项。
 * “外观数列”是一个整数序列，从数字 1 开始，序列中的每一项都是对前一项的描述。
 * 前五项如下：
 * 1（初始值）
 * 11（一个 1）
 * 21（两个 1）
 * 1211（一个 2，一个 1）
 * 111221（一个 1， 一个 2， 两个 1）
 */

/**
 * @name count_and_say
 * @param {number} num
 * @return {string}
 */
function count_and_say(num) {
  let prev = '1';
  for (let i = 1; i < num; i++) {
    prev = prev.replace(/(\d)\1*/g, item => `${item.length}${item[0]}`);
  }
  return prev;
}

/**
 * 解题思路：利用正则表达式的回溯引用能力。
 */

/**
 * 复杂度分析：
 * 时间复杂度：O(N^2)，N 取决于 num 的大小，正则表达式默认 O(N)
 * 空间复杂度：O(1)
 */