/*
 * @Title: 盛最多水的容器
 * @Descripttion: https://leetcode-cn.com/problems/container-with-most-water/
 * @Author: shaojihao
 * @Date: 2021-01-25 08:57:06
 * @LastEditTime: 2021-01-25 09:56:31
 */

/**
 * @name: most_water
 * @question: 给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。
 * 在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0) 。
 * 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
 * @param {number[]} list
 * @return {number}
 */
function most_water(list) {
  let left = 0, right = list.length - 1; // 定义左指针 left，右指针 right
  let ans = 0; // 盛装面积
  while (left < right) { // 左指针小于右指针
    let area = Math.min(list[left], list[right]) * (right - left);
    ans = Math.max(ans, area); // 取 ans 和 area 的最大值
    // 移动 list[left]，list[right] 中较小值的指针
    if (list[left] <= list[right]) ++left;
    else --right;
  }
  return ans;
}

/**
 * 解题思路：双指针的方法。
 * · 求出当前双指针对应的容器的容量
 * · 对应数字较小的那个指针以后不可能作为容器的边界了，将其丢弃，并移动对应的指针
 */

/**
 * 复杂度分析：
 * 时间复杂度：O(N)，双指针总计最多遍历整个数组一次
 * 空间复杂度：O(1)，只需要额外的常数级别的空间
 */
