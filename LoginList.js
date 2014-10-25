var theGlobal;

function popoverHandler() {
  theGlobal = safari.extension.globalPage.contentWindow.sonomaGlobal;
  showLoginsList();
}

function buildLoginsList() {
  var groupDivs = _.map(theGlobal.getGroups(), function (curGroup, curGroupIndex) {
    var loginsTable = $('<table></table>', {
      class: "table"
    });
    _.forEach(curGroup["logins"], function (curLogin, curLoginIndex) {
      var loginRow = $('<tr></tr>')
        .append($('<td></td>', {
          class: 'login-name-column',
          text: curLogin["userName"]
        }))
        .append($('<td></td>', {
          class: 'login-button-column'
        })
          .append($('<a></a>', {
            text: 'Login',
            'data-toggle': 'tooltip',
            title: curLogin.description,
            class: 'btn btn-primary btn-sm',
            href: '#',
            click: function (event) {
              event.preventDefault();
              safari.application.activeBrowserWindow.openTab().url = 'https://' + theGlobal.orgTypes[curLogin.type] + '.salesforce.com/?un=' + curLogin.userName + '&pw=' + curLogin.password;
            }
          })
          )
          .append($('<a></a>', {
            text: 'Edit',
            class: 'btn btn-default btn-sm',
            href: '#',
            click: function (event) {
              event.preventDefault();
              editLogin(curLogin, curGroup.groupName);
            }
          })
          )
          .append($('<a></a>', {
            text: 'Delete',
            class: 'btn btn-default btn-sm',
            href: '#',
            click: function (evvent) {
              event.preventDefault();
              theGlobal.deleteAccount(curLogin);
              showLoginsList();
            }
          })
          )
        );
      loginsTable.append(loginRow);
    });
    return $('<div></div>', {
      class: "panel panel-default"
    })
      .append($('<div></div>', {
        class: "panel-heading",
        text: curGroup["groupName"]
      })
        .add(loginsTable)
      );
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
  account['description'] = $('#newLoginDescription').val();
  var groupName = $('#newLoginGroup').val();
  theGlobal.addAccount(account, (groupName === undefined || groupName === '') ? 'Uncategorized' : groupName);

  clearLoginForm();
}

function clearLoginForm() {
  $('#newLoginUsername').val('');
  $('#newLoginPassword').val('');
  $("input[name=\"org-type\"]:checked").val(false);
  $('#newLoginDescription').val('');
  $('#newLoginGroup').val('');
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

function editLogin(login, groupName) {
  $('#newLoginUsername').val(login.userName);
  $('#newLoginPassword').val(login.password);
  $('#newLoginDescription').val(login.description);
  $('#newLoginGroup').val(groupName);
  $("input[value=\"" + login.type + "\"]").prop('checked', 'checked');
  showNewLogin();
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
    clearLoginForm();
    showLoginsList();
  })
})
