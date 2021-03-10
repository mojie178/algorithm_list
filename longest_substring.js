/*
 * @Title: 无重复字符的最长子串
 * @Descripttion: https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/
 * @Question: 
 * 给定一个字符串，请你找出其中不含有重复字符的最长子串的长度。
 */

/**
 * @name: longest_substring
 * @param {string} str
 * @return {number}
 */
function longest_substring(str) {
  const occ = new Set(); // 创建哈希集合，记录每个字符是否出现过
  const len = str.length;
  let rk = -1, ans = 0; // 右指针 rk 初始值 -1，相当于在字符串左边界的左侧，还没有开始移动
  for (let i = 0; i < len; ++i) {
    if (i != 0)
      occ.delete(str.charAt(i - 1)); // 左指针向右移动一格，移除一个字符
    while (rk + 1 < len && !occ.has(str.charAt(rk + 1))) {
      occ.add(str.charAt(rk + 1));
      ++rk; // 不断移动右指针
    }
    // i 为左边界，rk 为右边界，两者之间的差值 + 1，就是当前哈希集合存储的无重复字符串
    ans = Math.max(ans, rk - i + 1); // 第 i 到 rk 个字符是一个极长的无重复字符子串
  }
  return ans;
}

/**
 * 解题思路：滑动窗口
 * 如果我们依次递增地枚举子串的起始位置，那么子串的结束位置也是递增的！
 * 这里的原因在于，假设我们选择字符串中的第 k 个字符作为起始位置，并且得到了不包含重复字符的最长子串的结束位置为 rk​。
 * 那么当我们选择第 k+1 个字符作为起始位置时，首先从 k+1 到 rk​ 的字符显然是不重复的，并且由于少了原本的第 k 个字符，
 * 我们可以尝试继续增大 rk​，直到右侧出现了重复字符为止。
 */

/**
 * 复杂度分析：
 * 时间复杂度：O(N)，其中 N 是字符串的长度。左指针和右指针分别会遍历整个字符串一次
 * 空间复杂度：O(|∑|)，其中 ∑ 表示字符集（即字符串中可以出现的字符），|∑| 表示字符集的大小。
 */