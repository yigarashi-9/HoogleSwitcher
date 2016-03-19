export class Snapshot {
  id: string;
  name: string;
  isPrim: boolean;

  constructor(id: string, name: string, isPrim: boolean) {
    this.id = id;
    this.name = name;
    this.isPrim = isPrim;
  }
}

export class SnapshotList {
  list: Array<Snapshot>;

  constructor(list: Array<Snapshot>) {
    // this constructor is called only for initializing
    this.list = list;
  }

  push(snapshot: Snapshot) {
    this.list.push(snapshot);
  }

  findIndex(id: string): number {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].id === id) {
        return i;
      }
    }
    return -1;
  }

  deleteSnapshot(id: string): void {
    let index = this.findIndex(id);
    if (index !== -1) {
      this.list.splice(index, 1);
    }
  }

  map(func) {
    return this.list.map(func);
  }

  set(): Promise<SnapshotList> {
    return new Promise(
      (resolve: SnapshotListCallback, reject: ErrorCallback) => {
        chrome.storage.local.set({"snaplist": this.list}, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError.message);
          } else {
            resolve(this);
          }
        });
      });
  }

  static initialData(): Array<Snapshot> {
    return [
      new Snapshot("hackage", "Hackage", true),
      new Snapshot("lts", "LTS (latest)", true),
      new Snapshot("nightly", "Nightly (latest)", true)
    ];
  }

  static loadAll(): Promise<SnapshotList> {
    return new Promise(
      function(resolve: SnapshotListCallback, reject: ErrorCallback) {
        chrome.storage.local.get("snaplist", function(storage) {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError.message);
          } else if (storage["snaplist"]) {
            resolve(new SnapshotList(storage["snaplist"]));
          } else {
            alert("Snapshots does not exist...\nPlease reinstall the extension, sorry.");
          }
        });
      });
  }
}

interface SnapshotListCallback {
  (snapshots: SnapshotList): void;
}

interface ErrorCallback {
  (error: string): void;
}
