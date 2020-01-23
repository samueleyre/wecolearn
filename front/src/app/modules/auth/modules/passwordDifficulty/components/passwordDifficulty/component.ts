// Based on: https://blog.brunoscopelliti.com/angularjs-directive-to-test-the-strength-of-a-password/

// tslint:disable no-magic-numbers

import { Component, OnChanges, Input, SimpleChange, Injectable } from '@angular/core';

@Component({
  selector: 'password-strength-bar',
  templateUrl: 'template.html',
  styleUrls : ['./style.scss'],
})
export class PasswordStrengthBarComponent implements OnChanges {
  @Input() passwordToCheck: string;
  @Input() barLabel: string;
  bar0: string;
  bar1: string;
  bar2: string;
  bar3: string;
  bar4: string;

  private colors = ['#F00', '#F90', '#FF0', '#9F0', '#0F0'];

  private static measureStrength(p:string) {
    let _force = 0;
    const _regex = /[$-/:-?{-~!"^_`\[\]]/g; // "

    const _lowerLetters = /[a-z]+/.test(p);
    const _upperLetters = /[A-Z]+/.test(p);
    const _numbers = /[0-9]+/.test(p);
    const _symbols = _regex.test(p);

    const _flags = [_lowerLetters, _upperLetters, _numbers, _symbols];

    let _passedMatches = 0;
    for (const _flag of _flags) {
      _passedMatches += _flag ? 1 : 0;
    }

    _force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
    _force += _passedMatches * 10;

        // penality (short password)
    _force = (p.length <= 6) ? Math.min(_force, 10) : _force;

        // penality (poor variety of characters)
    _force = (_passedMatches === 1) ? Math.min(_force, 10) : _force;
    _force = (_passedMatches === 2) ? Math.min(_force, 20) : _force;
    _force = (_passedMatches === 3) ? Math.min(_force, 40) : _force;

    return _force;
  }
  private getColor(s:number) {
    let idx = 0;
    if (s <= 10) {
      idx = 0;
    } else if (s <= 20) {
      idx = 1;
    } else if (s <= 30) {
      idx = 2;
    } else if (s <= 40) {
      idx = 3;
    } else {
      idx = 4;
    }
    return {
      idx: idx + 1,
      col: this.colors[idx],
    };
  }

  ngOnChanges(changes: {[propName: string]: SimpleChange}): void {
    const password = changes['passwordToCheck'].currentValue;
    this.setBarColors(5, '#DDD');
    if (password) {
      const c = this.getColor(PasswordStrengthBarComponent.measureStrength(password));
      this.setBarColors(c.idx, c.col);
    }
  }


  private setBarColors(count:number, col:string) {
    for (let _n = 0; _n < count; _n++) { // tslint:disable-line no-increment-decrement
      this['bar' + _n] = col;
    }
  }
}
