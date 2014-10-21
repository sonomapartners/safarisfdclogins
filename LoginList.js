safari.application.addEventListener("popover", popoverHandler, true);
const theGlobal = safari.extension.globalPage.contentWindow.amonshizGlobal;

function popoverHandler () {
  buildLoginsList();
}

function buildLoginsList () {
  var groupDivs = _.map(theGlobal.getGroups(), function (curGroup, curGroupIndex) {
    var loginsTable = $('<table></table>', {
      class : "table"
    });
    _.forEach(curGroup["logins"], function (curLogin, curLoginIndex) {
      var loginRow = $('<tr></tr>').append($('<td></td>', {
        text : curLogin["userName"]
      })).append($('<td></td>').append($('<a></a>', {
          text : 'Login',
          href : '#',
          click : function (event) {
            event.preventDefault();
            safari.application.activeBrowserWindow.openTab().url = 'https://' + theGlobal.orgTypes[curLogin.type] + '.salesforce.com/?un=' + curLogin.userName + '&pw=' + curLogin.password;
          }
      })));
      loginsTable.append(loginRow);
    });
    return $('<div></div>', {
      class : "panel panel-default"
    }).append($('<div></div>', {
      class : "panel-heading",
      text : curGroup["groupName"]
    }).add(loginsTable));
  });

  var loginsList = $('#loginsList');
  loginsList.empty();
  _.forEach(groupDivs, function (curDiv) {
    loginsList.append(curDiv);
  });
}
