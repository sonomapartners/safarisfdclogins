safari.application.addEventListener("popover", popoverHandler, true);
const theGlobal = safari.extension.globalPage.contentWindow.amonshizGlobal;

function popoverHandler() {
  showLoginsList();
}

function buildLoginsList() {
  var groupDivs = _.map(theGlobal.getGroups(), function (curGroup, curGroupIndex) {
    var loginsTable = $('<table></table>', {
      class: "table"
    });
    _.forEach(curGroup["logins"], function (curLogin, curLoginIndex) {
      var loginRow = $('<tr></tr>').append($('<td></td>', {
          text: curLogin["userName"]
        })).append($('<td></td>').append($('<a></a>', {
          text: 'Login',
          class: 'btn btn-primary btn-sm',
          href: '#',
          click: function (event) {
            event.preventDefault();
            safari.application.activeBrowserWindow.openTab().url = 'https://' + theGlobal.orgTypes[curLogin.type] + '.salesforce.com/?un=' + curLogin.userName + '&pw=' + curLogin.password;
          }
        }))).append($('<td></td>').append($('<a></a>', {
          text: 'Delete',
          class: 'btn btn-default btn-sm',
          href: '#',
          click: function (evvent) {
            event.preventDefault();
            theGlobal.deleteAccount(curLogin);
            showLoginsList();
          }
        })));
      loginsTable.append(loginRow);
    });
    return $('<div></div>', {
      class: "panel panel-default"
    }).append($('<div></div>', {
        class: "panel-heading",
        text: curGroup["groupName"]
      }).add(loginsTable));
  });

  var loginsList = $('#loginsList');
  loginsList.empty();
  _.forEach(groupDivs, function (curDiv) {
    loginsList.append(curDiv);
  });
}

function saveNewLogin() {
  var account = {};
  account['userName'] = $('#newLoginUsername').val();
  account['password'] = $('#newLoginPassword').val();
  account['type'] = $("input[name=\"org-type\"]:checked").val();
  account['description'] = 'Just some description text because.';
  var groupName = $('#newLoginGroup').val();
  theGlobal.addAccount(account, (groupName === undefined || groupName === '') ? 'Uncategorized' : groupName);
}

function showLoginsList() {
  buildLoginsList();
  $('#loginsListWrapper').show();
  $('#newLoginWrapper').hide();
}

function showNewLogin() {
  $('#loginsListWrapper').hide();
  $('#newLoginWrapper').show();
}

$(document).ready(function () {
  $('#addLogin').click(function (event) {
    event.preventDefault();
    showNewLogin();
  });
  $('#saveLogin').click(function (event) {
    event.preventDefault();
    saveNewLogin();
    $('#cancelLogin').click();
  });
  $('#cancelLogin').click(function (event) {
    event.preventDefault();
    showLoginsList();
  })
})
