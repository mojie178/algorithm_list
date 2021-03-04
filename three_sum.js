/*
 * @Title: 三数之和
 * @Descripttion: https://leetcode-cn.com/problems/3sum/
 * @Author: shaojihao
 * @Question: 
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，
 * 使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组
 */

/**
 * @name: three_sum
 * @param {number[]} nums
 * @return {*}
 */
function three_sum(nums) {
  const len = nums.length; // 获取长度
  if (nums.length < len) return []; // 如果数组长度小于 3，直接返回 []
  nums.sort((x, y) => x - y); // 正序排序数组
  if (nums[0] > 0 || nums[len - 1] < 0) return []; // 最小值大于 0 或者最大值小于 0，必将不会存在三数之和为 0
  let ans = []; // 创建存储数组
  for (let i = 0; i < len; i++) {
    if (nums[i] > 0) return ans; // 如果当前值大于 0，和右侧的值之和必不等于 0
    if (i > 0 && nums[i] == nums[i - 1]) continue; // 如果当前值与前一位值相等，则直接跳过
    // 双指针开始
    let left = i + 1;
    let right = len - 1;
    while (left < right) {
      const temp = nums[i] + nums[left] + nums[right]; // 计算当前三数之和
      if (temp > 0) right--; // 如果当前和大于 0，移动右指针来减小三数之和
      else if (temp < 0) left++; // 如果当前和小于 0，移动左指针来增加三数之和
      else { // 三数之和为 0
        console.log()
        ans.push([nums[i], nums[left], nums[right]]); // 添加当前组合
        while (left < right && nums[left] == nums[left + 1]) left++; // 跳过左指针下个值重复
        while (left < right && nums[right] == nums[right - 1]) right--; // 跳过右指针下个值重复
        // 左右指针移动
        left++;
        right--;
      }
    }
  }
  return ans;
}

/**
 * 解题思路：排序 + 双指针。先将数组重新排序，重复值直接跳过，减少重复值造成的影响。
 * 如果当前和大于 0，则右指针的目标数必将在当前数的左侧，同理，若小于 0，左指针的目标数在其右侧。
 * 且因为已重新排序，只需计算左指针小于右指针的情况，则将三重循环降为一重循环加双指针，二三重循环并列执行。
 */

/**
 * 复杂度分析：
 * 时间复杂度：O(N^2)，其中 N 为数组长度
 * 空间复杂度：O(logN)，我们忽略存储答案的空间，额外排序的空间复杂度为 O(logN)。
 * 然而我们修改了输入的数组 nums，在实际情况下不一定允许，因此也可以看成使用了额外的
 * 一个数组存储了 nums 的副本并进行排序，空间复杂度为 O(N)
 */