actor {
  var installCount = 24;

  public query ({ caller }) func getInstallCount() : async Nat {
    installCount;
  };

  public shared ({ caller }) func incrementInstallCount() : async Nat {
    installCount += 1;
    installCount;
  };
};
