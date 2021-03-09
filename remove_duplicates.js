/**
 * @Title: 删除字符串中的所有相邻重复项
 * @Descripttion: https://leetcode-cn.com/problems/remove-all-adjacent-duplicates-in-string/
 * @Author: shaojihao
 * @Question: 
 * 给出由小写字母组成的字符串 str，重复项删除操作会选择两个相邻且相同的字母，并删除他们。
 * 在 str 上反复执行重复项删除操作，直到无法继续删除。在完成所有重复项删除操作后，
 * 返回最终字符串，答案保证唯一。
 */

/**
 * @name: remove_duplicates
 * @param {string} str
 * @return {string}
 */
function remove_duplicates(str) {
  const stk = []; // 创建容器数组
  for (const ch of str) {
    if (stk.length && stk[stk.length - 1] === ch)
      stk.pop(); // 如果该项与栈顶项一致，则移除栈顶项
    else stk.push(ch); // 否则添加该项于栈顶
  }
  return stk.join(''); // 转成字符串
}

/**
 * 解题思路：使用类似“入栈”和“出栈”的概念
 */

/**
 * 复杂度分析：
 * 时间复杂度：O(N)，其中 N 是字符串的长度
 * 空间复杂度：O(N)
 */