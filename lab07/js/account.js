"use strict";

(function () {
  const accountCreator = (function () {
    let accountName;
    let amount;

    return {
      createAccount: function (name, amt) {
        accountName = name;
        amount = amt;

        return { name: accountName, balance: amount };
      },
    };
  })();

  const accountCreated = [];

  function createNewAccount() {
    const newAccount = accountCreator.createAccount(
      document.getElementById("acctName").value,
      document.getElementById("deposit").value
    );
    accountCreated.push(newAccount);
    document.getElementById("displayArea").value = "";

    for (const account of accountCreated) {
      document.getElementById(
        "displayArea"
      ).value += `Account Name: ${account.name}   Balance:  ${account.balance}\n`;
    }
  }

  window.onload = function () {
    document.getElementById("createAcctBtn").onclick = createNewAccount;
  };
})();
