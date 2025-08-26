import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

export interface genoStaete {
  fatherABO: string;
  fatherRh: string;
  motherABO: string;
  motherRh: string;
  genoType: string[] | null;
}
interface ChildNode {
  child: string;
  fromFather: string;
  fromMother: string;
  majorFrom: 'Father' | 'Mother' | 'Unknown';
}

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
  private router = inject(Router);
  @Output() bloodChange = new EventEmitter<genoStaete>();

  exampleGeno: genoStaete | null = null;
  childTree: ChildNode[] = [];

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

  SubmitVersionB() {
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

      const NewbloodChange = {
        fatherABO: father ?? '',
        fatherRh: fatherRh ?? '',
        motherABO: mother ?? '',
        motherRh: motherRh ?? '',
        genoType: possibleChildren,
      };

      this.bloodChange.emit(NewbloodChange);

      this.exampleGeno = NewbloodChange;
      this.mapExampleGenoToTreeMajor();
      console.log('exampleGeno: ', this.exampleGeno);
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

  resetFromB() {
    this.bloodGroupForm.reset();
    this.showGenotype = null;
  }
  addItam() {
    if (this.showGenotype != null) {
      const newBlood = [...this.showGenotype];
    }
  }

  mapExampleGenoToTreeMajor() {
    if (!this.exampleGeno || !this.exampleGeno.genoType) return;

    this.childTree = this.exampleGeno.genoType.map((child) => {
      const rh = child.slice(-1); // last char is Rh
      const abo = child.slice(0, -1); // ABO part

      let majorFrom: 'Father' | 'Mother' | 'Unknown' = 'Unknown';
      let fromFather = '';
      let fromMother = '';

      const fatherABO = this.exampleGeno!.fatherABO;
      const motherABO = this.exampleGeno!.motherABO;

      if (abo.length === 2) {
        // ABO has 2 letters
        const firstAllele = abo[0];
        // check which parent has this allele
        if (fatherABO.includes(firstAllele)) majorFrom = 'Father';
        else if (motherABO.includes(firstAllele)) majorFrom = 'Mother';

        // assign each allele to parent if possible
        fromFather = fatherABO.includes(abo[0]) ? abo[0] : abo[1];
        fromMother = motherABO.includes(abo[1]) ? abo[1] : abo[0];
      } else {
        // single allele
        const firstAllele = abo[0];
        if (fatherABO.includes(firstAllele)) majorFrom = 'Father';
        else if (motherABO.includes(firstAllele)) majorFrom = 'Mother';

        fromFather = fatherABO.includes(abo) ? abo : '';
        fromMother = motherABO.includes(abo) ? abo : '';
      }

      return {
        child,
        fromFather,
        fromMother,
        majorFrom,
      };
    });
  }
}
