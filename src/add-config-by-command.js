const all = {
  commitlint: addCommitlint
}

function addConfigViaCommand(name) {
  all[name]()
}

function addCommitlint() {
  console.log('正在开发中...敬请期待！')
}

module.exports = addConfigViaCommand
