/*
 * @Title: 重复的 DNA 序列
 * @Descripttion: https://leetcode-cn.com/problems/repeated-dna-sequences/
 * @Question: 
 * 所有 DNA 都由一系列缩写为‘A’，‘C’，‘G’，‘T’的核苷酸组成，例如：“ACGAATTCCG”。在研究 DNA 时，
 * 识别 DNA 中的重复序列有时会对研究非常有帮助。
 * 编写一个函数来找出所有目标子串，目标子串的长度为 10，且在 DNA 字符串 str 中出现次数超过一次。
 */

/**
 * @name dna_swquences
 * @param {string} str
 * @param {number} long
 * @return {string[]}
 */
function dna_swquences(str, long = 10) {
  const ans = []; // 定义存储容器
  const cnt = new Map(); // 定义哈希表
  const len = str.length; // 获取数组长度
  for (let i = 0; i <= len - long; ++i) {
    const sub = str.slice(i, i + long); // 获取截取长度，long 默认为 10
    cnt.set(sub, (cnt.get(sub) || 0) + 1); // 以截取字段为 key，重复次数为 value，更新哈希表
    if (cnt.get(sub) === 2) ans.push(sub); // 如果出现重复则记录进入存储容器
  }
  return ans; // 返回值
}

/**
 * 解题思路：使用哈希表统计 str 所有长度为 long 的子串的出现次数，代码实现时，可以
 * 一边遍历子串一边记录答案，为了不重复记录答案，只统计出现次数为 2 的子串
 */

/**
 * 复杂度分析：
 * 时间复杂度：O(NL)，其中 N 为字符串 str 的长度，L 即目标子串的长度
 * 空间复杂度：O(NL)
 */