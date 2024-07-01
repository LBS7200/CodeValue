import { v4 as uuid } from "uuid";

import { makeAutoObservable } from "mobx";
import { DtoConvertible } from "../../utils/convertible";
import { IProduct } from "../../service/response";
import { isEmptyString } from "../../utils/validator";
import { Identifiable } from "../../core/id";

export const DEFAULT_PRODUCT = {
  id: uuid(),
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
      this.name === DEFAULT_PRODUCT.name &&
      this.description === DEFAULT_PRODUCT.description &&
      this.price === DEFAULT_PRODUCT.price &&
      this.creationDate === DEFAULT_PRODUCT.creation
    );
  }

  restoreToDefault() {
    this.name = DEFAULT_PRODUCT.name;
    this.description = DEFAULT_PRODUCT.description;
    this.price = DEFAULT_PRODUCT.price;
    this.creationDate = DEFAULT_PRODUCT.creation;
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
