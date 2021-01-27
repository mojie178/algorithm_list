/*
 * @Title: 接雨水
 * @Descripttion: https://leetcode-cn.com/problems/trapping-rain-water/
 * @Author: shaojihao
 * @Date: 2021-01-26 15:15:59
 * @LastEditTime: 2021-01-27 11:39:25
 * @Question: 
 * 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水
 * 例：
 * 输入：heightList = [0,1,0,2,1,0,1,3,2,1,2,1]
 * 输出：6
 * ^
 * |              _
 * |      _      | |_   _
 * |  _  | |_   _| | |_| |_
 * |_|_|_|_|_|_|_|_|_|_|_|_|
 */

/**
 * @name: rain_water_one（按行求）
 * @param {number[]} heightList
 * @return {number}
 */
function rain_water_one(heightList) {
  let sum = 0; // 接水量
  let max = get_max(heightList); // 获取最大值高度
  for (let i = 1; i <= max; i++) { // 从第 1 行开始
    let isStart = false; // 标记是否开始更新
    let temp_sum = 0; // 单坑接水量
    for (let j = 0; j < heightList.length; j++) {
      if (isStart && heightList[j] < i) temp_sum++; // 该行低洼处，单坑接水量自增 1
      if (heightList[j] >= i) { // 如果当前高度大于等于行高
        sum += temp_sum; // 将单坑接水量加到接水量中
        temp_sum = 0; // 重置单坑接水量
        isStart = true; // 开启临时存储
      }
    }
  }
  return sum;
}

/**
 * @name: get_max
 * @description: 获取数组中最大高度
 * @param {number[]} heightList
 * @return {number}
 */
function get_max(heightList) {
  let maxHeight = 0; // 定义最大值高度
  for (let i = 0; i < heightList.length; i++) {
    maxHeight = Math.max(heightList[i], maxHeight); // 遍历匹配最大值
  }
  return maxHeight;
}

/**
 * 解题思路：
 * 先求第 1 行的水，遍历每个位置，如果当前高度小于 i，并且两边有高度大于等于 i 的，说明一定有水。
 */

/**
 * 复杂度分析：
 * 时间复杂度：如果最大的数是 M，个数是 N，那么就是 O(MN)
 * 空间复杂度：O(1)
 */

/**
 * @name: rain_water_two（按列求）
 * @param {number[]} heightList
 * @return {number}
 */
function rain_water_two(heightList) {
  let sum = 0; // 接水量
  for (let i = 1; i < heightList.length - 1; i++) { // 数组两端的列不用考虑，一定没有水，所以下标从 1 到 length - 2
    let max_left = 0, max_right = 0; // 定义左边最高，右边最高
    for (let j = i - 1; j >= 0; j--) {
      max_left = Math.max(heightList[j], max_left); // 遍历获取左边最高
    }
    for (let k = i + 1; k < heightList.length; k++) {
      max_right = Math.max(heightList[k], max_right);
    }
    let minHeight = Math.min(max_left, max_right); // 获取左右两端最低
    if (minHeight > heightList[i]) sum += (minHeight - heightList[i]); // 只有 minHeight 大于当前高度才会有水
  }
  return sum;
}

/**
 * 解题思路：算出左边最高和右边最高，如果大于当前列高度，则一定有水
 */

/**
 * 复杂度分析：
 * 时间复杂度：O(N^2)，遍历每一列需要 N，找出左边最高和右边最高加起来刚好又是一个 N
 * 空间复杂度：O(1)
 */

/**
 * @name: rain_water_three（动态规划）
 * @param {number[]} heightList
 * @return {number}
 */
function rain_water_three(heightList) {
  let sum = 0; // 接水量
  let len = heightList.length; // 获取长度
  let max_left = new Array(len).fill(0); // 定义存储左侧最高数组
  let max_right = new Array(len).fill(0); // 定义存储右侧最高数组
  for (let i = 1; i < len - 1; i++) { // 数组方式存入左侧 [i - 1] 的高度和 max_left 的最大值
    max_left[i] = Math.max(max_left[i - 1], heightList[i - 1]);
  }
  for (let j = len - 2; j >= 0; j--) { // 数组方式存入右侧 [j + 1] 的高度和 max_right 的最大值
    max_right[j] = Math.max(max_right[j + 1], heightList[j + 1]);
  }
  for (let k = 1; k < len - 1; k++) {
    let minHeight = Math.min(max_left[k], max_right[k]); // 获取木桶高度
    if (minHeight > heightList[k]) sum += (minHeight - heightList[k]); // 存入接水量
  }
  return sum;
}

/**
 * 解题思路：在方法 rain_water_two 的基础上动态规划，
 * 对于 max_left 可以理解为 max_left = Math.max(max_left[i - 1], heightList[i - 1])
 * 同理可求 max_right，就可以在解法 rain_water_two 上省略一次 for 循环
 */

/**
 * 复杂度分析：
 * 时间复杂度：O(N)
 * 空间复杂度：O(N)，用来保存每一列左侧最高的墙和右边最高的墙
 */

/**
 * @name: rain_water_four（双指针）
 * @param {number[]} heightList
 * @return {number}
 */
function rain_water_four(heightList) {
  let sum = 0; // 接水量
  let len = heightList.length; // 获取长度
  let max_left = max_right = 0; // 定义左右最大值
  let left = 1; // 左指针
  let right = len - 2; // 右指针
  for (let i = 1; i < len - 1; i++) {
    if (heightList[left - 1] < heightList[right + 1]) { // 从左到右更
      max_left = Math.max(max_left, heightList[left - 1]); // 获取左侧最高数
      let minHeight = max_left; // 因为右侧高于左侧，直接将 max_left 作为最小高度
      if (minHeight > heightList[left]) sum += (minHeight - heightList[left]); // 如果当前高度小于最小高度，则添加到接水量
      left++;
    } else { // 从右到左更
      max_right = Math.max(max_right, heightList[right + 1]); // 获取右侧最高数
      let minHeight = max_right; // 因为右侧低于左侧，直接将 max_right 作为最小高度
      if (max_right > heightList[right]) sum += (minHeight - heightList[right]); // 如果当前高度小于最小高度，则添加到接水量
      right--;
    }
  }
  return sum;
}

/**
 * 解题思路：
 * left_max: 左边的最大值，从左往右遍历找到
 * right_max: 右边的最大值，从右往左遍历找到
 * left: 从左往右吃力的当前下标
 * right: 从右往左处理的当前下标
 * 
 * 定理一：在某个位置 i 处，它能存的水，取决于它左右两边的最大值中的较小一个
 * 定理二：当我们从左往右处理到 left 下标时，左边的最大值 left_max 对它而言是可信的，
 * 但 right_max 对它而言不可信
 * 定理三：当我们从右往左处理到 right 下标时，右边的最大值 right_max 对它而言才是可信的
 * 
 * 对于位置 left 而言，它左边最大值一定是 left_max，右边最大值“大于等于” right_max，
 * 这时候，如果 left_max < right_max 成立，那么它就知道自己能存多少水。
 * 无论右边将会不会出现更大的 right_max，都不影响这个结果。所以当 left_max < right_max 时，
 * 我们就希望去处理 left 下标，反之，处理 right 下标。
 */

/**
 * 复杂度分析：
 * 时间复杂度：O(N)
 * 空间复杂度：O(1)
 */

/**
 * @name: rain_water_five（栈）
 * @param {number[]} heightList
 * @return {number}
 */
function rain_water_five(heightList) {
  let sum = 0; // 接水量
  let len = heightList.length; // 获取长度
  let stack = []; // 定义栈
  let current = 0; // 定义指针
  while (current < len) { // 指针小于当前长度
    while (stack.length && (heightList[current] > heightList[stack[stack.length - 1]])) { // 栈内有值，且当前高度大于前一个
      let h = heightList[stack[stack.length - 1]]; // 获取栈顶上的元素
      stack.pop(); // 栈顶的元素不是计算用墙了，出栈移除
      if (!stack.length) break; // 栈空就出去
      let distance = current - stack[stack.length - 1] - 1; // 两堵墙之间的距离
      let minHeight = Math.min(heightList[stack[stack.length - 1]], heightList[current]); // 获取两个墙中矮的
      sum += distance * (minHeight - h); // 获取水
    }
    stack.push(current); // 当前指向的墙入栈
    current++; // 指针右移
  }
  return sum;
}

/**
 * 解题思路：
 * 用栈保存每堵墙，当遍历墙的高度时候，如果当前高度小于栈顶的墙的高度，说明这里有积水，将墙的下标入栈。
 * 如果当前高度大于栈顶的墙高度，说明之前的积水到这里停下，可以计算积水。计算完，就把当前的墙继续入栈，作为新的积水的墙。
 * 
 * 总体原则：
 * 1. 当前高度小于等于栈顶高度，入栈，指针后移
 * 2. 当前高度大于栈顶高度，出栈，计算出当前墙和栈顶的墙之间水的多少，然后计算当前的高度和新栈墙的高度的关系，重复第 2 步。
 * 直到当前墙的高度不大于栈顶高度或者栈空，然后把当前墙入栈，指针后移
 */

/**
 * 复杂度分析：
 * 时间复杂度：虽然 while 循环里套了一个 while 循环，但是考虑到每个元素最多访问两次，入栈一次和出栈一次，所以时间复杂度是 O(N)
 * 空间复杂度：O(N)，栈的空间
 */