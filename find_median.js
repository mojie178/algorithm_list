/*
 * @Title: 寻找两个正序数组的中位数
 * @Descripttion: https://leetcode-cn.com/problems/median-of-two-sorted-arrays/
 * @Question: 
 * 给定两个大小为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的中位数，时间复杂度为 O(log(m + n)) 的算法
 */

/**
 * @name: find_median.js
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
function find_median(nums1, nums2) {
  let totalLength = nums1.length + nums2.length; // 获取两个数组的总长度
  if (totalLength % 2 == 1) { // 如果总长度为奇数，则直接选中间下标
    let minIndex = Math.ceil(totalLength / 2);
    return get_kth_element(nums1, nums2, minIndex);
  } else { // 如果总长度为偶数，则取中间两下标结算平均值
    let minIndexLeft = totalLength / 2, minIndexRight = totalLength / 2 + 1;
    return (get_kth_element(nums1, nums2, minIndexLeft) + get_kth_element(nums1, nums2, minIndexRight)) / 2;
  }
}

/**
 * @name: get_kth_element
 * @msg: 获取中位数
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
function get_kth_element(nums1, nums2, k) {
  let length1 = nums1.length, length2 = nums2.length; // 获取当前两个数组的长度
  let index1 = 0, index2 = 0; // 对比的下标
  while (true) {
    // 边界情况
    if (index1 == length1) return nums2[index2 + k - 1]; // 如果对比下标大于等于数组长度，则返回另一数组的下标 index2 + k - 1 的值，
    else if (index2 == length2) return nums1[index1 + k - 1];
    else if (k == 1) return Math.min(nums1[index1], nums2[index2]); // 如果 k == 1，则返回对比中的较小的值

    // 正常情况
    let half = parseInt(k / 2);
    let newIndex1 = Math.min(index1 + half, length1) - 1;
    let newIndex2 = Math.min(index2 + half, length2) - 1;
    let pivot1 = nums1[newIndex1], pivot2 = nums2[newIndex2];
    if (pivot1 <= pivot2) {
      k -= (newIndex1 - index1 + 1);
      index1 = newIndex1 + 1;
    } else {
      k -= (newIndex2 - index2 + 1);
      index2 = newIndex2 + 1;
    }
  }
}

/**
 * 解题思路：如果对时间复杂度的要求有 log，一般使用二分查找。
 * 根据中位数定义，当 m + n 是奇数时，中位数是两个有序数组的第 (m + n) / 2 + 1 个元素
 * 当 m + n 是偶数时，则为 (m + n) / 2 和 (m + n) / 2 + 1 个元素的平均值
 * 这个题目，可以转换为寻找两个有序数组的第 k 位的数，其中 k 是 (m + n) / 2 或 (m + n) / 2 + 1
 * 因此我们归纳出三个情况：
 * 1. 如果 A[k / 2 -1] < B[k / 2 - 1]，则 A 数组中比 A[k / 2 - 1] 小的数字和 A[k / 2 - 1]，都不是目标中位数
 * 2. 如果 A[k / 2 -1] > B[k / 2 - 1]，则 B 数组中比 B[k / 2 - 1] 小的数字和 B[k / 2 - 1]，都不是目标中位数
 * 3. 如果 A[k / 2 -1] == B[k / 2 - 1]，则可以归入第一种情况
 * 
 * 有三种情况需要特殊化处理：
 * 1. 如果 A[k / 2 -1] 和 B[k / 2 - 1] 越界，则取对应数组中的最后一个元素，
 * 我们必须根据排除数的个数减少 k 的值，而不能直接将 k 减去 k / 2
 * 2. 如果一个数组为空，直接返回另一个数组中第 k 个元素
 * 3. 如果 k == 1，返回两个数组首位元素的最小值
 */

/**
 * 算法复杂度：
 * 时间复杂度：O(log(m + n))，其中 m 和 n 分别是数组 nums1 和 nums2 的长度。
 * 初始时有 k = (m + n) / 2 或者 k = (m + n) / 2 + 1，每一轮循环可以将查找范围减半
 * 因此时间复杂度是 O(log(m + n))
 * 空间复杂度：O(1)
 */