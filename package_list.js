/*
 * @Title: 在 D 天内送达包裹的能力
 * @Descripttion: https://leetcode-cn.com/problems/capacity-to-ship-packages-within-d-days/
 * @Question: 
 * 创送带上的包裹必须在 D 天内转运，传送带上的第 i 个包裹的重量为 weights[i]。
 * 每一天，我们都会按给出的重量的顺序往传送带上装包裹。我们装载的重量不会超过
 * 船的最大运载重量。返回能在 D 天内完成任务的船最低运载能力。
 */

/**
 * @name ship_with_in_days
 * @param {number[]} weights 
 * @param {number} D 
 * @returns {number}
 */
function ship_with_in_days(weights, D) {
  let left = Math.max(...weights); // 获取左边界（每次运输一个）
  let right = weights.reduce((a, b) => a + b); // 获取右边界（所有货物一次运输）
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    let need = 1; // 需要运输的天数
    let cur = 0; // 当前天已运输的包裹重量之和
    for (const item of weights) {
      if (cur + item > mid) {
        need++;
        cur = 0;
      } cur += item;
    }
    if (need <= D) right = mid;
    else left = mid + 1;
  }
  return left;
}

/**
 * 解题思路：
 * 假设船的运输能力为 X 时，我们可以在 D 天运完，那么只要运载能力大于 X，我们同样可以完成。
 * 这样一来，我们就得到了一个非常重要的结论：
 * 存在一个运载能力“下限” Xmin，使得 X >= Xmin 时，我们可以在 D 天内完成；当 X < Xmin 时，我们不能完成。
 * 同时 Xmin 就是我们需要知道的答案，因此使用二分查找方法。
 */

/**
 * 复杂度分析：
 * 时间复杂度：O(Nlog(∑w))，其中 N 是数组 weights 的长度，∑w 是数组 weights 中元素的和。
 * 二分法需要执行的次数为 O(log(∑w))，每一步需要对数组 weights 进行依次遍历，时间为 O(N)，
 * 相乘即可得到总时间复杂度
 * 空间复杂度：O(1)
 */