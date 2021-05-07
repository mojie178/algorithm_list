/*
 * @Title: 编辑距离
 * @Descripttion: https://leetcode-cn.com/problems/edit-distance/
 * @Question: 
 * 给你两个单词 word1 和 word2，请你计算出将 word1 转换成 word2 所使用的最少操作数
 * 你可以对一个单词进行如下三种操作：
 * · 插入一个字符
 * · 删除一个字符
 * · 替换一个字符
 */

/**
 * @name edit_distance
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
function edit_distance(word1, word2) {
  let len1 = word1.length, len2 = word2.length; // 获取长度
  if (len1 * len2 == 0) return len1 + len2; // 如果 word1 或 word2 是空字符串，怎直接返回总长度
  let dp = new Array(len1 + 1).fill('').map(() => new Array(len2 + 1).fill(0)); // 创建二维数组
  // 边界初始化，len1 + 1 和 len2 + 1 是处于边界考虑
  for (let i = 0; i < len1 + 1; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j < len2 + 1; j++) {
    dp[0][j] = j;
  }
  // 计算所有 dp 值
  for (let i = 1; i < len1 + 1; i++) {
    for (let j = 1; j < len2 + 1; j++) {
      let delChar = dp[i - 1][j] + 1; // word2 --> word1，word2 插入字符，等同于 word1 删除字符
      let addChar = dp[i][j - 1] + 1; // word1 --> word2，word1 插入字符
      let UpChar = dp[i - 1][j - 1]; // word1 --> word2，word1 替换字符
      if (word1.charAt(i - 1) != word2.charAt(j - 1)) UpChar += 1; // 如果最后一个字符不相等
      dp[i][j] = Math.min(delChar, addChar, UpChar); // 获取其中最小值
    }
  }
  return dp[len1][len2];
}

/**
 * 解题思路：
 * 题中所给的三种操作，实质为
 * 1、在单词 A 中插入一个字符
 * 2、在单词 B 中插入一个字符
 * 3、修改单词 A 中的一个字符
 * 
 * 以 A = 'horse'，B = 'ros' 为例
 * · 在单词 A 中插入一个字符：如果我们知道 'horse' 到 'ro' 的编辑距离为 x，那么 'horse' 到 'ros' 不会超过 x + 1。
 * · 在单词 B 中掺入一个字符：如果我们知道 'hors' 到 'ros' 的编辑距离为 y，那么 'horse' 到 'ros' 不会超过 y + 1。
 * · 修改单词 A 中的一个字符：如果我们知道 'hors' 到 'ro' 的编辑距离为 z，那么 'horse' 到 'ros' 不会超过 z + 1。
 * 那么从 horse 到 ros 的编辑距离应该为 Math.min(x + 1, y + 1, z + 1)。
 * 
 * 以此方法继续拆分直到：
 * · 字符串 A 为空，如从 '' 到 'ro'，显然编辑距离为字符串 B 的长度，例子中为 2；
 * · 字符串 B 为空，如从 '' 到 'horse'，编辑距离为字符串 A 的长度，例子中为 5；
 * 
 * 那么我们可以写出如下状态转移方程：
 * · 若 A 和 B 的最后一个字符相同：
 * dp[i][j] = Math.min(dp[i][j - 1] + 1, dp[i - 1][j] + 1, dp[i - 1][j - 1]) = 1 + Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1] - 1)
 * · 若 A 和 B 的最后一个字符不同：
 * dp[i][j] = 1 + Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1])
 * 注：在末尾插入字符，或者判断最后一个字符是否相等的逻辑，可以用于其它位置的字符，只是这样方便逻辑计算和写算法。
 * 
 * 对于边界情况，一个空字符串和一个非空字符串的编辑距离为 dp[i][0] = i 和 dp[0][j] = j，
 * dp[i][0] 相当于对 A 执行 i 次删除操作，dp[0][j] 相当于对 word1 执行 j 次插入操作
 */

/**
 * 复杂度分析：
 * 时间复杂度：O(MN)，其中 M 是 word1 的长度，N 是 word2 的长度
 * 空间复杂度：O(MN)，我们需要大小为 O(MN) 的 dp 数组记录状态值
 */