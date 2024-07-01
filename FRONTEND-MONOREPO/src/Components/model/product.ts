import { v4 as uuid } from "uuid";

import { makeAutoObservable } from "mobx";
import { DtoConvertible } from "../../utils/convertible";
import { IProduct } from "../../service/response";
import { isEmptyString } from "../../utils/validator";
import { Identifiable } from "../../core/id";

const DEFAULT_PRODACT = {
  name: "",
  description: "",
  price: 0,
  creation: new Date(),
};

class Product implements DtoConvertible<IProduct>, Identifiable {
  constructor(
    public id: string = uuid(),
    public name: string,
    public description: string,
    public price: number,
    public creationDate: Date
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setName(value: string) {
    this.name = value;
  }

  setDescription(value: string) {
    this.description = value;
  }

  setPrice(value: number) {
    this.price = value;
  }

  setCreationDate(value: Date) {
    this.creationDate = value;
  }
  get isValid(): boolean {
    const nameNotEmpty = isEmptyString(this.name);
    const descriptionNotEmpty = isEmptyString(this.description);
    const priceValid = this.price > 0;
    const creationDateValid =
      this.creationDate instanceof Date && !isNaN(this.creationDate.getTime());
    return (
      nameNotEmpty && descriptionNotEmpty && priceValid && creationDateValid
    );
  }

  get isDefault(): boolean {
    return (
      this.name === DEFAULT_PRODACT.name &&
      this.description === DEFAULT_PRODACT.description &&
      this.price === DEFAULT_PRODACT.price &&
      this.creationDate === DEFAULT_PRODACT.creation
    );
  }

  restoreToDefault() {
    this.name = DEFAULT_PRODACT.name;
    this.description = DEFAULT_PRODACT.description;
    this.price = DEFAULT_PRODACT.price;
    this.creationDate = DEFAULT_PRODACT.creation;
  }

  toRaw(): IProduct {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      creation_date: this.creationDate,
    };
  }

  static fromRaw(rawProfile: IProduct): Product {
    const { id, name, description, price, creation_date } = rawProfile;

    return new Product(id, name, description, price, creation_date);
  }

  public clone(): Product {
    const newId = uuid();
    const { name, description, price, creationDate: creationDate } = this;

    return new Product(newId, name, description, price, creationDate);
  }
}

export default Product;
