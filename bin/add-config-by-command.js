const all = {
  commitlint: addCommitlint,
};

function addConfigViaCommand(name) {
  all[name]();
}

function addCommitlint() {
  console.log('addCommitlint');
}

module.exports = addConfigViaCommand;
