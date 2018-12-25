module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "semi": [0],
    "no-multiple-empty-lines": [0, { "max": 100 }],
    //关闭禁止混用tab和空格
    "no-mixed-spaces-and-tabs": [0],
    "space-before-function-paren": 0, // 函数定义时括号前面要不要有空格
    "eol-last": 0, // 文件以单一的换行符结束
    "no-extra-semi": 0, // 可以多余的冒号
    "semi": 0, // 语句可以不需要分号结尾
    "eqeqeq": 0, // 必须使用全等
    "one-var": 0, // 连续声明
    "no-undef": 0, // 可以 有未定义的变量
    "comma-dangle": [2, "never"], // 对象字面量项尾不能有逗号
    "no-multi-spaces": 1, // 不能用多余的空格
    "key-spacing": [1, { // 对象字面量中冒号的前后空格
      "beforeColon": false,
      "afterColon": true
    }],
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};