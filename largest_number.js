/*
 * @Title: 最大数
 * @Descripttion: https://leetcode-cn.com/problems/largest-number/
 * @Question: 
 * 给定一组非负整数 nums，重新排列每个数的顺序（每个数不可拆分）
 * 使之组成一个最大的整数
 */

/**
 * @name: largest_number
 * @param {number[]} nums
 * @return {number}
 */
function largest_number(nums) {
  nums.sort((x, y) => { // 对数组进行逆序排序
    let sx = 10, sy = 10; // 设定倍数参数
    while(sx <= x) { // 计算 x 是几位数
      sx *= 10;
    }
    while(sy <= y) { // 计算 y 是几位数
      sy *= 10;
    }
    // '' + number，隐式转换成 string，但 - 会将 string 隐式转换成 number
    return '' + (sx * y + x) - ('' + (sy * x + y)); // 返回 x，y 乘以对方倍数并加上自身跟对方的比较大小
  });
  if (nums[0] === 0) return '0'; // 如果最大位置的数字为 0，直接返回 0
  return nums.join(''); // 拼接数组成字符串
}

/**
 * 解题思路：
 * 需要比较两个数不同的拼接顺序的结果，进而决定它们在结果中的排列顺序。由于需要拼接以后才能决定两个数在结果中的排序，
 * N 个数就有 N！中拼接的可能，这种排序规则满足传递性，两个元素比较就可以确定它们在排序以后相对位置关系。
 */

/**
 * 复杂度分析：
 * 时间复杂度：O(NlogNlogM)，其中 N 是给定序列的长度，M 是 32 位整数的最大值，每个数转化为字符串
 * 后的长度是 O(logM) 的数量级。排序比较函数的时间复杂度为 O(logM)，共需要进行 O(NlogN) 次比较。
 * 同时需要对字符串序列进行拼接，时间复杂度为 O(NlogM)，在渐进意义上小于 O(NlogNlogM)
 * 空间复杂度：O(logN)，排序需要 O(logN) 的栈空间
 */