/*
 * @Title: 跳跃游戏
 * @Descripttion: https://leetcode-cn.com/problems/jump-game-ii/
 * @Question: 
 * 给定一个非负整数数组，最初位于数组的第一个位置。
 * 数组中的每个元素代表在该位置可以跳跃的最大长度
 * 目标是使用最小的跳跃次数到达数组的最后一个位置
 */

/**
 * @name jump_game
 * @param {number[]} nums
 * @return {number}
 */
function jump_game(nums) {
  let len = nums.length; // 获取长度
  let end = 0; // 最大下标位置
  let maxPosition = 0; // 最优解
  let steps = 0; // 最小跳转步数
  for (let i = 0; i < len - 1; i++) {
    maxPosition = Math.max(maxPosition, i + nums[i]); // 获取最优解
    if (i == end) { // 每一步最大解的位置 i
      end = maxPosition; // 将当前最优解添加到最大下标位置
      steps++;
      if (end >= len - 1) return steps; // 如果 end 已经超过或者到达数组最后，直接返回
    }
  }
  return steps;
}

/**
 * 解题思路：在具体的实现中，我们维护当前能够到达的最大下标位置，记为边界。
 * 从左到右遍历数组，到达边界时，更新边界并跳跃次数加 1。
 */

/**
 * 复杂度分析：
 * 时间复杂度：O(N)，其中 N 是数组的长度
 * 空间复杂度：O(1)
 */