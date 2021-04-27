/*
 * @Title: 二叉搜索的范围和
 * @Descripttion: https://leetcode-cn.com/problems/range-sum-of-bst/
 * @Question: 
 * 给定二叉搜索树的根节点 root，返回值位于范围 [low, high] 之间的所有结点的值之和。
 * // 左子树节点值小于该节点值，右子树节点值大于该节点
 * function TreeNode(val, left, right) {
 *   this.val = (val === undefined ? 0 : val)
 *   this.left = (left === undefined ? null : left)
 *   this.right = (right === undefined ? null : right)
 * }
 */

/**
 * @name range_sum_BST_depth (深度优先搜索)
 * @param {TreeNode} root 
 * @param {number} low 
 * @param {number} high
 * @return {number} 
 */
function range_sum_BST_depth(root, low, high) {
  if (!root) return 0; // 若根节点为空返回 0
  if (root.val > high) // 若节点值大于 high，返回左子树范围和
    return range_sum_BST_depth(root.left, low, high);
  if (root.val < low) // 若节点值小于 low，返回右子树范围和
    return range_sum_BST_depth(root.right, low, high);
  // 处于 [low, high] 范围之内返回 root 节点值、左子树范围和、右子树范围和的三者之和
  return root.val + range_sum_BST_depth(root.left, low, high) + range_sum_BST_depth(root.high, low, high);
}

/**
 * 复杂度分析：
 * 时间复杂度：O(N)，其中 N 是二叉搜索树的节点数
 * 空间复杂度：O(N)，空间复杂度主要取决于栈空间的开销
 */

/**
 * @name range_sum_BST_extent (广度优先搜索)
 * @param {TreeNode} root 
 * @param {number} low 
 * @param {number} high
 * @return {number} 
 */
function range_sum_BST_extent(root, low, high) {
  let sum = 0; // 范围和
  const q = [root];
  while (q.length) {
    const node = q.shift(); // 取出当前 root 首节点
    if (!node) continue; // 节点为空跳过
    if (node.val > high)
      q.push(node.left);
    else if (node.val < low)
      q.push(node.right);
    else {
      sum += node.val;
      q.push(node.left);
      q.push(node.right);
    }
  }
  return sum; // 返回范围和
}

/**
 * 解题思路：
 * 用一个队列 q 存储需要计算的节点，每次取出队首节点时，若节点为空则跳过，
 * 否则按方法一中给出的大小关系来决定加入队列的子节点
 */

/**
 * 复杂度分析：
 * 时间复杂度：O(N)，其中 N 是二叉搜索树的节点数
 * 空间复杂度：O(N)，空间复杂度主要取决于队列的空间
 */