export class CreateAssessmentForm {

  private countryId: number;
  private email: string;

  constructor(countryId: number, email: string) {
    this.countryId = countryId;
    this.email = email;
  }

}
