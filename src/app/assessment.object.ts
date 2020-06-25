import {Country} from "./country";

export interface Assessment {
  assessmentId: number;
  countryId: number;
  email: string;
  country: Country
}

