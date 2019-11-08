export class Community {
  id: number;
  title: '';
  description: '';
  subDomain: '';

  constructor(obj?: any) {
    this.id = obj && obj.id || null;
    this.title = obj && obj.title || '';
    this.description = obj && obj.description || '';
    this.subDomain = obj && obj.subDomain || '';
  }
}
