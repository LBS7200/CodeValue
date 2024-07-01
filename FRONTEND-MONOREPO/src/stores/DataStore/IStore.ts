import { Identifiable } from "../../core/id";
import { DataState } from "./data-state";

export interface IStore<T> extends Identifiable {
  data: T;
  state: DataState;
  fetch(): Promise<void>;
}
