module.exports = {
  '*.{vue,js,ts}': ['eslint --fix', 'prettier --write'],
  '*.{css,less,scss}': ['stylelint', 'prettier --write'],
  '*.{json,html}': ['prettier --write']
};
