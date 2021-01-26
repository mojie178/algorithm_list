/*
 * @Title: 移除元素
 * @Descripttion: https://leetcode-cn.com/problems/remove-element/
 * @Author: shaojihao
 * @Date: 2021-01-26 09:09:00
 * @LastEditTime: 2021-01-26 15:21:11
 * @Question: 
 * 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
 * 不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并原地修改输入数组。
 * 元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。
 */

/**
 * @name: remove_element_one（双指针）
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
function remove_element_one(nums, val) {
  let i = 0; // 定义新指针 i 且值为 0
  for (let j = 0; j < nums.length; j++) { // 定义老指针 j 且值为 0
    if (nums[j] != val) { // 如果 nums[j] 不等于当前值
      nums[i] = nums[j]; // 老指针对应的值赋予新指针的值
      i++; // 新指针右移
    } // 如果等于目标值则不会赋值到新指针
  }
  return i;
}

/**
 * 解题思路：当 nums[j] 与给定的值相等时，递增 j 以跳过该元素。
 * 只要 nums[j] ≠ val，我们就复制 nums[j] 到 nums[i] 并同时递增两个索引。
 * 重复这一过程，直到 j 到达数组的末尾，该数组的新长度为 i
 */

/**
 * 复杂度分析：
 * 时间复杂度：O(N)，假设数组总共有 N 个元素，i 和 j 至少遍历 2N 步
 * 空间复杂度：O(1)
 */

/**
 * @name: remove_element_two（双指针 —— 当要删除的元素很少时）
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
function remove_element_two(nums, val) {
  let i = 0; // 定义指针 i 且值为 0
  let len = nums.length; // 获取数组长度
  while (i < len) {
    if (nums[i] == val) { // 如果当前值与目标值相等
      nums[i] = nums[len - 1]; // 将当前值与数组最后一位交换
      len--; // 遍历数组长度减 1
    } else i++; // 否则指针右移
  }
  return i;
}

/**
 * 解题思路：当我们遇到 nums[i]=val 时，我们可以将当前元素与最后一个元素进行交换，并释放最后一个元素。
 * 这实际上使数组的大小减少了 1。
 */

/**
 * 复杂度分析：
 * 时间复杂度：O(N)，i 和 n 最多遍历 n 步。在这个方法中，赋值操作的次数等于要删除的元素的数量。
 * 因此，如果要移除的元素很少，效率会更高
 * 空间复杂度：O(1)
 */