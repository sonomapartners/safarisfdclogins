safari.application.addEventListener("popover", popoverHandler, true);
const theGlobal = safari.extension.globalPage.contentWindow.amonshizGlobal;

function popoverHandler () {
  buildLoginsList();
}

function buildLoginsList () {
  var accountDivs = _.map(theGlobal.getAccounts(), function (curGroup, curGroupIndex) {
    var loginsTable = $('<table></table>', {
      class : "table"
    });
    var starterDiv = $('<div></div>', {
      class : "panel panel-default"
    }).append($('<div></div>', {
      class : "panel-heading",
      text: curGroup["groupName"]
    }).add(loginsTable));
    _.forEach(curGroup["logins"], function (curLogin, curLoginIndex) {
      var loginRow = $('<tr></tr>').append($('<td></td>', {
        text : curLogin["userName"]
      }));
      loginsTable.append(loginRow);
    });
    return starterDiv;
  });

  var loginsList = $('#loginsList');
  loginsList.empty();
  _.forEach(accountDivs, function (curDiv) {
    loginsList.append(curDiv);
  });
}
