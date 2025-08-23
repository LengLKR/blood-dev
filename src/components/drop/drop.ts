import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-drop',
  standalone: false,
  templateUrl: './drop.html',
  styleUrl: './drop.scss',
})
export class Drop implements OnInit {
  constructor() {}
  ngOnInit(): void {}
  showGenotype: string[] | null = null;

  bloodGroupForm = new FormGroup({
    fatherABO: new FormControl<string | null>(null, Validators.required),
    fatherRh: new FormControl<string | null>(null, Validators.required),
    motherABO: new FormControl<string | null>(null, Validators.required),
    motherRh: new FormControl<string | null>(null, Validators.required),
  });

  //options ไดนามิก ข้างใน arrayมี opject อยู่
  options: { id: number; phenotype: string; genotype: string[] }[] = [
    { id: 1, phenotype: 'A', genotype: ['AA', 'Ao'] },
    { id: 2, phenotype: 'B', genotype: ['BB', 'Bo'] },
    { id: 3, phenotype: 'AB', genotype: ['AB'] },
    { id: 4, phenotype: 'O', genotype: ['OO'] },
  ];

  Rh: { name2: string }[] = [{ name2: '+' }, { name2: '-' }];

  submit() {
    if (this.bloodGroupForm.valid) {
      const father = this.bloodGroupForm.value.fatherABO;
      const fatherRh = this.bloodGroupForm.value.fatherRh;
      const mother = this.bloodGroupForm.value.motherABO;
      const motherRh = this.bloodGroupForm.value.motherRh;

      const fathergenotype =
        this.options.find((o) => o.phenotype === father)?.genotype || [];
      const mothergenotype =
        this.options.find((o) => o.phenotype === mother)?.genotype || [];

      //change genotype -> phenotype
      const genotypeTOPhenotype = (gen: string): string => {
        let hasA = false;
        let hasB = false;

        for (let i = 0; i < gen.length; i++) {
          if (gen[i] === 'A') hasA = true;
          if (gen[i] === 'B') hasB = true;
        }

        if (hasA && hasB) return 'AB';
        if (hasA) return 'A';
        if (hasB) return 'B';
        return 'O';
      };

      // --- ABO Calculation ----
      // let childrenABO: string[] = [];
      // for (let i = 0; i < fathergenotype.length; i++) {
      //   const fgenotype = fathergenotype[i];
      //   for (let j = 0; j < mothergenotype.length; j++) {
      //     const mgenotype = mothergenotype[j];
      //     for (let fallele = 0; fallele < fgenotype.length; fallele++) {
      //       for (let mallele = 0; mallele < mgenotype.length; mallele++) {
      //         const childGen = [fgenotype[fallele], mgenotype[mallele]]
      //           .sort()
      //           .join('');

      //         const phenotype = genotypeTOPhenotype(childGen);
      //         childrenABO.push(phenotype);
      //       }
      //     }
      //   }
      // }
      // childrenABO = [...new Set(childrenABO)]; //uique
      // console.log('children2', childrenABO);

      const childrenABO = fathergenotype.flatMap((fgeno) =>
        mothergenotype.flatMap((mgeno) =>
          fgeno.split('').flatMap((fallele) =>
            mgeno.split('').map((mallele) => {
              const childGen = [fallele, mallele].sort().join('');
              return genotypeTOPhenotype(childGen);
            })
          )
        )
      );
      console.log('check1', childrenABO);
      const uniqueChildrenABO = Array.from(new Set(childrenABO));
      console.log('check', uniqueChildrenABO);
      // //---- Rh Calculation ---
      // let childrenRh: string[] = [];
      // //Ex '+' = อาจเป็น +/+ หรือ +/-
      // //'-' = ต้องเป็น -/-
      // let fatherRhAlleles = fatherRh === '+' ? ['+', '-'] : ['-'];
      // let matherRhAlleles = motherRh === '+' ? ['+', '-'] : ['-'];

      // for (let i = 0; i < fatherRhAlleles.length; i++) {
      //   for (let j = 0; j < matherRhAlleles.length; j++) {
      //     const alleles = [fatherRhAlleles[i], matherRhAlleles[j]];
      //     //ถ้ามีอย่างน้อย 1 ตัวเป็น Rh+
      //     const phenotypeRh = alleles.includes('+') ? '+' : '-';
      //     childrenRh.push(phenotypeRh);
      //   }
      // }
      // childrenRh = [...new Set(childrenRh)];
      // const fatherRhAlleles = fatherRh === '+' ? ['+', '-'] : ['-'];
      // const motherRhAlleles = motherRh === '+' ? ['+', '-'] : ['-'];

      const mapRhAlleles = (rh: string | null | undefined) =>
        rh === '+' ? ['+', '-'] : ['-'];
      const fatherRhAlleles = mapRhAlleles(fatherRh);
      const motherRhAlleles = mapRhAlleles(motherRh);

      //สร้างทุน combination ของ allele และแปลงเป็น phenotype Rh
      const childrenRh = fatherRhAlleles.flatMap((fa) =>
        motherRhAlleles.map((ma) => (fa === '+' || ma === '+' ? '+' : '-'))
      );

      const uniqueChildrenRh = Array.from(new Set(childrenRh));
      console.log(uniqueChildrenRh);

      //----  รวม ABO + Rh ---
      // let posibleChilden: string[] = [];
      // for (let i = 0; i < childrenABO.length; i++) {
      //   for (let j = 0; j < childrenRh.length; j++) {
      //     posibleChilden.push([childrenABO[i] + childrenRh[j]].sort().join(''));
      //     console.log(
      //       'dsfdfdf+++',
      //       [childrenABO[i] + childrenRh[j]].sort().join('')
      //     );
      //   }
      // }

      // --- รวม ABO + Rh ----
      const possibleChildren = uniqueChildrenABO.flatMap((abo) =>
        uniqueChildrenRh.map((rh) => `${abo}${rh}`)
      );

      this.showGenotype = possibleChildren;

      console.log('posibleChilden: ', possibleChildren);
      console.log('chailderRh', childrenRh);
      console.log('childrenABO for loop', childrenABO);
      console.log('father : ', father, 'fathergenotype :', fathergenotype);
      console.log('fatherRh : ', fatherRh);
      console.log('mother : ', mother, 'mothergenotype :', mothergenotype);
      console.log('motherRh : ', motherRh);
    } else {
      this.bloodGroupForm.markAllAsTouched();
      // Swal.fire('กรุณาเลือก ABO และ Rh ของพ่อและแม่ก่อน');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'กรุณาเลือก ABO และ Rh ของพ่อและแม่ก่อน',
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  }

  resetFrom() {
    this.bloodGroupForm.reset();
    this.showGenotype = null;
  }
}
