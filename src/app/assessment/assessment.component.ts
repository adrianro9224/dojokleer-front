import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {QuestionsCategory} from "../questions-category.object";

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, private router: Router) { }

  theFormGroup: FormGroup;
  private _theFormArray: FormArray
  isEditable = true;

  categoryTree: QuestionsCategory[]

  ngOnInit() {
    this.categoryTree = [
    {
      questionCategoryId: 1,
      categoryName: "Practicante de Lean-Agile",
      categoryDescription: "Aqui se evalua xxxx",
      questionEntities: [
        {
          questionId: 1,
          question: "Question 1 ?",
          questionCategoryId: 1,
          answerEntities: [
            {
              questionAnswerId: 1,
              questionId: 1,
              answer: "Tengo conocimientos basado en lecturas o libros. Asistí a un taller de Scrum o Kanban. Me certifiqué como CSM.",
              brings: 2,
            },
            {
              questionAnswerId: 2,
              questionId: 1,
              answer: "Fui parte de un equipo ágil. He trabajado bajo un framework ágil por lo menos un año. Facilité esporádicamente sesiones de equipos ágiles.",
              brings: 4,
            },
            {
              questionAnswerId: 3,
              questionId: 1,
              answer: "Puedo darle soporte a uno o más equipos ágiles. Puedo identificar la mejor técnica para usar en cada contexto. Participo de comunidades de práctica. He participado de múltiples equipos en escala.",
              brings: 6,
            },
            {
              questionAnswerId: 4,
              questionId: 1,
              answer: "Me desenvuelvo más por principios que por prácticas. Puedo trabajar con diferentes equipos, situaciones, topologías e industrias. Soy capaz de combinar diferentes estrategias de escalado.",
              brings: 6,
            },
            {
              questionAnswerId: 5,
              questionId: 1,
              answer: "Soy capaz de ayudar a cualquier equipo en cualquier estadío. Mis decisiones están más basada en la intuición y la experiencia. Soy creador de técnicas.",
              brings: 6,
            }
          ]
        }
      ]
    }
  ]

    this.theFormGroup = this._formBuilder.group({
      answersByCategory: this._formBuilder.array([])
    });

    this.categoryTree.forEach(value => {
        this._theFormArray = this.theFormGroup.get('answersByCategory') as FormArray;
        this._theFormArray.push(this.addFormGroupByQuestionCategory(value));
      }
    )
  }

  private getQuestionFormControl(){
      return new FormControl('', [Validators.required])
  }

  private addFormGroupByQuestionCategory(category: QuestionsCategory){
    let group: any = {};
    category.questionEntities.forEach(value => {
      group[category.questionCategoryId+'-'+value.questionId] = this.getQuestionFormControl();
    });
    return this._formBuilder.group(group);
  }

  saveAssessment(){
    this.router.navigate(['assessment-summary']);
    console.log(this.theFormGroup);
  }


  get theFormArray(): FormArray {
    return this._theFormArray;
  }
}
