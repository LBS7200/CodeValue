import { action, makeObservable, observable, runInAction } from "mobx";

import { DataState } from "./DataStore/data-state";
import { IStore } from "./DataStore/IStore";

export type FetchFunc = () => Promise<any>;

export class Store<T> implements IStore<T> {
  state: DataState = "pending";
  data: T;
  fetch: FetchFunc;

  constructor(public id: string, public provider: FetchFunc, defaultValue: T) {
    this.data = defaultValue;

    this.fetch = async () => {
      this.state = "pending";
      try {
        const newData = await this.provider();
        runInAction(() => {
          this.data = newData as T;
          this.state = "done";
        });
      } catch (error) {
        runInAction(() => {
          this.state = "error";
        });
      }
    };

    makeObservable(this, {
      data: observable,
      fetch: action.bound,
      state: observable,
    });
  }
}

export default Store;
