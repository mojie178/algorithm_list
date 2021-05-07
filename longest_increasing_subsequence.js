/*
 * @Title: 最长递增子序列
 * @Descripttion: https://leetcode-cn.com/problems/longest-increasing-subsequence/
 * @Question: 
 * 给你一个整数数组 nums，找出其中最长严格递增子序列的长度。
 */

/**
 * @name longest_increasing_subsequence
 * @param {number[]} nums
 * @return {number}
 */
function longest_increasing_subsequence(nums) {
  let len = nums.length; // 获取数组长度
  if (len <= 0) return 0; // 非空判断
  let dp = new Array(len); // 创建数组来记录
  dp[0] = 1; // 设置首位为 1
  let maxans = 1; // 设置长度最少为 1
  for (let i = 1; i < len; i++) {
    dp[i] = 1; // 默认当前位置不大于数组最后一数字，设置为 1
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) dp[i] = Math.max(dp[i], dp[j] + 1); // 如果当前数大于遍历的数，长度取大值
    }
    maxans = Math.max(maxans, dp[i]); // 长度取大值
  }
  return maxans; // 返回长度
}

/**
 * 解题思路：定义 dp[i] 为考虑钱 i 个元素，以第 i 个数字结尾的最长上升子序列的长度，注意 nums[i] 必须被选取。
 * 考虑往 dp[0...i - 1] 中最长的上升子序列后面再加上 nums[i]。由于 dp[j] 代表 nums[0...j] 中以 nums[j] 结尾的最长上升子序列，
 * 所以如果能从 dp[j] 这个状态转移过来，那么 nums[i] 必然要大于 nums[j]，才能将 nums[i] 放在 nums[j] 后面以形成更长的上升子序列。
 * 最后，整个数组的最长上升子序列即所有 dp[i] 中的最大值。
 */

/**
 * 复杂度分析：
 * 时间复杂度：O(N^2)，其中 N 为数组 nums 的长度。动态规划的状态树为 N，计算状态 dp[i] 时，
 * 需要 O(N) 的时间遍历 dp[0...i - 1] 的所有状态，所以总时间复杂度为 O(N^2)
 * 空间复杂度：O(N)，需要额外使用长度为 N 的 dp 数组
 */