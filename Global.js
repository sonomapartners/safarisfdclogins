/**
 * Created by amonshizadeh on 10/21/14.
 */
var sonomaGlobal = {
  getGroups: function () {
    var groups = localStorage.groups;
    if (groups === null || groups === undefined) {
      return [];
    }
    return JSON.parse(groups);
  },
  addAccount : function (account, groupName) {
    this.deleteAccount(account);
    var groups = this.getGroups();
    var groupNameToFind = (groupName === '' || groupName === null || groupName === undefined) ? 'Uncategorized' : groupName;
    var group = _.find(groups, function (curGroup) {
      return curGroup.groupName === groupNameToFind;
    });
    if (group === null || group === undefined) {
      group = {
        groupName: groupNameToFind,
        logins:[]
      };
      groups.push(group);
    }
    group.logins.push(account);
    this.persistGroups(groups);
  },
  deleteAccount : function (account) {
    var groups = this.getGroups();
    var group = _.find(groups, function (curGroup) {
      return _.find(curGroup.logins, {
        userName: account.userName,
        password: account.password
      }) !== undefined;
    });
    if (group === undefined) {
      return;
    }

    var logins = _.remove(group.logins, {
      userName: account.userName,
      password: account.password
    });
    if (group.logins.length === 0) {
      _.remove(groups, group);
    }
    this.persistGroups(groups);
  },
  persistGroups : function (groups) {
    try {
      localStorage.groups = JSON.stringify(groups);
    } catch (e) {
      if (e === QUOTA_EXCEEDED_ERR) {
        alert('You\'ve run out of space to store logins!');
      }
    }
  },
  orgTypes : {
    'production' : 'login',
    'sandbox' : 'test'
  }
};
