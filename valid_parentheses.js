/*
 * @Title: 有效的括号
 * @Descripttion: https://leetcode-cn.com/problems/valid-parentheses/
 * @Question: 
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效
 * 有效字符串需满足：
 * 1、左括号必须用相同类型的右括号闭合
 * 2、左括号必须以正确的顺序闭合
 */

/**
 * @name: valid_parentheses
 * @param {str} str
 * @return {boolean}
 */
function valid_parentheses(str) {
  const len = str.length; // 获取字符串长度
  if (len % 2 != 0) return false; // 数组长度为奇数，必定无效
  const pairs = new Map([ // 创建括号的 Map 结构数据
    [')', '('],
    [']', '['],
    ['}', '{'],
  ]);
  const stack = []; // 临时存储左括号的栈
  for (let i = 0; i < str.length; i++) {
    if (pairs.has(str[i])) { // 如果字符串匹配到右括号
      // 如果存储左括号数组为空，或者栈的最后一位不等于当前右括号对应的左括号返回 false
      if (!stack.length || stack[stack.length - 1] != pairs.get(str[i])) return false;
      stack.pop(); // 否则去掉最后一位的左括号
    } else stack.push(str[i]); // 为左括号添加至栈
  }
  return !stack.length; // 如果为空则表示有效，有值则无效
}

/**
 * 解题思路：使用“栈”的数据结构解决，并且后进先出（LIFO）思路。
 * 为了快速判断括号的类型，使用哈希映射存储每一种括号，键为右括号，值为左括号
 */

/**
 * 复杂度分析：
 * 时间复杂度：O(N)，其中 N 是字符串 str 的长度
 * 空间复杂度：O(N + |∑|)，其中 ∑ 表示字符集，本题字符串只包含 6 种括号，|∑| = 6。
 * 栈的字符数量为 O(N)，而哈希映射使用的空间为 O(|∑|)，相加即可得到总空间复杂度
 */