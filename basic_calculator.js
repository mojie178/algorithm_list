/**
 * @title：基本计算器
 * @Descripttion: https://leetcode-cn.com/problems/basic-calculator/
 * @Question: 
 * 实现一个基本的计算器来计算一个简单的字符串表达式 str 的值，该字符串允许包含加减号和括号
 */

/**
 * @name: basic_calculator
 * @param {string} str
 * @return {number}
 */
function basic_calculator(str) {
  const len = str.length; // 数组长度
  const ops = [1]; // 括号的正负性质栈默认是正
  let sign = 1; // 定义当前的符号，1 代表正，-1 代表负
  let ret = 0; // 计算结果
  let i = 0; // 字符串下标
  while (i < len) {
    if (str[i] === ' ') { // 如果为空跳过
      i++;
    } else if (str[i] === '+') { // 如果是 + 号，取出括号符号栈顶
      sign = ops[ops.length - 1];
      i++;
    } else if (str[i] === '-') { // 如果是 - 号，取反括号符号栈顶
      sign = -ops[ops.length - 1];
      i++;
    } else if (str[i] === '(') { // 如果是 ( 号，将当前正负符号属性存入括号符号栈
      ops.push(sign);
      i++;
    } else if (str[i] === ')') { // 如果是 ) 号，去除低括号栈顶的正负符号属性
      ops.pop();
      i++;
    } else {
      let num = 0; // 多位整数的位数
      // 下标小于长度、当前位是数字且当前位不为空
      while (i < len && !(isNaN(Number(str[i]))) && str[i] !== ' ') {
        num = num * 10 + str[i].charCodeAt() - '0'.charCodeAt(); // 计算多位整数
        i++;
      }
      ret += sign * num; // 计算结果
    }
  }
  return ret; // 返回结果
}

/**
 * 解题思路：
 * 由于字符串除了数字与括号外，只有加号和减号两种运算符。因此，如果展开表达式中的所有括号，
 * 则得到新的表达式，数字本身不会发生变化，只是数字前的符号发生变化。
 * 因此，使用一个取值在 {-1, +1} 的整数 sign 代表“当前”的符号。根据括号表达式的性质，
 * 它的取值：
 *     · 与字符串中当前位置的运算符有关
 *     · 如果当前位置处于一系列括号之内，则也与这些括号前面的运算符有关：每当遇到一个以 - 号
 *       开头的括号，则意味着此后的符号都要被“翻转”
 * 考虑第二点，我们维护一个栈 ops，其中栈顶元素记录了当前位置所处的每个括号所“共同形成”的符号
 * 在得到栈 ops 之后，sign 的取值就能够确定：如果当前遇到 + 号，则更新 sign <-- ops.top()；
 * 如果遇到了 - 号，则更新 sign <-- -ops.top()
 * 然后，每当遇到 ( 时，都要将当前的 sign 取值入栈中；每当遇到 ) 时，都从栈中弹出一个元素。
 * 这样能够在扫描字符串的时候，即时更新 ops 的元素
 */

/**
 * 复杂度分析：
 * 时间复杂度：O(N)，其中 N 为字符串 str 的长度，需要遍历字符串 str 一次，计算表达式的值
 * 空间复杂度：O(N)，其中 N 为字符串 str 的长度，主要取决于栈的空间，栈中的元素数量不超过字符串长度
 */