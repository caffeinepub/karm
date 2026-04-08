


actor {
  var installCount : Nat = 62;

  public query ({ caller }) func getInstallCount() : async Nat {
    installCount;
  };

  public shared ({ caller }) func incrementInstallCount() : async Nat {
    installCount += 1;
    installCount;
  };
};
