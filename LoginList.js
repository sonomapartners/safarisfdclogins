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
    // return _.reduce(curGroup["logins"], function (result, curLogin, curLoginIndex) {
    //   // var tempDiv = $('<div />').append('<p />', { text : curLogin["userName"] });
    //   // var temp = result.add($('<div />').append('<p />').text(curLogin["userName"]));
    //   // console.log(temp);
    //   // return temp;
    //   return result.append('<tr></tr>', {
    //     text : curLogin["userName"]
    //   });
    // }, loginsTable);
    // var groupTitle = groupDiv.append($('<h3 />', {
    //   text : "" + curGroup["groupName"] + " at index : " + curGroupIndex
    // }).effect('highlight'));
    // _.forEach(curGroup["logins"], function (curLogin, curLoginIndex) {
    //   groupDiv.append($('<div />', {
    //     text : "" + curLogin["userName"] + " " + curLogin["description"] + " at index : " + curLoginIndex
    //   }));
    // });
    // return groupDiv;
  });

  var loginsList = $('#loginsList');
  // loginsList.accordion();
  loginsList.empty();
  _.forEach(accountDivs, function (curDiv) {
    loginsList.append(curDiv);
  });
}
