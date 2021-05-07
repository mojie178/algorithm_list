/*
 * @Title: 打家劫舍
 * @Descripttion: https://leetcode-cn.com/problems/house-robber/
 * @Question: 
 * 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，
 * 如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
 * 
 * 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。
 */

/**
 * @name house_robber
 * @param {number[]} nums
 * @return {number}
 */
function house_robber(nums) {
  if (nums == null || nums.length == 0) return 0; // 非空判断
  const length = nums.length; // 获取数组长度
  if (length == 1) return nums[0]; // 如果数组长度为 1，返回当前值
  let first = nums[0], second = Math.max(nums[0], nums[1]); // 记录前两间房屋的最高总金额
  for (let i = 2; i < length; i++) {
    // first 存储前一间房屋的最高金额，second 记录当前房屋最高金额
    [first, second] = [second, Math.max(first + nums[i], second)];
  }
  return second;
}

/**
 * 解题思路：
 * 首先考虑最简单情况。就一间房屋，则偷窃该房屋，可以获得最高金额。如果只有两间房屋，偷窃最大值。
 * 如果大于两间房屋，对于第 k(k > 2) 间房屋，有两个选项：
 * 1、偷窃第 k 间房屋，那么就不能偷窃第 k - 1 间房屋，偷窃总金额为前 k - 2 间房屋的最高总金额加上当前房屋金额
 * 2、不偷窃第 k 间房屋，偷窃总金额为前 k - 1 间房屋的最高总金额
 * 在两个选项中选取较大的选项，改选项对应的偷窃总金额即为前 k 间房屋能偷窃的最高总金额
 * 用 dp[i] 表示前 i 间房屋能投到的最高总金额，那么就有如下的状态转移方程：
 * dp[i] = max(dp(i - 2) + nums[i], dp[i - 1])
 * 边界条件为：
 *  dp[0] = nums[0] // 只有意见房屋，则偷窃
 *  dp[1] = max(nums[0], nums[1]) // 只有两间房屋，选择其中金额较大的房屋进行偷窃
 * 最终答案即为 dp[n - 1]，其中 n 为数组长度
 * 考虑到每间房屋的最高总金额只和该房屋的前两间房屋的最高总金额相关，因此可以使用滚动数组，在每个时刻只需要存储前两间房屋的最高总金额
 */

/**
 * 复杂度分析：
 * 时间复杂度：O(N)，其中 N 是数组长度，只需要遍历一次
 * 空间复杂度：O(1)，使用滚动数组，可以只存储前两间房屋的最高总金额，而不需要存储整个数组的结果
 */