export interface BodyResponseBase {
  data?;
  message?: string;
  errors?: Errors[] | null;

}

interface Errors {
  message: string
}
