/*
 * @Title: 两数之和
 * @Descripttion: https://leetcode-cn.com/problems/two-sum/
 * @Author: shaojihao
 * @Question: 
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回它们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
 * 你可以按任意顺序返回答案。
 */

/**
 * @name: two_num
 * @param {number[]} list
 * @param {number} target
 * @return {number[]}
 */

function two_num(list, target) {
  let mapList = new Map(); // 创建哈希 Map
  for (let i = 0; i < list.length; ++i) {
    if (mapList.has(target - list[i])) // 如果哈希表里面有当前差值，直接返回当前键对应的值
      return [mapList.get(target - list[i]), i];
    mapList.set(list[i], i); // 将数组每项的值作为哈希 Map 的键，对应角标作为值
  }
  return []; // 如果 list 为空数组返回空数组
}

/**
 * 解题思路：注意到方法一的时间复杂度较高的原因是寻找 target - x 的时间复杂度过高。
 * 因此，我们需要一种方法，能够快速寻找数组中是否存在目标元素。如果存在，我们需要找出它的索引。
 * 使用哈希表，可以将寻找 target - x 的时间复杂度降低到从 O(N)O(N)O(N) 降低到 O(1)O(1)O(1)。
 * 这样我们创建一个哈希表，对于每一个 x，我们首先查询哈希表中是否存在 target - x，
 * 然后将 x 插入到哈希表中，即可保证不会让 x 和自己匹配。
 */

/**
 * 复杂度分析：
 * 时间复杂度：O(N)，其中 N 是数组中的元素数量。对于每一个元素 X，我们可以O(1)的寻找 target - x
 * 空间复杂度：O(N)，其中 N 是数组中的元素数量。主要为哈希表的开销
 */