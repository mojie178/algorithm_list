/*
 * @Title: 接雨水
 * @Descripttion: https://leetcode-cn.com/problems/trapping-rain-water/
 * @Author: shaojihao
 * @Date: 2021-01-26 15:15:59
 * @LastEditTime: 2021-01-26 16:03:49
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
  let sum = 0; // 定义存储水容器
  let max = get_max(heightList); // 获取最大值
  for (let i = 1; i <= max; i++) { // 从第 1 行开始
    let isStart = false; // 标记是否开始更新
    let temp_sum = 0; // 定义计算临时计算水容器
    for (let j = 0; j < heightList.length; j++) {
      if (isStart && heightList[i] < i) temp_sum++;
    }
    if (heightList[i] >= i) {
      sum += temp_sum;
      temp_sum = 0;
      isStart = true;
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