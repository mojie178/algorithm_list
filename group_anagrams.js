/*
 * @Title: 字母异位词分组
 * @Descripttion: https://leetcode-cn.com/problems/group-anagrams/
 * @Question: 
 * 给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。
 * 例：
 * 输入: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat']
 * 输出:
 * [
 *   ['ate', 'eat', 'tea'],
 *   ['nat', 'tan'],
 *   ['bat']
 * ]
 */

/**
 * @name: group_anagrams
 * @param {string[]} strs
 * @return {string[][]}
 */
function group_anagrams(strs) {
  let map = new Map(); // 创建 hashMap
  for (let str of strs) { // 遍历每个字符串
    let key = Array.from(str).sort().toString(); // 将每个字符串拆成字符数组并排序，再组合成 string，作为 key
    let list = map.get(key) ? map.get(key) : []; // 如果 hashMap 中已有，则获取对应的值数组，否则新增一个空数组
    list.push(str); // 将 str 塞入 list
    map.set(key, list); // 更新 hashMap
  }
  return Array.from(map.values()); // 返回 hashMap 的值
}

/**
 * 解题思路：由于互为字母异位词的两个字符串包含的字母相同，因此对两个字符串分别进行排序之后得到的字符串一定是相同的，故可以将排序之后的字符串作为哈希表的键。
 */

/**
 * 复杂度分析：
 * 时间复杂度：O(NKlogK)，其中 N 是 strs 中字符串的数量，K 是 strs 中的字符串的最大长度。
 * 需要遍历 N 个字符串，对于每个字符串，需要 O(KlogK) 的时间进行排序以及 O(1) 的时间更新哈希表，
 * 因此总时间复杂度是 O(NKlogK)
 * 空间复杂度：O(NK)，其中 N 是 strs 中的字符串的数量，K 是 strs 中字符串的最大长度。需要用哈希表存储全部字符串
 */